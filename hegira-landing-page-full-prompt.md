# Hegira Marketing Landing Page — Development Brief

## 1. Project Overview
Build a single-page marketing website for **Hegira** (hegira.id), an integrated event platform. Hegira lets organizers sell tickets and manage events end-to-end (B2C, B2B, and B2G), and is expanding into a second product pillar: **Business Matching**, a B2B/B2G networking and business-matching platform.

**Primary audience:** event organizers (B2B/B2G-leaning, with a bit of B2C energy so the page doesn't feel purely corporate).
**Primary goal / CTA:** drive sign-ups — "Start Free".
**Copy language:** English.
**Tone:** confident, modern, product-led — not generic corporate SaaS.

## 2. Deliverable & Tech Requirements
- Single responsive page (mobile-first), production-ready HTML/CSS (Tailwind CSS v4) — React/Next.js component structure is also acceptable if that's the agent's default stack, but keep it a single cohesive page.
- Use the exact design tokens below (already defined as a Tailwind v4 `@theme`) — do not invent new brand colors.
- Fully responsive across mobile / tablet / desktop breakpoints.
- Accessible: semantic HTML, proper heading hierarchy, alt text on all images, visible focus states, sufficient color contrast (check navy-on-white and white-on-navy pairs).
- Performance: lazy-load below-the-fold images, respect `prefers-reduced-motion` (disable/reduce parallax and glow animations for users who request it).
- Smooth-scroll enabled (already in base CSS below).
- Include basic SEO meta tags (title, description, OG tags) for a marketing page.

## 3. Design System (use as-is)

```css
@import "tailwindcss";
@theme {
  --color-hegra-turquoise: #4b998e;
  --color-hegra-yellow: #ebaf4c;
  --color-hegra-navy: #18093b;
  --color-hegra-white: #feffff;
  --color-hegra-deep-navy: #18093b;
  --color-hegra-light-bg: #feffff;
  --color-hegra-card-bg: #feffff;
  --color-hegra-gradient-start: #4b998e;
  --color-hegra-gradient-mid: #ebaf4c;
  --color-hegra-gradient-end: #ebaf4c;
  --color-hegra-chino: #d0cea9;
  --font-sans: 'Inter', sans-serif;
  --font-jakarta: 'Plus Jakarta Sans', sans-serif;
  --animate-fade-in-up: fadeInUp 0.8s ease-out forwards;
  --animate-fade-in: fadeIn 0.8s ease-out forwards;
  --animate-slide-in-left: slideInLeft 0.8s ease-out forwards;
  --animate-glow: glow 2s infinite alternate;
  --animate-slow-spin: spin 20s linear infinite;
  --animate-pulse-slow: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-hero-bg-pan: heroBgPan 15s ease infinite alternate;
  @keyframes fadeInUp { 0% { opacity:0; transform:translateY(20px);} 100% { opacity:1; transform:translateY(0);} }
  @keyframes fadeIn { 0% { opacity:0;} 100% { opacity:1;} }
  @keyframes slideInLeft { 0% { opacity:0; transform:translateX(-30px);} 100% { opacity:1; transform:translateX(0);} }
  @keyframes glow { 0% { box-shadow:0 0 5px var(--color-hegra-yellow),0 0 10px var(--color-hegra-yellow);} 100% { box-shadow:0 0 15px color-mix(in srgb, var(--color-hegra-yellow) 80%, transparent),0 0 25px color-mix(in srgb, var(--color-hegra-yellow) 80%, transparent);} }
  @keyframes heroBgPan { 0% { background-position:0% 50%;} 100% { background-position:100% 50%;} }
}
html { scroll-behavior: smooth; }
body { font-family:'Inter',sans-serif; background-color:#feffff; color:#18093b; }
.text-gradient { background-clip:text; -webkit-background-clip:text; color:transparent; background-image:linear-gradient(to right,#4b998e,#ebaf4c,#ebaf4c); }
```

Headings use `font-jakarta` (Plus Jakarta Sans, bold/700). Body copy uses `font-sans` (Inter).

## 4. Visual / Art Direction
- **Palette mood:** light and clean — white (`#feffff`) background dominates. Navy (`#18093b`) for all body/heading text. Turquoise and yellow are **accents only**: gradient text on key phrases, glowing CTA buttons, thin decorative lines/dividers — never large flat color blocks.
- **Layout style:** "layered depth." Cards, app mockups, and stat blocks appear to float above the page with soft shadows; on scroll, apply subtle parallax (different scroll speeds for foreground vs background layers, small translate/rotate on entry).
- **Background texture:** minimal geometric pattern — thin dot-grid or line-grid at very low opacity (~5–8%), not organic blobs. This grid can subtly warp/shift near the hero and section transitions.
- **Motion:** use the existing keyframes (`fadeInUp`, `fadeIn`, `slideInLeft`, `glow`, `heroBgPan`, `slow-spin`, `pulse-slow`) as scroll-triggered reveals (IntersectionObserver) — elements fade/slide in once when they enter viewport, not on every scroll.
- **Avoid:** generic 3-column icon-boxes-on-white SaaS template look, stock illustration people, heavy drop shadows, purple/blue gradient clichés. Reference quality bar: Awwwards-tier — big confident typography, generous whitespace, refined micro-interactions on hover/scroll.

## 5. Logo & Assets
Hegira logo (provided as a separate file, `hegira-logo.png`): a gradient "H" mark (turquoise → yellow, abstract flowing shape) beside a navy wordmark "Hegira," with a small "powered by Akaal" tagline underneath. Use it in the navbar (compact, ~32–40px height) and footer (larger). Reserve clear space around it; don't recolor it.

## 6. Page Structure — exactly 1 hero + 5 sections + footer

### Section 1 — Hero
- **Eyebrow/badge (optional):** "The Integrated Event Platform"
- **Headline:** "Run Every Event. On One Platform."
- **Subheadline:** "Hegira gives organizers everything to sell tickets, manage attendees, and grow their events — with a whitelabel experience that feels entirely your own."
- **Primary CTA:** "Start Free" (glowing button, uses `animate-glow`)
- **Secondary CTA (optional):** "See how it works" (text link/ghost button)
- **Visual:** a floating app/dashboard mockup with parallax depth, subtle gradient glow behind it, faint grid pattern in the background, animated with `heroBgPan`.

### Section 2 — Ongoing Events
- **Heading:** "Happening Right Now on Hegira"
- **Subheading:** "A glimpse of the events live on the platform today."
- **Content:** horizontal-scroll or grid of 4–6 event cards (dummy but realistic data): event name, date, city, category badge (B2C / B2B / B2G — reuse the existing `.event-card-category-b2c/b2b/b2g` color logic), small thumbnail. Cards should have soft shadow + slight lift on hover.

### Section 3 — About Hegira
- **Heading:** "Built for Every Kind of Event"
- **Body (2–3 sentences):** "Hegira is an integrated event platform built for organizers who run everything from community meetups to government conferences. One dashboard for ticketing, attendee management, and promotion — no more juggling five different tools."
- **Stats row (placeholder numbers):** "1,200+ Events Hosted" · "150K+ Tickets Sold" · "300+ Organizers"

### Section 4 — Feature Highlights (4 pillars)
Layout as an asymmetric bento-style grid (not equal 4-up boxes), each with a small visual/mockup snippet.

1. **Whitelabel & Custom Website** — "Launch a fully branded event site on your own domain. Your colors, your logo, your URL — no Hegira branding in sight."
2. **Customizable Data** — "Build the exact registration form each event needs. Add, remove, or reorder fields to capture only the attendee data that matters to you."
3. **Marketing Tools** — "Sell more tickets with built-in promo codes, referral & affiliate tracking, email/WhatsApp broadcasts to registrants, SEO-ready event pages with pixel tracking, and automatic waitlists when you sell out."
4. **Event Management** — "Manage ticket types and quotas, check attendees in with QR scanning, and track sales and demographics in real time — all from a single dashboard."

### Section 5 — Business Matching
- **Heading:** "Beyond Tickets: Introducing Business Matching"
- **Body:** "Hegira is expanding beyond events into Business Matching — a dedicated platform for connecting organizers, sponsors, exhibitors, and government partners. Where Hegira Events powers how you run an event, Hegira Business Matching powers who you meet there — turning attendee lists into real business relationships for B2B and B2G organizers."
- **Framing:** present as Hegira's second ecosystem pillar / roadmap vision — can include a "Coming Soon" tag but should read as a full, confident value proposition, not an afterthought.
- **Visual:** network/connection-style graphic (nodes/lines), kept in the same minimal geometric style — not literal people photos.

### Footer (with integrated final CTA)
- **CTA banner within footer:** "Ready to run your next event on Hegira?" + "Start Free" button (glow effect).
- **Columns:** Logo + tagline / Product (Ticketing, Event Management, Business Matching) / Company (About, Contact) / Social links.
- **Bottom bar:** "© 2026 Hegira. Powered by Akaal." + legal links (Privacy, Terms).

## 7. Do / Don't
- **Do:** make it feel alive (Ongoing Events section), premium (typography + motion), and forward-looking (Business Matching).
- **Do:** keep exactly 5 middle sections — do not add extra sections like "How it Works," "Testimonials," or "Pricing."
- **Don't:** use stock photography of generic business people.
- **Don't:** make Business Matching feel like a minor footnote — give it equal visual weight to Feature Highlights.
