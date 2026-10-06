"use client";

import { siteConfig } from "@/config/site";
import { products } from "@/config/products";
import { Brand } from "@/components/brand/brand";
import { Container } from "@/components/ui/container";
import { SoftDivider } from "@/components/ui/decor";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#products" },
    { label: "Work", href: "#products" },
    { label: "Experiments", href: "#experiments" },
    { label: "How We Build", href: "#how-we-build" },
    { label: "Technology", href: "#tech" },
  ];

  const projectLinks = products.filter(p => p.liveUrl);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Brand />
            <p className="text-sm text-pretty text-ink-muted">
              Building digital products that grow.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-2xs tracking-widest text-ink-faint uppercase">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-ink-muted transition-colors duration-300 ease-smooth hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          {projectLinks.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-2xs tracking-widest text-ink-faint uppercase">
                Projects
              </h3>
              <ul className="flex flex-col gap-2">
                {projectLinks.map((product) => (
                  <li key={product.id}>
                    <a
                      href={product.liveUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-muted transition-colors duration-300 ease-smooth hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded"
                    >
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Connect - Only if genuine links exist */}
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-2xs tracking-widest text-ink-faint uppercase">
              Connect
            </h3>
            <p className="text-sm text-ink-muted">
              <a
                href={siteConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 ease-smooth hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded"
              >
                {siteConfig.url}
              </a>
            </p>
          </div>
        </div>

        <SoftDivider className="my-8" />

        <div className="flex flex-col gap-3 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-wide">Built by GROWW TECH</p>
        </div>
      </Container>
    </footer>
  );
}
