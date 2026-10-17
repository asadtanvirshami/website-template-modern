import LegalPage, { type LegalSection } from "@/components/ui/LegalPage";
import raw from "@/content/data/privacy.raw.json";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | The Website Grove",
  description: "How The Website Grove collects, uses and protects your personal information.",
  path: "/privacy",
});

type Raw = { heading: string; blocks: LegalSection["blocks"] }[];
// Verbatim from the live site; only trailing colons are dropped from headings.
const sections: LegalSection[] = (raw as Raw).map((s) => ({ heading: s.heading.replace(/:$/, ""), blocks: s.blocks }));

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" path="/privacy" sections={sections} />;
}
