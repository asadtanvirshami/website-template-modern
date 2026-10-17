import { buildMetadata } from "@/lib/seo";
import { Hero, Intro, SelectedWork, Statement, ServicesSection, WhySection, ProcessSection, Credibility, JournalPreview } from "@/components/home/Sections";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import { CtaBand, FaqSection } from "@/components/ui/blocks";
import { FAQS, TESTIMONIALS } from "@/content/copy";

export const metadata = buildMetadata({
  title: "The Website Grove | Web Design, Development & Digital Marketing Agency",
  description: "The Website Grove is a creative digital agency in Bakersfield, California — web design and development, eCommerce, branding, logo design, SEO, social media marketing, video animation and content writing.",
  path: "/",
});

export default function Home() {
  const approved = TESTIMONIALS.filter((t) => t.approved);
  return (
    <>
      <Hero />
      <Intro />
      <SelectedWork />
      <Statement />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <Credibility />
      {approved.length > 0 && <TestimonialSlider items={approved} />}
      <JournalPreview />
      <FaqSection faqs={FAQS.general} />
      <CtaBand />
    </>
  );
}
