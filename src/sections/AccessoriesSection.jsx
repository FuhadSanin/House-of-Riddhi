import { Award, Heart, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { SectionHeading } from "@/sections/SectionHeading";

const pillars = [
  {
    icon: Award,
    title: "Certified Handloom",
    description:
      "Every saree bears the authentic handloom mark — a government-certified guarantee of genuine artisan craftsmanship.",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    icon: Leaf,
    title: "Natural & Sustainable",
    description:
      "We champion natural fibres — cotton, linen, and pure silk — woven without harmful dyes, respecting both skin and earth.",
    color: "text-maroon",
    bg: "bg-maroon/8",
    border: "border-maroon/15",
  },
  {
    icon: Heart,
    title: "Artisan Stories",
    description:
      "Each weave carries the fingerprints of skilled artisans from Tamil Nadu, West Bengal, and Andhra Pradesh — their heritage, your heirloom.",
    color: "text-gold",
    bg: "bg-gold/8",
    border: "border-gold/15",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description:
      "Triple-checked before dispatch — thread count, colour fastness, and border integrity — because your trust is our highest standard.",
    color: "text-maroon",
    bg: "bg-maroon/8",
    border: "border-maroon/15",
  },
  {
    icon: Truck,
    title: "Safe & Secure Delivery",
    description:
      "Sarees are tissue-wrapped, box-protected, and shipped with care to reach you in pristine condition — anywhere in India.",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    icon: Sparkles,
    title: "Exclusive Designs",
    description:
      "Seasonal curations and limited-edition weaves that you won't find in mass retail — true boutique exclusivity for the discerning woman.",
    color: "text-maroon",
    bg: "bg-maroon/8",
    border: "border-maroon/15",
  },
];

export function AccessoriesSection() {
  return (
    <section
      id="why-us"
      className="scroll-mt-20 border-b border-gold/15 bg-gradient-to-b from-maroon-deep/4 via-background to-gold/5 py-14 sm:flex sm:min-h-[100svh] sm:snap-start sm:items-center sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="reveal-up">
          <SectionHeading
            eyebrow="Why House of Riddhi"
            title="Tradition, Trust, and Timeless Beauty"
            description="We are more than a saree store — we are custodians of India's weaving legacy, bringing you authenticated handloom excellence with the warmth of a family boutique."
          />
        </div>

        {/* Decorative gold divider */}
        <div className="my-10 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-gold/40" />
          <svg viewBox="0 0 32 32" className="size-5 shrink-0 text-gold opacity-70" fill="currentColor" aria-hidden>
            <path d="M16 2a1 1 0 011 1v6a1 1 0 01-2 0V3a1 1 0 011-1zm0 20a1 1 0 011 1v6a1 1 0 01-2 0v-6a1 1 0 011-1zM2 16a1 1 0 011-1h6a1 1 0 010 2H3a1 1 0 01-1-1zm20 0a1 1 0 011-1h6a1 1 0 010 2h-6a1 1 0 01-1-1zM6.343 6.343a1 1 0 011.414 0l4.243 4.243a1 1 0 01-1.414 1.414L6.343 7.757a1 1 0 010-1.414zm13.657 13.657a1 1 0 011.414 0l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243a1 1 0 010-1.414zm.657-13.657a1 1 0 010 1.414l-4.243 4.243a1 1 0 01-1.414-1.414l4.243-4.243a1 1 0 011.414 0zM7.757 20a1 1 0 010 1.414l-4.243 4.243a1 1 0 01-1.414-1.414L6.343 20a1 1 0 011.414 0z"/>
          </svg>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                data-reveal
                className={`reveal-up interactive-lift group rounded-2xl border ${pillar.border} ${pillar.bg} p-5 shadow-premium-sm transition-all sm:rounded-3xl sm:p-6`}
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-xl border ${pillar.border} bg-card shadow-sm sm:size-12`}
                >
                  <Icon className={`size-5 sm:size-6 ${pillar.color}`} aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
