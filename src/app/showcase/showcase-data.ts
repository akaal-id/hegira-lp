import {
  BarChart3,
  LayoutDashboard,
  Settings,
  Tag,
  Ticket,
  Users,
} from "lucide-react";
import type { SidebarSection } from "@/components/dashboard/sidebar-nav/SidebarNav";
import type { EventCardDBData } from "@/components/dashboard/event-card/EventCardDB";
import type { TicketItemData } from "@/components/dashboard/ticket-item-card/TicketItemCard";
import type { CouponItemData } from "@/components/dashboard/coupon-item-card/CouponItemCard";
import type { ToastItem } from "@/components/ui/toast/Toast";

export const sidebarSections: SidebarSection[] = [
  {
    title: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Event management",
    items: [
      { id: "tickets", label: "Tickets", icon: Ticket },
      { id: "coupons", label: "Coupons", icon: Tag },
      { id: "attendees", label: "Attendees", icon: Users },
    ],
  },
  {
    title: "Account",
    items: [{ id: "settings", label: "Settings", icon: Settings }],
  },
];

export const eventCards: EventCardDBData[] = [
  {
    id: "evt-1",
    name: "Hei Talk Vol. 4: Future of Work",
    coverImageUrl: "/event_mock/KV-heitalk.webp",
    status: "Active",
    statusTone: "positive",
    date: "24 Aug 2026",
    time: "13:00 WIB",
    address: "The Kasablanka Hall, Jakarta",
  },
  {
    id: "evt-2",
    name: "Culture Fest 2026",
    coverImageUrl: "/event_mock/KV-culfest.webp",
    status: "Draft",
    statusTone: "warning",
    date: "12 Sep 2026",
    time: "10:00 WIB",
    address: "GBK Senayan, Jakarta",
  },
  {
    id: "evt-3",
    name: "D8 Heritage Exhibition",
    coverImageUrl: "/event_mock/KV-d8hei26.webp",
    status: "Completed",
    statusTone: "neutral",
    date: "02 Mar 2026",
    time: "09:00 WIB",
    address: "Museum Nasional, Jakarta",
  },
];

export const ticketItems: TicketItemData[] = [
  {
    id: "tik-1",
    name: "Early Bird",
    eventName: "Hei Talk Vol. 4",
    price: 150000,
    sold: 480,
    maxQuantity: 500,
    availability: { label: "Almost sold out", tone: "warning" },
  },
  {
    id: "tik-2",
    name: "Regular",
    eventName: "Hei Talk Vol. 4",
    price: 225000,
    sold: 210,
    maxQuantity: 800,
    availability: { label: "Available", tone: "positive" },
  },
  {
    id: "tik-3",
    name: "VIP",
    eventName: "Culture Fest 2026",
    price: 450000,
    sold: 120,
    maxQuantity: 120,
    availability: { label: "Sold out", tone: "negative" },
  },
];

export const couponItems: CouponItemData[] = [
  {
    id: "cpn-1",
    name: "Early Bird Discount",
    code: "EARLYBIRD10",
    eventName: "Hei Talk Vol. 4",
    discountLabel: "10%",
    quantity: 200,
    validity: "1 Jul – 1 Aug 2026",
  },
  {
    id: "cpn-2",
    name: "Community Partner",
    code: "COMMUNITY50K",
    eventName: "Culture Fest 2026",
    discountLabel: "Rp 50.000",
    quantity: 50,
    validity: "Until sold out",
  },
];

export interface OrderRow {
  id: string;
  buyer: string;
  ticket: string;
  amount: number;
  status: { label: string; tone: "positive" | "warning" | "negative" | "neutral" };
}

export const orderRows: OrderRow[] = [
  { id: "ORD-10231", buyer: "Sarah Wijaya", ticket: "Early Bird", amount: 150000, status: { label: "Paid", tone: "positive" } },
  { id: "ORD-10232", buyer: "Bagas Nugroho", ticket: "Regular", amount: 225000, status: { label: "Paid", tone: "positive" } },
  { id: "ORD-10233", buyer: "Nadia Putri", ticket: "VIP", amount: 450000, status: { label: "Pending", tone: "warning" } },
  { id: "ORD-10234", buyer: "Fajar Ramadhan", ticket: "Regular", amount: 225000, status: { label: "Refunded", tone: "negative" } },
  { id: "ORD-10235", buyer: "Clara Amelia", ticket: "Early Bird", amount: 150000, status: { label: "Paid", tone: "positive" } },
  { id: "ORD-10236", buyer: "Deni Setiawan", ticket: "VIP", amount: 450000, status: { label: "Paid", tone: "positive" } },
  { id: "ORD-10237", buyer: "Intan Permata", ticket: "Regular", amount: 225000, status: { label: "Cancelled", tone: "neutral" } },
];

export const articleCards = [
  {
    imageUrl: "/event_mock/KV-bena.webp",
    category: "Tips & Tricks",
    title: "5 Ways to Boost Ticket Sales Before Your Event",
    excerpt: "From early-bird pricing to community partnerships — practical tactics organizers use to sell out faster.",
    author: "Hegira Team",
    date: "12 Jun 2026",
  },
  {
    imageUrl: "/event_mock/KV-heitalk-1.webp",
    category: "Case Study",
    title: "How Hei Talk Grew Its Community Across 3 Cities",
    excerpt: "A look at the business-matching features that helped one organizer scale a recurring event series.",
    author: "Hegira Team",
    date: "28 May 2026",
  },
];

export const toastItems: ToastItem[] = [
  { id: "t1", type: "success", title: "Event published", message: "Your event is now live and visible to attendees." },
  { id: "t2", type: "warning", title: "Low ticket stock", message: "Early Bird has less than 20 tickets remaining." },
  { id: "t3", type: "error", title: "Payment failed", message: "The payout to your bank account could not be processed." },
];
