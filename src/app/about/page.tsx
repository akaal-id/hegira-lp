import type { Metadata } from "next";
import RoutePlaceholder from "@/components/ui/route-placeholder/RoutePlaceholder";

export const metadata: Metadata = {
  title: "About — Hegira",
};

export default function AboutPage() {
  return (
    <RoutePlaceholder
      eyebrow="About Hegira"
      title="This page is coming soon"
      body="We're moving the About Hegira content here from the homepage. Check back shortly."
    />
  );
}
