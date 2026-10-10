import { products } from "@/config/products";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb } from "@/components/ui/decor";
import { Eyebrow } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/products/product-card";

export function FeaturedProducts() {
  const [lead, ...rest] = products;
  const secondary = rest.slice(0, 3);

  return (
    <Section id="products" tone="canvas" spacing="md" className="overflow-hidden">
      <GlowOrb className="top-10 -right-32 size-[30rem] opacity-60" />
      <GlowOrb tone="neutral" className="-bottom-24 -left-24 size-[26rem]" />

      <Container>
        <Reveal>
          <div className="flex flex-col gap-5 md:max-w-2xl">
            <Eyebrow>Featured products</Eyebrow>
            <h2 className="text-3xl text-balance text-ink md:text-4xl lg:text-5xl">
              Products we&rsquo;ve built.
            </h2>
            <p className="text-base text-pretty text-ink-muted md:text-lg">
              GROWW TECH builds and experiments with digital products — platforms,
              web applications and experiences we design, engineer and ship
              ourselves.
            </p>
          </div>
        </Reveal>

        {/* Lead card gets the full width for hierarchy */}
        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          {lead ? (
            <div className="lg:col-span-2">
              <ProductCard product={lead} index={0} />
            </div>
          ) : null}

          {secondary.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index + 1} />
          ))}
        </div>
      </Container>
    </Section>
  );
}