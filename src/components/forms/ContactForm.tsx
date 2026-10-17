"use client";
import Script from "next/script";
import { useRef, useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui";
import { BUDGETS, SERVICE_OPTIONS, TIMELINES, validate, type Errors, type Inquiry } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { SITE } from "@/content/site";

const SITEKEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ initialService = "", initialPackage = "", initialProject = "" }: { initialService?: string; initialPackage?: string; initialProject?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [pkg, setPkg] = useState(initialPackage);

  const read = (): Partial<Inquiry> => {
    const f = new FormData(formRef.current!);
    const g = (k: string) => String(f.get(k) ?? "");
    return { name: g("name"), email: g("email"), phone: g("phone"), company: g("company"), website: g("website"), service: g("service"), budget: g("budget"), timeline: g("timeline"), message: g("message"), consent: f.get("consent") === "on" };
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = read();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const f = new FormData(formRef.current!);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, package: pkg, project: initialProject, fax: f.get("fax"), t: startedAt.current, turnstile: f.get("cf-turnstile-response") }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.ok) { setStatus("sent"); track("contact_form_submit", { service: String(v.service) }); return; }
      if (j.errors) setErrors(j.errors);
      setServerMsg(j.error || "Something went wrong.");
      setStatus("error");
    } catch {
      setServerMsg("We couldn’t reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-signal p-8 sm:p-12">
        <p className="label label-y">Message sent</p>
        <h2 className="d-xl mt-4">Thank you.</h2>
        <p className="lead mt-4 text-paper/80">We’ve received your inquiry and will reply to the email address you provided. {/* If it’s urgent, call us on <a className="link-u" href={SITE.phone.href}>{SITE.phone.display}</a>. */}</p>
      </div>
    );
  }

  const fieldErr = (k: keyof Inquiry) => errors[k] && <p id={`${k}-err`} className="err" role="alert">{errors[k]}</p>;
  const a11y = (k: keyof Inquiry) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-8" aria-label="Project inquiry">
      {SITEKEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      {pkg && (
        <p className="flex items-center justify-between gap-4 border border-signal px-4 py-3">
          <span><span className="label label-y">Selected package</span><br />{pkg}</span>
          <button type="button" className="label link-u" onClick={() => setPkg("")} aria-label="Remove selected package">Remove</button>
        </p>
      )}
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="field"><label htmlFor="name">Name *</label><input id="name" name="name" autoComplete="name" required {...a11y("name")} />{fieldErr("name")}</div>
        <div className="field"><label htmlFor="email">Work email *</label><input id="email" name="email" type="email" autoComplete="email" required {...a11y("email")} />{fieldErr("email")}</div>
        <div className="field"><label htmlFor="company">Company / brand</label><input id="company" name="company" autoComplete="organization" /></div>
        <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" {...a11y("phone")} />{fieldErr("phone")}</div>
        <div className="field sm:col-span-2"><label htmlFor="website">Website (optional)</label><input id="website" name="website" inputMode="url" autoComplete="url" placeholder="yourcompany.com" {...a11y("website")} />{fieldErr("website")}</div>
        <div className="field"><label htmlFor="service">Service of interest *</label>
          <select id="service" name="service" defaultValue={initialService} required {...a11y("service")}>
            <option value="" disabled>Select a service</option>
            {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>{fieldErr("service")}</div>
        <div className="field"><label htmlFor="budget">Estimated budget (optional)</label>
          <select id="budget" name="budget" defaultValue=""><option value="">Select a range</option>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select></div>
        <div className="field sm:col-span-2"><label htmlFor="timeline">Preferred timeline</label>
          <select id="timeline" name="timeline" defaultValue=""><option value="">Select a timeline</option>{TIMELINES.map((b) => <option key={b}>{b}</option>)}</select></div>
        <div className="field sm:col-span-2"><label htmlFor="message">Project description *</label><textarea id="message" name="message" rows={5} required {...a11y("message")} />{fieldErr("message")}</div>
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label htmlFor="fax">Leave this empty</label><input id="fax" name="fax" tabIndex={-1} autoComplete="off" />
      </div>
      {SITEKEY && <div className="cf-turnstile" data-sitekey={SITEKEY} data-theme="dark" />}

      <div className="field">
        <label className="flex cursor-pointer items-start gap-3 !text-[.85rem] !normal-case !tracking-normal !font-[var(--font-body)]">
          <input type="checkbox" name="consent" className="mt-1 size-5 shrink-0 !border accent-[var(--color-signal)]" {...a11y("consent")} />
          <span>I agree that The Website Grove may use these details to respond to my inquiry, as described in the <a href="/privacy" className="link-u" target="_blank">Privacy Policy</a>. *</span>
        </label>{fieldErr("consent")}
      </div>

      {status === "error" && (
        <div role="alert" className="border border-[#ff7a6b] p-4 text-[#ffb3a9]">
          {serverMsg} You can also reach us at {/* <a className="link-u" href={SITE.phone.href}>{SITE.phone.display}</a> or */} <a className="link-u" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </div>
      )}
      <div><button type="submit" className="btn" disabled={status === "sending"} aria-busy={status === "sending"}>{status === "sending" ? "Sending…" : "Send inquiry"}<Arrow /></button></div>
    </form>
  );
}
