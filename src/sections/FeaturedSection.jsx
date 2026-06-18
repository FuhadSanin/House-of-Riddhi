import { Link } from "react-router-dom";
import { Img } from "@/components/ui/Img";
import { SectionHeading } from "@/sections/SectionHeading";
import { IMG } from "@/sections/data";

const featuredItems = [
  {
    name: "Chettinad Cotton Saree",
    desc: "Rich geometric checks in deep maroon and ivory — a timeless Chettinad classic, block-printed by hand on 120-count pure cotton.",
    from: "From ₹1,899",
    badge: "Bestseller",
    badgeColor: "bg-gold text-maroon-deep",
    image: IMG.featuredSaree,
    imageAlt: "Chettinad cotton saree with traditional checks",
  },
  {
    name: "Dharwad Linen Drape",
    desc: "Crisp, airy linen in muted ivory with hand-embroidered zari border — effortless sophistication for festive mornings.",
    from: "From ₹2,499",
    badge: "New Arrival",
    badgeColor: "bg-maroon text-primary-foreground",
    image: IMG.catalog1,
    imageAlt: "Dharwad linen saree with zari border",
  },
  {
    name: "Kanjivaram Silk Cotton",
    desc: "Inspired by Kanjivaram grandeur — silk-cotton blend with temple border motifs and rich contrast pallu, hand-woven on a pit loom.",
    from: "From ₹3,799",
    badge: "Limited Edition",
    badgeColor: "bg-maroon-deep text-primary-foreground",
    image: IMG.catalog3,
    imageAlt: "Kanjivaram silk cotton saree with temple border",
  },
];

export function FeaturedSection() {
  return (
    <section
      id="featured"
      className="scroll-mt-20 border-b border-gold/12 bg-gradient-to-b from-maroon/4 via-background to-gold/6 py-14 sm:flex sm:min-h-[100svh] sm:snap-start sm:items-center sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="reveal-up">
          <SectionHeading
            eyebrow="Curated Picks"
            title="The Signature Edit — Bestsellers & New Arrivals"
            description="A handpicked selection of our most-loved sarees and freshly arrived weaves — each one chosen for exceptional quality, beauty, and cultural depth."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item) => (
            <article
              key={item.name}
              data-reveal
              className="reveal-up interactive-lift group flex flex-col overflow-hidden rounded-3xl border border-gold/15 bg-card shadow-premium transition-all hover:border-gold/35"
            >
              <div className="relative h-52 w-full overflow-hidden sm:h-60">
                <Img
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide shadow-sm ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="font-display text-lg font-bold text-maroon">{item.from}</p>
                  <Link
                    to="/shop"
                    className="rounded-full border border-gold/30 px-4 py-2 text-xs font-semibold text-maroon transition-all hover:border-gold/60 hover:bg-gold/8"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card px-8 py-3 text-sm font-semibold text-maroon shadow-premium-sm transition-all hover:border-gold/60 hover:bg-gold/6"
          >
            View All Collections
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
