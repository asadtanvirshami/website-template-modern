/** TWG monogram, redrawn as a single-colour SVG from the supplied logo geometry. */
export default function Logo({ className = "", title = "The Website Grove" }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="122 165 1755 623" role="img" aria-label={title} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M122 165H632V335H462V788H292V335H122Z" />
      <path d="M688 165H858V618H915V165H1085V618H1141V165H1311V788H688Z" />
      <path d="M1368 165H1877V335H1537V618H1707V535H1620V420H1877V788H1368Z" />
    </svg>
  );
}
