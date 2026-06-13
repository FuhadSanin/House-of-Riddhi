import { Link } from "react-router-dom";
import { SectionHeading } from "@/sections/SectionHeading";

const collections = [
  {
    id: "cotton",
    label: "Cotton Sarees",
    eyebrow: "Breathe in comfort",
    description:
      "Soft, handwoven cotton sarees perfect for daily elegance. Lightweight, breathable, and designed with traditional prints that carry the spirit of Indian artisanship.",
    features: ["Kalamkari prints", "Block-printed motifs", "Soft-wash care", "All-day comfort"],
    accentColor: "bg-gold",
    borderColor: "border-gold/30",
    hoverBorder: "hover:border-gold/60",
    gradient: "from-gold/10 via-card to-card",
  },
  {
    id: "linen",
    label: "Linen Sarees",
    eyebrow: "Natural luxury",
    description:
      "Crisp, elegant linen sarees woven from pure flax — a fabric cherished for its refined texture, natural drape, and timeless sophistication.",
    features: ["Natural flax fibre", "Zari border accents", "Wrinkle-resistant", "Summer-perfect"],
    accentColor: "bg-maroon",
    borderColor: "border-maroon/20",
    hoverBorder: "hover:border-maroon/40",
    gradient: "from-primary/8 via-card to-card",
  },
  {
    id: "handloom",
    label: "Handloom Weaves",
    eyebrow: "Artisan heritage",
    description:
      "Each handloom saree is a masterpiece — woven thread by thread on traditional looms by skilled weavers preserving centuries of Indian textile heritage.",
    features: ["Master weavers", "Traditional motifs", "One-of-a-kind weaves", "Certified handloom"],
    accentColor: "bg-maroon-deep",
    borderColor: "border-maroon/15",
    hoverBorder: "hover:border-gold/40",
    gradient: "from-maroon-deep/6 via-card to-card",
  },
];

export function CatalogSection() {
  return (
    <section
      id="collections"
      className="scroll-mt-20 border-b border-gold/15 bg-gradient-to-b from-ivory via-background to-ivory py-14 sm:flex sm:min-h-[100svh] sm:snap-start sm:items-center sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="reveal-up">
          <SectionHeading
            eyebrow="Our Collections"
            title="Threads of Tradition, Woven with Care"
            description="Three celebrated weave families — each rooted in Indian heritage, crafted by master artisans, and designed to drape you in timeless grace."
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {collections.map((col) => (
            <article
              key={col.id}
              data-reveal
              className={`reveal-up interactive-lift group flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-b ${col.gradient} ${col.borderColor} ${col.hoverBorder} p-6 shadow-premium sm:rounded-3xl`}
            >
              {/* Decorative top ornament */}
              <div className="mb-5 flex items-center gap-3">
                <div className={`h-[2px] flex-1 ${col.accentColor} opacity-40 rounded-full`} />
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {col.eyebrow}
                </span>
                <div className={`h-[2px] flex-1 ${col.accentColor} opacity-40 rounded-full`} />
              </div>

              {/* Saree swatch placeholder — gradient block imitating fabric */}
              <div
                className={`mb-5 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br transition-transform duration-500 group-hover:scale-[1.01] sm:h-52 ${
                  col.id === "cotton"
                    ? "from-gold/20 via-ivory-dark/60 to-gold/10"
                    : col.id === "linen"
                    ? "from-maroon/15 via-primary/8 to-gold/12"
                    : "from-maroon-deep/20 via-primary/12 to-gold/15"
                }`}
              >
                {/* Ethnic motif in fabric swatch */}
                <div
                  className="h-full w-full opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%23C9943A' stroke-width='0.5'%3E%3Crect x='5' y='5' width='30' height='30' rx='2'/%3E%3Cellipse cx='20' cy='20' rx='8' ry='12' transform='rotate(15 20 20)'/%3E%3Ccircle cx='20' cy='10' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>

              {/* Icon badge */}
              <div className={`flex size-11 items-center justify-center rounded-xl ${col.accentColor} shadow-sm mb-4`}>
                <svg viewBox="0 0 24 24" fill="none" className="size-5 text-primary-foreground" aria-hidden>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="currentColor" opacity="0.9"/>
                </svg>
              </div>

              <h3 className="font-display text-2xl font-semibold text-foreground">{col.label}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {col.description}
              </p>

              <ul className="mt-5 space-y-2">
                {col.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span className={`size-1.5 shrink-0 rounded-full ${col.accentColor} opacity-75`} />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-maroon transition-colors hover:text-gold"
              >
                Shop {col.label}
                <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
