"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  CheckCheck,
  ClipboardList,
  LayoutDashboard,
  PlusCircle,
  ShoppingCart,
  Tag,
  Ticket,
  UserCircle,
  Users,
} from "lucide-react";
import SidebarNav, { type SidebarSection } from "@/components/dashboard/sidebar-nav/SidebarNav";
import TopBar from "@/components/dashboard/top-bar/TopBar";
import { initialDashboardEvents, initialOrganizerAccount } from "@/components/dashboard/mockData";
import shellStyles from "./DashboardShell.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [trackedPathname, setTrackedPathname] = useState(pathname);

  // Enter "event mode" when viewing a specific event; exit it back at the
  // event list or the create form. Any other route (Tickets, Coupons, ...)
  // leaves the current event mode untouched so it persists while browsing
  // that event's operations. Adjusted during render (not an effect) since
  // it only needs to react to pathname changes, not synchronize with
  // anything external.
  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    const eventMatch = pathname.match(/^\/dashboard\/events\/([^/]+)/);
    if (eventMatch && eventMatch[1] !== "create") {
      setActiveEventId(eventMatch[1]);
    } else if (pathname === "/dashboard" || pathname === "/dashboard/events/create") {
      setActiveEventId(null);
    }
  }

  // Derive active ID from pathname for sidebar highlighting
  const getActiveId = (): string => {
    if (pathname === "/dashboard") return "/dashboard";
    return pathname;
  };

  const activeId = getActiveId();

  // Sidebar navigation sections with URL hrefs.
  // Event Management is hidden in event mode — the EventSwitcher (rendered
  // above these sections) takes over event selection + exiting event mode.
  const sidebarSections: SidebarSection[] = [
    ...(activeEventId
      ? []
      : [
          {
            title: "Event Management",
            items: [
              { id: "/dashboard", label: "Event List", icon: ClipboardList, href: "/dashboard" },
              { id: "/dashboard/events/create", label: "Create New Event", icon: PlusCircle, href: "/dashboard/events/create" },
            ],
          } satisfies SidebarSection,
        ]),
    ...(activeEventId
      ? [
          {
            title: "Event Operations",
            items: [
              { id: `/dashboard/events/${activeEventId}`, label: "Event Overview", icon: LayoutDashboard, href: `/dashboard/events/${activeEventId}` },
              { id: "/dashboard/tickets", label: "Tickets", icon: Ticket, href: "/dashboard/tickets" },
              { id: "/dashboard/coupons", label: "Coupons", icon: Tag, href: "/dashboard/coupons" },
              { id: "/dashboard/orders", label: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
              { id: "/dashboard/visitors", label: "Visitors", icon: Users, href: "/dashboard/visitors" },
              { id: "/dashboard/crew", label: "Crew", icon: CheckCheck, href: "/dashboard/crew" },
            ],
          } satisfies SidebarSection,
        ]
      : []),
    {
      title: "Organizer Account",
      items: [
        { id: "/dashboard/account", label: "Account Info", icon: UserCircle, href: "/dashboard/account" },
      ],
    },
  ];

  // Derive breadcrumbs based on pathname
  const getBreadcrumbs = () => {
    const segments = [{ label: "Dashboard", href: "/dashboard" }];

    if (pathname === "/dashboard/events/create") {
      segments.push({ label: "Create Event", href: "/dashboard/events/create" });
    } else if (pathname.startsWith("/dashboard/events/")) {
      segments.push({ label: "Event Overview", href: pathname });
    } else if (pathname === "/dashboard/tickets") {
      segments.push({ label: "Tickets", href: "/dashboard/tickets" });
    } else if (pathname === "/dashboard/coupons") {
      segments.push({ label: "Coupons", href: "/dashboard/coupons" });
    } else if (pathname === "/dashboard/orders") {
      segments.push({ label: "Orders", href: "/dashboard/orders" });
    } else if (pathname === "/dashboard/visitors") {
      segments.push({ label: "Visitors", href: "/dashboard/visitors" });
    } else if (pathname === "/dashboard/crew") {
      segments.push({ label: "Crew", href: "/dashboard/crew" });
    } else if (pathname === "/dashboard/account") {
      segments.push({ label: "Account Info", href: "/dashboard/account" });
    }

    return segments;
  };

  return (
    <div className={shellStyles.shell}>
      <div className={shellStyles.layout}>
        {/* Sidebar */}
        <aside
          className={`${shellStyles.sidebar} ${isMobileNavOpen ? shellStyles.mobileOpen : ""}`}
        >
          <SidebarNav
            sections={sidebarSections}
            activeId={activeId}
            onSelect={() => setIsMobileNavOpen(false)}
            switcherEvents={initialDashboardEvents}
            activeEventId={activeEventId}
          />
        </aside>

        {/* Mobile backdrop */}
        {isMobileNavOpen && (
          <div
            className={shellStyles.overlay}
            onClick={() => setIsMobileNavOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Content area */}
        <div className={shellStyles.contentArea}>
          <TopBar
            segments={getBreadcrumbs()}
            userName={initialOrganizerAccount.fullName}
            onToggleMobileNav={() => setIsMobileNavOpen((v) => !v)}
          />

          <main className={shellStyles.main}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
