import Hero from "@/app/home/hero/Hero";
import AboutHegira from "@/app/home/about-hegira/AboutHegira";
import FeatureHighlights from "@/app/home/feature-highlights/FeatureHighlights";
import BusinessMatching from "@/app/home/business-matching/BusinessMatching";

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
