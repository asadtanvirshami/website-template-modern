import Link from "next/link";
import Image from "next/image";
import type { ReactNode, ElementType, CSSProperties } from "react";
import { abs } from "@/lib/seo";

export function Arrow({ className = "", dir = "right" }: { className?: string; dir?: "right" | "up-right" | "down" }) {
  const rot = dir === "down" ? "rotate(90 12 12)" : dir === "up-right" ? "rotate(-45 12 12)" : undefined;
  return (
    <svg className={`arr shrink-0 ${className}`} width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g transform={rot}>
        <path d="M3 12h17M14 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      </g>
    </svg>
  );
}

/** Masked line-by-line headline reveal. Fully server-rendered; revealed by CSS when in view. */
export function Lines({ lines, as: Tag = "h2", className = "", delay = 0, id }: { lines: ReactNode[]; as?: ElementType; className?: string; delay?: number; id?: string }) {
  return (
    <Tag id={id} className={`lines ${className}`} data-lines style={{ "--d": delay } as CSSProperties}>
      {lines.map((l, i) => (
        <span key={i} className="line">
          <span style={{ "--i": i } as CSSProperties}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({ children, className = "", delay = 0, as: Tag = "div", kind }: { children: ReactNode; className?: string; delay?: number; as?: ElementType; kind?: "fade" | "left" }) {
  return (
    <Tag className={className} data-reveal={kind ?? ""} style={{ "--d": delay } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function Rule({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return <div className={`rule ${className}`} data-rule style={{ "--d": delay } as CSSProperties} />;
}

type BtnProps = { href: string; children: ReactNode; variant?: "solid" | "ghost"; className?: string; magnetic?: boolean; track?: string; ariaLabel?: string };
export function Btn({ href, children, variant = "solid", className = "", magnetic = true, track, ariaLabel }: BtnProps) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const cls = `btn ${variant === "ghost" ? "btn-ghost" : ""} ${className}`;
  const props = { className: cls, "data-magnetic": magnetic ? "" : undefined, "data-track": track, "aria-label": ariaLabel };
  return external ? (
    <a href={href} {...props}>
      {children}
      <Arrow />
    </a>
  ) : (
    <Link href={href} {...props}>
      {children}
      <Arrow />
    </Link>
  );
}

export function SectionLabel({ n, children, className = "" }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      {n && <span className="label-y">{n}</span>}
      <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

type MediaProps = { src: string; alt: string; sizes?: string; priority?: boolean; className?: string; pos?: string; gray?: boolean; contain?: boolean };
/** Fills its (relatively positioned, aspect-ratio'd) parent. */
export function Media({ src, alt, sizes = "(min-width:1024px) 50vw, 100vw", priority, className = "", pos = "object-top", gray, contain }: MediaProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`${contain ? "object-contain" : "object-cover"} ${pos} ${gray ? "grayscale-img" : ""} ${className}`}
    />
  );
}

export function Breadcrumbs({ items, tone = "dark" }: { items: { name: string; href?: string }[]; tone?: "dark" | "light" }) {
  return (
    <nav aria-label="Breadcrumb" className={`label ${tone === "dark" ? "text-ash" : "text-graphite"}`}>
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {it.href ? <Link href={it.href} className="link-u">{it.name}</Link> : <span aria-current="page" className={tone === "dark" ? "text-paper" : "text-ink"}>{it.name}</span>}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export { abs };
