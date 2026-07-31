import type { Metadata } from "next";
import RoutePlaceholder from "@/components/ui/route-placeholder/RoutePlaceholder";

export const metadata: Metadata = {
  title: "Business Matching — Hegira",
};

export default function BusinessMatchingPage() {
  return (
    <RoutePlaceholder
      eyebrow="Coming Soon"
      title="This page is coming soon"
      body="We're moving the full Business Matching pitch here from the homepage. Check back shortly."
    />
  );
}
