/**
 * Consent-aware analytics. Events are only sent when GA is configured AND the visitor
 * accepted analytics. Payloads are limited to coarse labels — never form contents.
 */
type Params = Record<string, string | number | boolean>;
declare global {
  interface Window { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] }
}
export const CONSENT_KEY = "twg-consent";

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  try { if (localStorage.getItem(CONSENT_KEY) !== "granted") return; } catch { return; }
  window.gtag("event", event, params);
}
