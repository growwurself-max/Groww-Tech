"use client";

import { motion } from "motion/react";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { GlowOrb } from "@/components/ui/decor";
import { Eyebrow } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

const WHATSAPP_NUMBER = "917989630840";

const webPackages = [
  {
    name: "Starter",
    price: "₹1,999",
    description: "Perfect for small businesses getting online",
    features: [
      "Single-page website",
      "Mobile responsive design",
      "Contact form integration",
      "Basic SEO setup",
      "Social media links",
      "1 month support",
    ],
    highlight: false,
  },
  {
    name: "Business",
    price: "₹4,999",
    description: "Ideal for growing businesses",
    features: [
      "Multi-page website (up to 5 pages)",
      "Mobile responsive design",
      "Contact form + Google Maps",
      "Advanced SEO optimization",
      "Social media integration",
      "Blog/news section",
      "3 months support",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹9,999",
    description: "For enterprises and advanced needs",
    features: [
      "Custom multi-page website",
      "Mobile responsive design",
      "Advanced contact system",
      "Full SEO + Analytics setup",
      "CMS integration",
      "E-commerce ready",
      "Performance optimization",
      "6 months support",
    ],
    highlight: false,
  },
];

const maintenancePackages = [
  {
    name: "Basic Care",
    price: "₹299/month",
    features: [
      "Regular updates",
      "Security monitoring",
      "Monthly backups",
      "Email support",
    ],
  },
  {
    name: "Business Care",
    price: "₹599/month",
    features: [
      "All Basic Care features",
      "Content updates (2/month)",
      "Performance monitoring",
      "Priority email support",
    ],
  },
  {
    name: "Premium Care",
    price: "₹999/month",
    features: [
      "All Business Care features",
      "Unlimited content updates",
      "24/7 priority support",
      "Monthly performance reports",
    ],
  },
];

function PricingCard({
  name,
  price,
  description,
  features,
  highlight,
  type,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  type: "web" | "maintenance";
}) {
  const isWeb = type === "web";
  const message = encodeURIComponent(
    `Hi! I'm interested in the ${name} package (${type === "web" ? "Website Development" : "Monthly Maintenance"}). Please provide more details.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <motion.div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border bg-surface transition-all duration-500 ease-smooth",
        highlight
          ? "border-brand-300 shadow-lg shadow-brand/10 hover:shadow-xl hover:shadow-brand/15"
          : "border-line shadow-xs hover:border-line-strong hover:shadow-md"
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {highlight && (
        <div className="absolute top-0 right-0 z-10">
          <div className="flex items-center gap-1.5 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-1.5">
            <Sparkles className="size-3.5 text-white" />
            <span className="text-xs font-semibold text-white tracking-wide">
              Most Popular
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-ink">{name}</h3>
          <p className="mt-1 text-sm text-ink-muted">{description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-ink">{price}</span>
            {isWeb && (
              <span className="text-sm text-ink-subtle">Starting at</span>
            )}
          </div>
        </div>

        <ul className="mb-6 flex-1 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span className="text-sm text-ink-muted">{feature}</span>
            </li>
          ))}
        </ul>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-auto inline-flex items-center justify-center gap-2 rounded-pill px-5 py-3 text-sm font-medium transition-all duration-300",
            highlight
              ? "bg-brand-600 text-white shadow-md hover:bg-brand-700 hover:shadow-lg"
              : "border border-line bg-canvas/50 text-ink hover:border-brand-300 hover:bg-brand-50"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="size-4" />
          Enquire on WhatsApp
        </motion.a>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <Section id="pricing" tone="canvas" spacing="lg" className="overflow-hidden">
      <GlowOrb className="top-10 -right-32 size-[30rem] opacity-60" />
      <GlowOrb tone="neutral" className="-bottom-24 -left-24 size-[26rem]" />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Transparent pricing for every need"
            description="Choose the perfect package for your project. All plans include professional design and development with no hidden costs."
            align="center"
            className="text-center"
          />
        </Reveal>

        {/* Website Development */}
        <div className="mt-16">
          <Reveal>
            <h3 className="mb-8 text-center text-2xl font-semibold text-ink">
              Website Development
            </h3>
          </Reveal>

          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {webPackages.map((pkg, index) => (
              <RevealItem key={pkg.name} variant="up">
                <PricingCard {...pkg} type="web" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Monthly Maintenance */}
        <div className="mt-20">
          <Reveal>
            <h3 className="mb-8 text-center text-2xl font-semibold text-ink">
              Monthly Maintenance
            </h3>
          </Reveal>

          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {maintenancePackages.map((pkg, index) => (
              <RevealItem key={pkg.name} variant="up">
                <PricingCard {...pkg} type="maintenance" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Custom Quote */}
        <Reveal className="mt-16">
          <motion.div
            className="mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-8 text-center shadow-sm"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold text-ink mb-2">
              Need something custom?
            </h4>
            <p className="text-ink-muted mb-6">
              Have unique requirements or need additional features? Let's discuss
              your project and create a tailored solution.
            </p>
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi! I need a custom quote for my project. Let's discuss my requirements."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-pill bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-colors hover:bg-brand-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="size-4" />
              Get Custom Quote
            </motion.a>
          </motion.div>
        </Reveal>

        {/* Note */}
        <Reveal className="mt-12">
          <p className="text-center text-sm text-ink-subtle">
            * Domain, hosting, and paid third-party services are charged
            separately. Prices are starting rates and may vary based on project
            requirements.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
