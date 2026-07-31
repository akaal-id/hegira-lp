export interface FeatureHighlight {
  id: string;
  title: string;
  body: string;
}

export const featureHighlights: FeatureHighlight[] = [
  {
    id: "whitelabel",
    title: "Whitelabel & Custom Website",
    body: "Launch a fully branded event site on your own domain. Your colors, your logo, your URL — no Hegira branding in sight.",
  },
  {
    id: "customizable-data",
    title: "Customizable Data",
    body: "Build the exact registration form each event needs. Add, remove, or reorder fields to capture only the attendee data that matters to you.",
  },
  {
    id: "marketing-tools",
    title: "Marketing Tools",
    body: "Sell more tickets with built-in promo codes, referral & affiliate tracking, email/WhatsApp broadcasts to registrants, SEO-ready event pages with pixel tracking, and automatic waitlists when you sell out.",
  },
  {
    id: "event-management",
    title: "Event Management",
    body: "Manage ticket types and quotas, check attendees in with QR scanning, and track sales and demographics in real time — all from a single dashboard.",
  },
];
