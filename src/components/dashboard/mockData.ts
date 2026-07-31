export interface DashboardEvent {
  id: string;
  name: string;
  slug: string;
  theme: string;
  category: 'b2c' | 'b2b' | 'b2g';
  status: 'Active' | 'Draft' | 'Completed';
  startDate: string;
  endDate: string;
  timeDisplay: string;
  location: string;
  address: string;
  coverImageUrl: string;
  parkingAvailable: boolean;
  totalQuota: number;
  ticketsSold: number;
  revenue: number;
  description: string;
  termsAndConditions: string;
}

export interface TicketTier {
  id: string;
  eventId: string;
  name: string;
  price: number;
  quota: number;
  sold: number;
  status: 'Available' | 'Sold Out' | 'Coming Soon';
  description: string;
}

export interface CouponItem {
  id: string;
  eventId: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  quota: number;
  used: number;
  validUntil: string;
  status: 'Active' | 'Inactive' | 'Expired';
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  eventId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  ticketName: string;
  quantity: number;
  totalPrice: number;
  status: 'Paid' | 'Pending' | 'Failed';
  createdDate: string;
}

export interface VisitorItem {
  id: string;
  eventId: string;
  ticketCode: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  ticketCategory: string;
  isCheckedIn: boolean;
  checkInTime?: string;
}

export interface CrewMember {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Gate Scanner' | 'Usher' | 'Coordinator';
  status: 'Active' | 'Invited';
  addedDate: string;
}

export interface OrganizerAccount {
  fullName: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  organizationName: string;
  profilePictureUrl: string;
}

export const initialOrganizerAccount: OrganizerAccount = {
  fullName: "Indra Organizer",
  email: "indra.organizer@hegira.id",
  phone: "+62 812-3456-7890",
  gender: "Male",
  dateOfBirth: "1994-08-17",
  organizationName: "Akaal Creative Labs",
  profilePictureUrl: "/event_mock/KV-culfest.webp",
};

export const initialDashboardEvents: DashboardEvent[] = [
  {
    id: "evt-1",
    name: "Sunset Music Fest 2026",
    slug: "sunset-music-fest-2026",
    theme: "Beachfront Music & Food Festival",
    category: "b2c",
    status: "Active",
    startDate: "2026-08-16",
    endDate: "2026-08-17",
    timeDisplay: "04:00 PM - 11:00 PM WIB",
    location: "Ancol Beach City, Jakarta",
    address: "Jl. Lodan Timur No. 7, Ancol, Pademangan, North Jakarta",
    coverImageUrl: "/event_mock/KV-culfest.webp",
    parkingAvailable: true,
    totalQuota: 2500,
    ticketsSold: 1840,
    revenue: 460000000,
    description: "Enjoy performances by renowned national and international artists while witnessing a spectacular sunset by the Ancol beach.",
    termsAndConditions: "1. E-tickets must be exchanged for a wristband on event day.\n2. Sharp objects, illegal substances, and outside food are prohibited.\n3. Purchased tickets are non-refundable and non-transferable.",
  },
  {
    id: "evt-2",
    name: "National Tech Summit 2026",
    slug: "national-tech-summit-2026",
    theme: "AI Technology & Innovation Conference",
    category: "b2b",
    status: "Active",
    startDate: "2026-08-22",
    endDate: "2026-08-23",
    timeDisplay: "09:00 AM - 05:00 PM WIB",
    location: "Bandung Convention Center, Bandung",
    address: "Jl. Soekarno Hatta No. 354, Bandung",
    coverImageUrl: "/event_mock/KV-d8hei26.webp",
    parkingAvailable: true,
    totalQuota: 1000,
    ticketsSold: 750,
    revenue: 375000000,
    description: "The gathering place for startup founders, VC investors, and technology leaders discussing the future of artificial intelligence.",
    termsAndConditions: "1. Ticket valid for 2 full event days.\n2. Includes digital certificate, buffet lunch, and networking lounge access.",
  },
  {
    id: "evt-3",
    name: "Smart City Forum 2026",
    slug: "smart-city-forum-2026",
    theme: "Public Sector Digital Transformation",
    category: "b2g",
    status: "Draft",
    startDate: "2026-09-03",
    endDate: "2026-09-03",
    timeDisplay: "08:30 AM - 04:00 PM WIB",
    location: "Grand City Hall, Surabaya",
    address: "Jl. Walikota Mustajab No. 1, Surabaya",
    coverImageUrl: "/event_mock/KV-heitalk.webp",
    parkingAvailable: true,
    totalQuota: 500,
    ticketsSold: 0,
    revenue: 0,
    description: "A collaborative forum with public policymakers and urban experts accelerating Indonesia's Smart City ecosystem.",
    termsAndConditions: "1. Exclusive for invited delegates and verified registrants.\n2. Official government/institutional ID required at entry.",
  },
  {
    id: "evt-4",
    name: "Artisan Market Fair 2026",
    slug: "artisan-market-fair-2026",
    theme: "Crafts & Creative Economy Expo",
    category: "b2c",
    status: "Completed",
    startDate: "2026-07-10",
    endDate: "2026-07-12",
    timeDisplay: "10:00 AM - 09:00 PM WIB",
    location: "Jogja Expo Center, Yogyakarta",
    address: "Jl. Raya Janti No. 156, Banguntapan, Bantul, DIY",
    coverImageUrl: "/event_mock/KV-bena.webp",
    parkingAvailable: true,
    totalQuota: 3000,
    ticketsSold: 2980,
    revenue: 149000000,
    description: "Indonesian arts and craft fair featuring over 150 talented local artisans.",
    termsAndConditions: "1. Single entry ticket valid for the selected date.",
  },
];

