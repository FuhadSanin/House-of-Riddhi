import { Link } from "react-router-dom";
import { SectionHeading } from "@/sections/SectionHeading";

const featuredItems = [
  {
    name: "Chettinad Cotton Saree",
    desc: "Rich geometric checks in deep maroon and ivory — a timeless Chettinad classic, block-printed by hand on 120-count pure cotton.",
    from: "From ₹1,899",
    badge: "Bestseller",
    badgeColor: "bg-gold text-maroon-deep",
    swatchFrom: "from-gold/20",
    swatchTo: "to-maroon/15",
  },
  {
    name: "Dharwad Linen Drape",
    desc: "Crisp, airy linen in muted ivory with hand-embroidered zari border — effortless sophistication for festive mornings.",
    from: "From ₹2,499",
    badge: "New Arrival",
    badgeColor: "bg-maroon text-primary-foreground",
    swatchFrom: "from-maroon/18",
    swatchTo: "to-gold/12",
  },
  {
    name: "Kanjivaram Silk Cotton",
    desc: "Inspired by Kanjivaram grandeur — silk-cotton blend with temple border motifs and rich contrast pallu, hand-woven on a pit loom.",
    from: "From ₹3,799",
    badge: "Limited Edition",
    badgeColor: "bg-maroon-deep text-primary-foreground",
    swatchFrom: "from-maroon-deep/22",
    swatchTo: "to-gold/18",
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
              {/* Fabric swatch visual */}
              <div className={`relative h-52 w-full overflow-hidden bg-gradient-to-br ${item.swatchFrom} ${item.swatchTo} sm:h-60`}>
                {/* Woven texture pattern */}
                <div
                  className="absolute inset-0 opacity-25 transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect x='0' y='0' width='32' height='32' fill='none'/%3E%3Cpath d='M0 0h8v8H0zM8 8h8v8H8zM16 16h8v8H16zM24 24h8v8H24zM24 0h8v8H24zM16 8h8v8H16zM8 16h8v8H8zM0 24h8v8H0z' fill='%23C9943A' opacity='0.25'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Paisley overlay */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cellipse cx='30' cy='30' rx='14' ry='22' fill='none' stroke='%23C9943A' stroke-width='0.8' transform='rotate(20 30 30)'/%3E%3Ccircle cx='30' cy='12' r='3' fill='%23C9943A' opacity='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "60px 60px",
                  }}
                />
                {/* Badge */}
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
