"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { Arrow } from "@/components/ui";
import FullscreenMenu from "./FullscreenMenu";
import { NAV } from "@/content/site";
import { SERVICES } from "@/content/services";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Scroll-aware appearance, updated with direct DOM writes (no React render per scroll frame).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let last = window.scrollY, ticking = false;
    const update = () => {
      const y = window.scrollY;
      el.dataset.solid = String(y > 40);
      const goingDown = y > last && y > 400;
      el.dataset.hidden = String(goingDown && !el.contains(document.activeElement));
      last = y;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  const close = useCallback(() => { setOpen(false); btnRef.current?.focus(); }, []);

  return (
    <>
      <header ref={headerRef} className="site-header" data-solid="false" data-hidden="false">
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" aria-label="The Website Grove — home">
            <Logo className="h-7 w-auto text-paper" title="" />
            <span className="label hidden text-paper/80 xl:inline">The Website Grove</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) =>
              n.href === "/services" ? (
                <div key={n.href} className="group relative">
                  <Link href={n.href} className="nav-link" aria-current={isActive(pathname, n.href) ? "page" : undefined}>
                    {n.label}
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-10 w-[34rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-x-6 border border-paper/10 bg-void p-6">
                      {SERVICES.map((s) => (
                        <Link key={s.slug} href={`/${s.slug}`} className="group/i flex items-baseline gap-3 py-2.5 text-paper/80 transition-colors hover:text-signal focus-visible:text-signal">
                          <span className="label text-ash">{s.number}</span>
                          <span className="text-[0.95rem]">{s.name}</span>
                        </Link>
                      ))}
                      <Link href="/pricing" className="label col-span-2 mt-3 flex items-center gap-2 border-t border-paper/10 pt-4 text-signal">
                        View pricing &amp; packages <Arrow className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={n.href} href={n.href} className="nav-link" aria-current={isActive(pathname, n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="btn !min-h-11 !px-4 max-sm:hidden" data-track="header_start_project" data-magnetic>
              Start a Project <Arrow />
            </Link>
            <button
              ref={btnRef}
              type="button"
              className="label flex min-h-11 items-center gap-3 border border-paper/25 px-4 transition-colors hover:border-signal hover:text-signal"
              aria-expanded={open}
              aria-controls="fs-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="grid gap-[5px]">
                <i className="block h-px w-5 bg-current transition-transform" style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }} />
                <i className="block h-px w-5 bg-current transition-transform" style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <FullscreenMenu open={open} onClose={close} />
    </>
  );
}
