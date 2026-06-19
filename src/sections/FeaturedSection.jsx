import { Link } from "react-router-dom";
import { Img } from "@/components/ui/Img";
import { SectionHeading } from "@/sections/SectionHeading";
import { COLLECTIONS } from "@/sections/data";

const marqueeCollections = [...COLLECTIONS, ...COLLECTIONS];

export function FeaturedSection() {
  return (
    <section
      id="featured"
      className="scroll-mt-20 overflow-hidden border-b border-gold/12 bg-gradient-to-b from-maroon/4 via-background to-gold/6 py-14 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="reveal-up">
          <SectionHeading
            eyebrow="Our Collections"
            title="Explore Signature Saree Collections"
            description="From artisan handlooms to limited-edition weaves — browse our curated collections, each chosen for craftsmanship, comfort, and timeless Indian elegance."
          />
        </div>
      </div>

      <div
        className="mt-10 overflow-hidden"
        aria-label="Scrolling saree collections"
      >
        <div className="marquee-collections-track flex w-max gap-5 pl-4 pr-5 sm:pl-6">
          {marqueeCollections.map((col, idx) => (
            <article
              key={`${col.id}-${idx}`}
              className="interactive-lift group flex w-[min(18rem,calc(100vw-2.5rem))] shrink-0 flex-col overflow-hidden rounded-3xl border border-gold/20 bg-card shadow-premium transition-all hover:border-gold/35 sm:w-[280px]"
            >
              <div className="relative h-44 w-full overflow-hidden sm:h-48">
                <Img
                  src={col.image}
                  alt={col.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] saturate-[0.9]"
                />
                <div className="absolute inset-0 bg-foreground/15" aria-hidden />
                <span className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-full border border-gold/30 bg-maroon/90 font-display text-lg font-light text-gold shadow-sm">
                  {col.number}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold leading-snug text-foreground">
                  {col.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {col.description}
                </p>
                <Link
                  to="/shop"
                  className="mt-4 inline-flex w-fit rounded-full border border-gold/30 px-4 py-2 text-xs font-semibold text-maroon transition-all hover:border-gold/60 hover:bg-gold/8"
                >
                  Explore
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
