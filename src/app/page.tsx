import { Hero } from "@/components/hero/hero";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { WebExperiences } from "@/components/sections/web-experiences";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WebExperiences />
    </>
  );
}