export const initialTicketTiers: TicketTier[] = [
  {
    id: "tkt-101",
    eventId: "evt-1",
    name: "Early Bird General Access",
    price: 150000,
    quota: 500,
    sold: 500,
    status: "Sold Out",
    description: "General standing access for 1 day.",
  },
  {
    id: "tkt-102",
    eventId: "evt-1",
    name: "Presale General Access",
    price: 250000,
    quota: 1200,
    sold: 1040,
    status: "Available",
    description: "General standing access for 1 day, includes souvenir merch kit.",
  },
  {
    id: "tkt-103",
    eventId: "evt-1",
    name: "VIP Front Stage Lounge",
    price: 600000,
    quota: 800,
    sold: 300,
    status: "Available",
    description: "Front-stage access, air-conditioned VIP Lounge, and free-flow snacks.",
  },
  {
    id: "tkt-201",
    eventId: "evt-2",
    name: "Delegate Pass (2 Days)",
    price: 500000,
    quota: 1000,
    sold: 750,
    status: "Available",
    description: "Full access to keynote sessions, expo hall, and catering lunch.",
  },
];

export const initialCoupons: CouponItem[] = [
  {
    id: "cpn-1",
    eventId: "evt-1",
    code: "SUNSET2026",
    discountType: "percentage",
    discountValue: 15,
    quota: 200,
    used: 142,
    validUntil: "2026-08-15",
    status: "Active",
  },
  {
    id: "cpn-2",
    eventId: "evt-1",
    code: "HEGIRAPROMO",
    discountType: "fixed",
    discountValue: 50000,
    quota: 100,
    used: 88,
    validUntil: "2026-08-10",
    status: "Active",
  },
];

export const initialOrders: OrderItem[] = [
  {
    id: "ord-1001",
    orderNumber: "HGR-202608-0012",
    eventId: "evt-1",
    buyerName: "Budi Santoso",
    buyerEmail: "budi.santoso@gmail.com",
    buyerPhone: "+62 812-9988-7766",
    ticketName: "VIP Front Stage Lounge",
    quantity: 2,
    totalPrice: 1200000,
    status: "Paid",
    createdDate: "2026-07-28 02:22 PM",
  },
  {
    id: "ord-1002",
    orderNumber: "HGR-202608-0013",
    eventId: "evt-1",
    buyerName: "Siti Rahmawati",
    buyerEmail: "siti.rahma@yahoo.com",
    buyerPhone: "+62 856-1122-3344",
    ticketName: "Presale General Access",
    quantity: 4,
    totalPrice: 1000000,
    status: "Paid",
    createdDate: "2026-07-29 09:15 AM",
  },
  {
    id: "ord-1003",
    orderNumber: "HGR-202608-0014",
    eventId: "evt-1",
    buyerName: "Rian Hidayat",
    buyerEmail: "rian.hidayat@hotmail.com",
    buyerPhone: "+62 878-5544-3322",
    ticketName: "Presale General Access",
    quantity: 1,
    totalPrice: 250000,
    status: "Pending",
    createdDate: "2026-07-30 06:40 PM",
  },
];

export const initialVisitors: VisitorItem[] = [
  {
    id: "vis-1",
    eventId: "evt-1",
    ticketCode: "TKT-SUNSET-8821",
    visitorName: "Budi Santoso",
    visitorEmail: "budi.santoso@gmail.com",
    visitorPhone: "+62 812-9988-7766",
    ticketCategory: "VIP Front Stage Lounge",
    isCheckedIn: true,
    checkInTime: "2026-08-16 04:30 PM",
  },
  {
    id: "vis-2",
    eventId: "evt-1",
    ticketCode: "TKT-SUNSET-8822",
    visitorName: "Citra Santoso",
    visitorEmail: "citra.s@gmail.com",
    visitorPhone: "+62 812-9988-7767",
    ticketCategory: "VIP Front Stage Lounge",
    isCheckedIn: true,
    checkInTime: "2026-08-16 04:32 PM",
  },
  {
    id: "vis-3",
    eventId: "evt-1",
    ticketCode: "TKT-SUNSET-9104",
    visitorName: "Siti Rahmawati",
    visitorEmail: "siti.rahma@yahoo.com",
    visitorPhone: "+62 856-1122-3344",
    ticketCategory: "Presale General Access",
    isCheckedIn: false,
  },
];

export const initialCrew: CrewMember[] = [
  {
    id: "crw-1",
    eventId: "evt-1",
    name: "Agus Pratama",
    email: "agus.p@hegira.id",
    phone: "+62 813-1111-2222",
    role: "Admin",
    status: "Active",
    addedDate: "2026-07-01",
  },
  {
    id: "crw-2",
    eventId: "evt-1",
    name: "Dewi Lestari",
    email: "dewi.l@hegira.id",
    phone: "+62 813-3333-4444",
    role: "Gate Scanner",
    status: "Active",
    addedDate: "2026-07-05",
  },
];
