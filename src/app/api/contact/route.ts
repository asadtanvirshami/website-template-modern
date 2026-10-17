import { NextResponse } from "next/server";
import { BUDGETS, SERVICE_OPTIONS, TIMELINES, validate, type Inquiry } from "@/lib/contact";

export const runtime = "nodejs";

/**
 * Inquiry endpoint. Validates server-side, filters spam (honeypot, minimum fill time,
 * per-IP rate limit, optional Cloudflare Turnstile) and delivers through Resend.
 * If delivery is not configured it returns 503 — it NEVER pretends a message was sent.
 *
 * Required env:  RESEND_API_KEY, CONTACT_FROM_EMAIL (verified sender), [CONTACT_TO_EMAIL]
 * Optional env:  TURNSTILE_SECRET_KEY
 */
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000, LIMIT = 5;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const clean = (s: unknown, max: number) => (typeof s === "string" ? s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "");

export async function POST(req: Request) {
  // Same-origin only
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  // Honeypot: bots fill it. Pretend success to them, silently drop.
  if (clean(body.fax, 100)) return NextResponse.json({ ok: true });
  // Humans take more than 3 seconds to fill the form.
  const elapsed = Date.now() - Number(body.t || 0);
  if (!Number.isFinite(elapsed) || elapsed < 3000) return NextResponse.json({ error: "Please take a moment to complete the form, then try again." }, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((x) => now - x < WINDOW);
  if (recent.length >= LIMIT) return NextResponse.json({ error: "Too many requests. Please try again later, or call us." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const data: Inquiry = {
    name: clean(body.name, 120), email: clean(body.email, 200), phone: clean(body.phone, 25), company: clean(body.company, 160),
    website: clean(body.website, 200), service: clean(body.service, 60), package: clean(body.package, 120), project: clean(body.project, 80),
    budget: clean(body.budget, 40), timeline: clean(body.timeline, 40), message: clean(body.message, 5000), consent: body.consent === true,
  };
  const errors = validate(data);
  if (Object.keys(errors).length) return NextResponse.json({ error: "Please check the highlighted fields.", errors }, { status: 422 });
  if (data.budget && !(BUDGETS as readonly string[]).includes(data.budget)) data.budget = "";
  if (data.timeline && !(TIMELINES as readonly string[]).includes(data.timeline)) data.timeline = "";

  // Optional Turnstile
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const token = clean(body.turnstile, 2048);
    const r = token ? await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: new URLSearchParams({ secret, response: token, remoteip: ip }) }).then((x) => x.json()).catch(() => null) : null;
    if (!r?.success) return NextResponse.json({ error: "Spam check failed. Please try again." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "info@thewebsitegrove.com";
  if (!key || !from) {
    console.error("[contact] Delivery not configured: set RESEND_API_KEY and CONTACT_FROM_EMAIL");
    return NextResponse.json({ error: "Our form is temporarily unavailable. Please call or email us directly." }, { status: 503 });
  }

  const svc = SERVICE_OPTIONS.find((o) => o.value === data.service)?.label ?? data.service;
  const rows: [string, string][] = [
    ["Name", data.name], ["Email", data.email], ["Phone", data.phone || "—"], ["Company", data.company || "—"], ["Website", data.website || "—"],
    ["Service", svc], ["Package", data.package || "—"], ["Project referenced", data.project || "—"], ["Budget", data.budget || "—"], ["Timeline", data.timeline || "—"],
  ];
  const html = `<h2>New project inquiry</h2><table cellpadding="6" style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("")}</table><h3>Message</h3><p style="white-space:pre-wrap">${esc(data.message)}</p>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${data.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `New inquiry — ${svc} — ${data.name}`, html, text }),
  }).catch(() => null);

  if (!res || !res.ok) {
    console.error("[contact] Resend failed", res?.status, await res?.text().catch(() => ""));
    return NextResponse.json({ error: "We couldn’t send your message. Please call or email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
