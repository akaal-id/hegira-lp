# Handoff: `/showcase` design-system page

Status: **implementation complete, build passes, visual QA in a browser not yet done** (ran out of session budget before driving a browser). This doc is meant to be handed to another AI agent (or a human) to pick up from here.

## What this task is

The landing page at `c:\Users\Indra\Documents\Codes\hegira\landing-page` (Next.js 16 App Router, TypeScript, Tailwind v4 + CSS Modules) exists to introduce Hegira's design system. The full product UI lives in a separate app at `C:\Users\Indra\Documents\Codes\hegira\event\frontend` (Vite/React, Tailwind, Redux, react-router, 65+ components spanning marketing, auth, business-matching, and a full event-management dashboard).

The task: port a curated, representative set of components from that source app into this codebase — redesigned to this project's actual conventions (CSS Modules, Hegira brand tokens, minimalist styling) rather than copied verbatim — then build a `/showcase` page presenting them as a living component library.

## Decisions already made (do not re-litigate unless the user asks)

Confirmed with the user via `AskUserQuestion` before building:
- **Scope:** Core UI & marketing components, and Dashboard/admin components. Auth flows and Business-matching were explicitly excluded from this pass.
- **Fidelity:** Presentational port only. Restyled to Hegira tokens/CSS Modules, kept local UI state (open/close, tabs, validation, hover) so everything is interactive, but stripped Redux/API calls/react-router/real navigation. Mock data + no-op handlers instead.
- **Curation, not 1:1 port:** the source has ~65 files including many near-duplicate CRUD modals (add/edit/delete for tickets, coupons, crew, orders...). Only ported one clean example per distinct UI pattern (see component list below) instead of every file. Explicitly excluded: `TicketScanner` (camera/device logic), `RichTextEditor`, the `DataTable`'s react-router URL-sync behavior, and one-off modals that don't add a new pattern (`EditAttendeeStatusModal`, `ScanTicketModal`, etc. — same shape as the form/confirm modals already included).
- **New dependency `lucide-react` was added** (`npm install lucide-react`, now in `package.json`). This project's prior convention was hand-rolled inline SVGs (per project memory) — this is a deliberate, flagged deviation because the source app uses lucide-react for ~25 distinct icons across the dashboard components, and hand-rolling all of them wasn't worth it. Installed version resolved to `1.28.0`.
- Full plan (with rationale) is saved at `C:\Users\Indra\.claude\plans\calm-puzzling-widget.md` if more context is needed.

## What was built

### Core UI components — `src/components/ui/<name>/<Name>.tsx` + `.module.css`
(pattern matches the existing `src/components/ui/button/Button.tsx`)

| Component | Notes |
|---|---|
| `logo/Logo.tsx` | Uses `next/image`, existing `/icon/hegiralogo.png` asset, `variant="default"\|"sidebar"` |
| `toggle-chip/ToggleChip.tsx` | Pill filter chip, `isSelected`/`onClick` |
| `loader/Loader.tsx` | Merges source's `LoadingSpinner` + `FullScreenLoader` into one component (`size`, `overlay`, `label` props) |
| `radial-progress/RadialProgress.tsx` | SVG ring, `percentage`/`size`/`strokeWidth`/`tone` |
| `breadcrumbs/Breadcrumbs.tsx` | Generalized to a `segments: {label, href?}[]` array instead of source's hardcoded event-detail breadcrumb |
| `article-card/ArticleCard.tsx` | Blog/article teaser card |
| `feature-item/FeatureItem.tsx` | Icon + title + description card, `tone="turquoise"\|"yellow"` |
| `floating-help-button/FloatingHelpButton.tsx` | FAB with expandable sub-buttons. **Positioned `absolute` not `fixed`** so it stays contained inside its showcase demo frame instead of floating over the whole page — see Known Considerations below |
| `copyable-text/CopyableText.tsx` | Click-to-copy with check-icon feedback |
| `status-badge/StatusBadge.tsx` | **New primitive, not a 1:1 source file** — extracted from the repeated dot+label status pattern seen inline in the source's `EventCardDB`/`TicketItemCardDB` (Aktif/Selesai/Draf, Tersedia/Habis, etc). `tone="positive"\|"warning"\|"negative"\|"neutral"` |
| `toast/Toast.tsx` | Notification toast stack, `type="success"\|"error"\|"warning"\|"info"` |
| `confirmation-modal/ConfirmationModal.tsx` | Generic confirm modal with `tone="default"\|"destructive"` — merges source's separate `DeleteConfirmationModal` into this one component |

### Dashboard components — new top-level `src/components/dashboard/<name>/<Name>.tsx` + `.module.css`

