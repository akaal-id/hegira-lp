import type { Metadata } from "next";
import RoutePlaceholder from "@/components/ui/route-placeholder/RoutePlaceholder";

export const metadata: Metadata = {
  title: "Events — Hegira",
};

export default function EventsPage() {
  return (
    <RoutePlaceholder
      eyebrow="Live on Hegira"
      title="This page is coming soon"
      body="We're moving the full events listing here from the homepage. Check back shortly."
    />
  );
}
