import { Hero } from "@/components/hero/hero";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { WebExperiences } from "@/components/sections/web-experiences";
import { WatchOurWork } from "@/components/sections/watch-our-work";
import { HowWeBuild } from "@/components/sections/how-we-build";
import { TechnologyCapabilities } from "@/components/sections/technology-capabilities";
import { Growing } from "@/components/sections/growing";
import { FinalCTA } from "@/components/sections/final-cta";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: siteConfig.tagline,
  description: siteConfig.description,
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WebExperiences />
      <WatchOurWork />
      <HowWeBuild />
      <TechnologyCapabilities />
      <Growing />
      <FinalCTA />
    </>
  );
}





