/** Site-wide settings. Edit here — nothing below this file hardcodes contact data. */
export const SITE = {
  name: "The Website Grove",
  shortName: "TWG",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thewebsitegrove.com",
  tagline: "Creative digital agency in Bakersfield, California",
  description:
    "The Website Grove is a creative digital agency combining distinctive design, powerful technology, and strategic thinking to build brands and websites with lasting impact.",
  phone: { display: "+1 (661) 593-4255", href: "tel:+16615934255" },
  email: "info@thewebsitegrove.com",
  address: {
    street: "4900 California Ave, Suite 530-B",
    city: "Bakersfield",
    region: "CA",
    // VERIFY BEFORE PUBLISHING: the live site prints "9330" (4 digits). The real
    // ZIP must be confirmed — left blank rather than guessed.
    postalCode: "",
    country: "US",
    lat: 35.3733,
    lng: -119.0187,
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/thewebsitegrove/" },
    { label: "Instagram", href: "https://www.instagram.com/thewebsitegrove/" },
    { label: "Pinterest", href: "https://www.pinterest.com/thewebsitegrove/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/the-website-grove/" },
    { label: "X", href: "https://x.com/thewebsitegrove" },
  ],
  timezone: "America/Los_Angeles",
} as const;

export const NAV = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region}${
  SITE.address.postalCode ? " " + SITE.address.postalCode : ""
}`;
