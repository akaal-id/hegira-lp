import Hero from "@/components/sections/hero/Hero";
import AboutHegira from "@/components/sections/about-hegira/AboutHegira";
import FeatureHighlights from "@/components/sections/feature-highlights/FeatureHighlights";
import BusinessMatching from "@/components/sections/business-matching/BusinessMatching";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutHegira />
      <FeatureHighlights />
      <BusinessMatching />
    </>
  );
}
