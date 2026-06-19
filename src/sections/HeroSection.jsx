import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IMG } from "@/sections/data";

const heroBadges = [
  { label: "Cotton Sarees", href: "/shop" },
  { label: "Linen Sarees", href: "/shop" },
  { label: "Handloom Weaves", href: "/shop" },
  { label: "Bridal Collection", href: "/shop" },
  { label: "Festive Edit", href: "/shop" },
  { label: "Daily Elegance", href: "/shop" },
];

const heroBadgeLinkClass =
  "hero-badge-enter inline-flex items-center justify-center h-auto min-h-10 rounded-full border border-gold/30 bg-maroon/90 px-3.5 py-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-gold shadow-premium-sm backdrop-blur-sm transition-all hover:border-gold/50 hover:bg-maroon hover:text-gold-light whitespace-nowrap";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] snap-start items-center overflow-hidden scroll-mt-20 py-12 sm:py-0"
    >
      {/* White saree photo background with CSS blur */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src={IMG.heroBg}
          alt=""
          className="h-full w-full scale-110 object-cover blur-sm brightness-105"
        />
      </div>
      <div className="absolute inset-0 bg-ivory/40" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ivory/60 via-ivory/25 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-10 sm:gap-12 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16">

        {/* Left — copy */}
        <div className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* Category badges */}
          <nav
            aria-label="Saree collections"
            className="flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {heroBadges.map(({ label, href }, index) => (
              <a
                key={label}
                href={href}
                className={heroBadgeLinkClass}
                style={{ animationDelay: `${320 + index * 45}ms` }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Eyebrow */}
          <p
            className="hero-fade-up mt-7 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold"
            style={{ animationDelay: "180ms" }}
          >
            <Sparkles className="size-3.5 shrink-0" aria-hidden />
            Handcrafted Luxury Sarees
          </p>

          {/* Headline */}
          <h1
            className="hero-fade-up mt-4 font-display text-4xl font-bold leading-[1.08] text-maroon-deep text-balance sm:text-5xl lg:text-[3.5rem]"
            style={{ animationDelay: "240ms" }}
          >
            Heritage{" "}
            <span className="gold-shimmer-text font-display">Woven</span>{" "}
            in Elegance.
          </h1>

          <p
            className="hero-fade-up mt-6 max-w-xl text-base font-normal leading-[1.8] text-maroon/75 sm:text-lg"
            style={{ animationDelay: "320ms" }}
          >
            Discover our handcrafted collection of cotton, linen, and handloom sarees —
            each piece a celebration of Indian tradition, artisan craftsmanship, and
            timeless feminine grace.
          </p>

          <div
            className="hero-fade-up mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            style={{ animationDelay: "400ms" }}
          >
            <a
              href="/shop"
              className={cn(
                buttonVariants({ size: "lg" }),
                "inline-flex w-full justify-center rounded-full border border-gold/40 bg-gold px-8 font-semibold text-maroon-deep shadow-gold hover:bg-gold/90 sm:w-auto"
              )}
            >
              Explore Collection
              <ArrowRight className="size-4" />
            </a>

            <a
              href="/#reach-us"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "inline-flex w-full justify-center rounded-full border border-maroon/30 bg-transparent px-8 text-maroon hover:border-maroon/50 hover:bg-maroon/8 sm:w-auto"
              )}
            >
              Contact Us
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="hero-fade-up mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-start"
            style={{ animationDelay: "520ms" }}
          >
            {["Handwoven by artisans", "Authentic textiles", "Secure delivery"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-maroon/60">
                <span className="size-1.5 rounded-full bg-gold opacity-75" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — House of Riddhi brand graphic */}
        <div className="order-first flex w-full flex-col items-center justify-center lg:order-last">
          <div
            className="hero-visual-rise relative w-full max-w-md lg:max-w-lg"
            style={{ animationDelay: "90ms" }}
          >
            <img
              src={IMG.heroBrand}
              alt="House of Riddhi — heritage woven in elegance"
              className="dino-float h-auto w-full object-contain drop-shadow-2xl"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
