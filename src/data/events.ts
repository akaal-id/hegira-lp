import type { EventCategory } from "@/lib/categoryColors";

export interface OngoingEvent {
  id: string;
  name: string;
  date: string;
  city: string;
  category: EventCategory;
  initial: string;
  image: string;
}

export const ongoingEvents: OngoingEvent[] = [
  {
    id: "sunset-music-fest",
    name: "Sunset Music Fest",
    date: "Aug 16, 2026",
    city: "Jakarta",
    category: "b2c",
    initial: "S",
    image: "/event_mock/KV-culfest.webp",
  },
  {
    id: "national-tech-summit",
    name: "National Tech Summit",
    date: "Aug 22, 2026",
    city: "Bandung",
    category: "b2b",
    initial: "N",
    image: "/event_mock/KV-d8hei26.webp",
  },
  {
    id: "smart-city-forum",
    name: "Smart City Forum",
    date: "Sep 3, 2026",
    city: "Surabaya",
    category: "b2g",
    initial: "S",
    image: "/event_mock/KV-heitalk.webp",
  },
  {
    id: "artisan-market-fair",
    name: "Artisan Market Fair",
    date: "Sep 10, 2026",
    city: "Yogyakarta",
    category: "b2c",
    initial: "A",
    image: "/event_mock/KV-bena.webp",
  },
  {
    id: "sme-growth-expo",
    name: "SME Growth Expo",
    date: "Sep 18, 2026",
    city: "Medan",
    category: "b2b",
    initial: "G",
    image: "/event_mock/KV-heitalk-1.webp",
  },
  {
    id: "public-services-conference",
    name: "Public Services Conference",
    date: "Sep 27, 2026",
    city: "Bali",
    category: "b2g",
    initial: "P",
    image: "/event_mock/KV-culfest.webp",
  },
];