| Component | Notes |
|---|---|
| `user-menu/UserMenu.tsx` | Extracted from `UserMenuButton` inside source's `Navbar.tsx` (it's a dependency of the dashboard top bar) |
| `sidebar-nav/SidebarNav.tsx` | Collapsible sidebar, sections of `{id, label, icon}` items, local `useState` for collapse instead of parent-controlled |
| `top-bar/TopBar.tsx` | Breadcrumb trail (via the `ui/breadcrumbs` component) + `UserMenu`, mobile menu-toggle button |
| `data-table/DataTable.tsx` | **Rewritten**, not ported verbatim — source used `react-router-dom`'s `useSearchParams` for URL-synced state and an async `fetchData(params) => Promise` contract. This version takes a static `data: T[]` array and does search/filter/sort/pagination in local state/`useMemo`. Keeps the column config, mobile-card responsive behavior, filters, and sort-config API shape |
| `event-card/EventCardDB.tsx` | Uses the new `StatusBadge` |
| `ticket-item-card/TicketItemCard.tsx` | Uses `StatusBadge` + `ConfirmationModal` (delete flow) |
| `coupon-item-card/CouponItemCard.tsx` | Uses `ConfirmationModal` (delete flow) |
| `footer/DashboardFooter.tsx` | Simple copyright bar |
| `modals/add-ticket-modal/AddTicketModal.tsx` | Representative "complex form modal" pattern — name/price/description/quantity fields, inline validation errors, conditional "use event schedule" toggle revealing date/time fields. Trimmed from source's larger field set (dropped `maxPerTransaction`, `ticketIsTimeRange`, per-timezone selects, id-editing) to keep it a clean pattern demo rather than a full replica |

### Showcase page — `src/app/showcase/`

- `page.tsx` + `page.module.css` — the page itself. Two-column layout: sticky left nav (`ShowcaseNav`) + right content column of 20 numbered sections (`ShowcaseSection`), grouped under two `label-mono` category headers ("01 — Core UI & marketing", "02 — Dashboard & admin"). Rendered inside the existing root layout (`src/app/layout.tsx`), so the site's marketing `Navbar`/`Footer` wrap it — **this was a deliberate choice**, not an oversight; showcase is meant to live inside the marketing site's chrome, not as a standalone dashboard shell.
- `showcase-data.ts` — static mock data: sidebar sections/icons, 3 event cards, 3 ticket items, 2 coupons, 7 order rows (for the data table demo), 2 article cards, 3 toast items. Event images reference existing local assets in `public/event_mock/*.webp` (not external URLs — deliberate, to avoid `next/image` remote-pattern config and network dependency).
- `_components/ShowcaseSection.tsx` + `.module.css` — per-component demo wrapper: numbered `label-mono` eyebrow + title, optional description, bordered/tinted "stage" box around the live demo. Anchor `id` for deep-linking, `scroll-margin-top` set for the sticky top nav.
- `_components/ShowcaseNav.tsx` + `.module.css` — sticky in-page jump nav, hardcoded list of the 20 section anchors grouped by category (Core UI / Dashboard). **If a section is added/removed/renamed in `page.tsx`, this list must be updated to match — it is not generated from the sections automatically.**

### Styling approach

Followed project memory `feedback-design-minimalism`: single-hue gradients only (none used here, mostly flat), borders over shadows, thin/subtle shadows only on hover or for modal overlays, conservative type scale. Reused existing `globals.css` primitives (`.label-mono`, focus-visible outline tokens) rather than redeclaring. All new CSS uses the existing token set from `src/app/globals.css` (`--color-hegra-turquoise/navy/yellow/white`, `--font-jakarta`, `--font-mono`) via `color-mix()` for tints instead of hardcoded rgba where the source used Tailwind gray/blue utilities.

## Verified so far

- `npm run build` — **passes clean**. Compiled successfully, TypeScript check passed, static generation succeeded for all routes including `/showcase`. No type errors across any of the ~24 new component files or the page itself.

## NOT yet done — pick up here

