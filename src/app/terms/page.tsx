import LegalPage, { type LegalSection } from "@/components/ui/LegalPage";
import raw from "@/content/data/terms.raw.json";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions | The Website Grove",
  description: "The Website Grove terms and conditions, including refund, delivery and revision policies.",
  path: "/terms",
});

type Raw = { heading: string; blocks: LegalSection["blocks"] }[];

// Text is carried over verbatim from the live site. Only presentation changes:
//  - the first section is titled "Refund Policy" (its lead-in sentence is kept as the lead)
//  - the live page's heading index ("Terms of Use" list) is dropped, since the TOC replaces it.
const sections: LegalSection[] = (raw as Raw)
  .filter((s) => s.heading !== "Terms of Use")
  .map((s, i) =>
    i === 0
      ? { heading: "Refund Policy", lead: s.heading.replace(/,$/, ",") , blocks: s.blocks }
      : { heading: s.heading.replace(/:$/, ""), blocks: s.blocks }
  );

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" path="/terms" sections={sections} />;
}
