import type { Metadata } from "next";
import RoutePlaceholder from "@/components/ui/route-placeholder/RoutePlaceholder";

export const metadata: Metadata = {
  title: "Features — Hegira",
};

export default function FeaturesPage() {
  return (
    <RoutePlaceholder
      eyebrow="Feature Highlights"
      title="This page is coming soon"
      body="We're moving the full feature breakdown here from the homepage. Check back shortly."
    />
  );
}