1. **Visual QA in an actual browser.** This is the main gap. Was about to start when the session ran out of budget. Plan was:
   - `npm run dev` (or reuse a running instance — check `netstat -ano | grep 3000` / kill via PowerShell `Stop-Process` if a stale one from this session is still bound to port 3000)
   - Navigate to `http://localhost:3000/showcase`
   - Visually check every section renders correctly with the mock data
   - Exercise interactivity: open/close `ConfirmationModal` and `AddTicketModal`, expand/collapse `SidebarNav`, sort/filter/paginate the `DataTable`, click-to-copy on `CopyableText`, toggle `ToggleChip` states, open/close `FloatingHelpButton`'s sub-menu
   - Check responsive behavior at a narrow viewport (mobile card view for `DataTable`, the `TopBar`'s mobile menu button, `SidebarNav` collapse)
   - Check `console --errors` (or browser devtools console) for runtime warnings — none expected, but unverified
2. **Likely visual issues to look for**, since these were built from CSS written against source Tailwind markup without a live render to check against:
   - Spacing/alignment inside `ShowcaseSection`'s "stage" box — untested with real content flow
   - The `SidebarNav` demo frame (`page.module.css` `.sidebarFrame`, fixed height `26rem`) — confirm the sidebar's internal scroll and collapse animation look right when boxed in
   - `DataTable` desktop↔mobile breakpoint (720px) vs the page's own layout breakpoint (900px) — check there's no awkward double-transition zone
   - `AddTicketModal` and `ConfirmationModal` both use `position: fixed` overlays — confirm they correctly cover the viewport and aren't clipped by any ancestor `overflow: hidden`/`transform` (Next.js layout, Lenis smooth-scroll wrapper (`src/components/layout/smooth-scroll/SmoothScroll.tsx`) is a candidate to check, since it may apply a transform to the scroll container which would break `position: fixed` children)
   - `StatusBadge`'s CSS uses compound selectors like `span.dot.positive` in `StatusBadge.module.css` — this is valid CSS Modules (both classes are applied together on the same `<span>`) but wasn't visually confirmed
3. **Lint** — `npm run lint` (ESLint flat config) was never run against the new files. Worth running before calling this done.
4. **`package-lock.json`** — was updated by `npm install lucide-react`; not reviewed/committed.

## Files touched/created (nothing committed — all working-tree changes)

New dependency: `lucide-react` in `package.json`/`package-lock.json`.

New files (23 components × 2 files + 7 showcase-page files = 53 files):

```
src/components/ui/logo/{Logo.tsx,Logo.module.css}
src/components/ui/toggle-chip/{ToggleChip.tsx,ToggleChip.module.css}
src/components/ui/loader/{Loader.tsx,Loader.module.css}
src/components/ui/radial-progress/{RadialProgress.tsx,RadialProgress.module.css}
src/components/ui/breadcrumbs/{Breadcrumbs.tsx,Breadcrumbs.module.css}
src/components/ui/article-card/{ArticleCard.tsx,ArticleCard.module.css}
src/components/ui/feature-item/{FeatureItem.tsx,FeatureItem.module.css}
src/components/ui/floating-help-button/{FloatingHelpButton.tsx,FloatingHelpButton.module.css}
src/components/ui/copyable-text/{CopyableText.tsx,CopyableText.module.css}
src/components/ui/status-badge/{StatusBadge.tsx,StatusBadge.module.css}
src/components/ui/toast/{Toast.tsx,Toast.module.css}
src/components/ui/confirmation-modal/{ConfirmationModal.tsx,ConfirmationModal.module.css}

src/components/dashboard/user-menu/{UserMenu.tsx,UserMenu.module.css}
src/components/dashboard/sidebar-nav/{SidebarNav.tsx,SidebarNav.module.css}
src/components/dashboard/top-bar/{TopBar.tsx,TopBar.module.css}
src/components/dashboard/data-table/{DataTable.tsx,DataTable.module.css}
src/components/dashboard/event-card/{EventCardDB.tsx,EventCardDB.module.css}
src/components/dashboard/ticket-item-card/{TicketItemCard.tsx,TicketItemCard.module.css}
src/components/dashboard/coupon-item-card/{CouponItemCard.tsx,CouponItemCard.module.css}
src/components/dashboard/footer/{DashboardFooter.tsx,DashboardFooter.module.css}
src/components/dashboard/modals/add-ticket-modal/{AddTicketModal.tsx,AddTicketModal.module.css}

src/app/showcase/page.tsx
src/app/showcase/page.module.css
src/app/showcase/showcase-data.ts
src/app/showcase/_components/ShowcaseSection.tsx
src/app/showcase/_components/ShowcaseSection.module.css
src/app/showcase/_components/ShowcaseNav.tsx
src/app/showcase/_components/ShowcaseNav.module.css
```

No existing files were modified except `package.json` / `package-lock.json` (new dependency).

## Suggested next prompt for the next agent

> Continue the `/showcase` design-system page work in `c:\Users\Indra\Documents\Codes\hegira\landing-page`. Read `SHOWCASE_REPORT.md` in the repo root for full context — implementation is done and `npm run build` passes, but it has never been opened in a browser. Start the dev server, navigate to `/showcase`, and do the visual QA pass listed under "NOT yet done" in that report: check every section renders, exercise the interactive components (modals, sidebar collapse, data table sort/filter/paginate, copy-to-clipboard, toggle chips), check responsive behavior, and specifically verify the two `position: fixed` modals aren't broken by the Lenis smooth-scroll wrapper. Fix whatever visual bugs you find, then run `npm run lint`.
