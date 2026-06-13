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

const heroBadgeLinkClass = cn(
  buttonVariants({ variant: "secondary", size: "sm" }),
  "hero-badge-enter h-auto min-h-10 rounded-full border border-gold/25 bg-card/85 px-3.5 py-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-maroon shadow-premium-sm backdrop-blur-sm transition-all hover:border-gold/50 hover:bg-gold/8 hover:text-maroon whitespace-nowrap"
);

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] snap-start items-center overflow-hidden scroll-mt-20 py-12 sm:py-0"
    >
      {/* Rich maroon gradient background with silk texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-deep via-maroon to-[hsl(338_50%_32%)]" />

      {/* Silk / textile texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(
            105deg,
            transparent,
            transparent 3px,
            rgba(201,148,58,0.08) 3px,
            rgba(201,148,58,0.08) 4px
          )`,
        }}
      />

      {/* Paisley SVG pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23C9943A' stroke-width='0.6'%3E%3Cellipse cx='40' cy='40' rx='18' ry='28' transform='rotate(25 40 40)'/%3E%3Cellipse cx='40' cy='40' rx='10' ry='17' transform='rotate(25 40 40)'/%3E%3Ccircle cx='40' cy='18' r='3'/%3E%3Ccircle cx='50' cy='60' r='2'/%3E%3Ccircle cx='27' cy='55' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial light bloom — top left */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_-10%_-10%,hsl(37_57%_51%_/_0.18),transparent_60%)]" />
      {/* Radial light — bottom right */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_105%_105%,hsl(338_40%_50%_/_0.25),transparent_55%)]" />

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
            className="hero-fade-up mt-4 font-display text-4xl font-bold leading-[1.08] text-primary-foreground text-balance sm:text-5xl lg:text-[3.5rem]"
            style={{ animationDelay: "240ms" }}
          >
            Heritage{" "}
            <span className="gold-shimmer-text font-display">Woven</span>{" "}
            in Elegance.
          </h1>

          <p
            className="hero-fade-up mt-6 max-w-xl text-base font-normal leading-[1.8] text-primary-foreground/70 sm:text-lg"
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
                buttonVariants({ variant: "secondary", size: "lg" }),
                "inline-flex w-full justify-center rounded-full border border-primary-foreground/20 bg-white/8 px-8 text-primary-foreground backdrop-blur-sm hover:bg-white/15 sm:w-auto"
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
              <span key={t} className="flex items-center gap-1.5 text-xs text-primary-foreground/55">
                <span className="size-1.5 rounded-full bg-gold opacity-75" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — brand logo hero visual */}
        <div className="order-first flex w-full flex-col items-center justify-center lg:order-last">
          <div
            className="hero-visual-rise relative w-full max-w-[18rem] sm:max-w-sm md:max-w-md"
            style={{ animationDelay: "90ms" }}
          >
            {/* Gold glow behind logo */}
            <div className="hero-glow-pulse absolute inset-0 rounded-[3rem] bg-gradient-to-br from-gold/18 via-primary-foreground/4 to-gold/12 blur-3xl" />

            {/* Logo frame */}
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-white/4 p-2 shadow-gold backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={IMG.logo_warm}
                  alt="House of Riddhi — Heritage woven in elegance"
                  className="dino-float h-auto w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                {/* Overlay gold frame */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/15" />
              </div>
            </div>

            {/* Floating stat cards */}
            <div
              className="absolute -bottom-4 -left-4 rounded-2xl border border-gold/25 bg-maroon-deep/90 px-4 py-3 shadow-gold backdrop-blur-md sm:-bottom-6 sm:-left-6"
            >
              <p className="font-display text-2xl font-bold text-gold sm:text-3xl">500+</p>
              <p className="text-[0.65rem] font-medium uppercase tracking-wide text-primary-foreground/60">
                Designs
              </p>
            </div>

            <div
              className="absolute -right-4 -top-4 rounded-2xl border border-gold/25 bg-maroon-deep/90 px-4 py-3 shadow-gold backdrop-blur-md sm:-right-6 sm:-top-6"
            >
              <p className="font-display text-2xl font-bold text-gold sm:text-3xl">1000+</p>
              <p className="text-[0.65rem] font-medium uppercase tracking-wide text-primary-foreground/60">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
