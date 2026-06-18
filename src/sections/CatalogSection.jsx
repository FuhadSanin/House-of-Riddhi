import { Img } from "@/components/ui/Img";
import { SectionHeading } from "@/sections/SectionHeading";
import { IMG } from "@/sections/data";

const collections = [
  {
    id: "artisan",
    number: "1",
    title: "Artisan-crafted sarees",
    description:
      "Discover handwoven silks and cottons inspired by timeless Indian weaving traditions.",
    image: IMG.catalog1,
    imageAlt: "Handwoven artisan saree with traditional motifs",
  },
  {
    id: "occasions",
    number: "2",
    title: "Curated for every occasion",
    description:
      "Each drape is curated for weddings, festivals, and elegant everyday wear.",
    image: IMG.catalog2,
    imageAlt: "Elegant saree curated for festive occasions",
  },
  {
    id: "limited",
    number: "3",
    title: "Limited edition designs",
    description:
      "Collaborations with master weavers ensure authenticity and fair, transparent sourcing.",
    image: IMG.catalog3,
    imageAlt: "Limited edition saree with master weaver collaboration",
  },
  {
    id: "quality",
    number: "4",
    title: "Quality guaranteed",
    description:
      "Premium fabrics are inspected to ensure lasting color, sheen, and fall.",
    image: IMG.catalog4,
    imageAlt: "Premium saree fabric with rich sheen and drape",
  },
];

export function CatalogSection() {
  return (
    <section
      id="collections"
      className="scroll-mt-20 border-b border-border/60 bg-background py-16 sm:flex sm:min-h-[100svh] sm:snap-start sm:items-center sm:py-24"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div data-reveal className="reveal-up">
          <SectionHeading
            eyebrow="Signature Saree Collections"
            title="Curated Drapes for Every Occasion"
            description="From artisan handlooms to limited-edition weaves — each saree is chosen for its craftsmanship, comfort, and timeless Indian elegance."
          />
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          {collections.map((col) => (
            <article
              key={col.id}
              data-reveal
              className="reveal-up interactive-lift flex items-center gap-5 rounded-2xl border border-gold/20 bg-background/60 p-5 shadow-premium sm:gap-6 sm:p-6"
            >
              <div className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-xl sm:size-28">
                <Img
                  src={col.image}
                  alt={col.imageAlt}
                  className="size-full object-cover saturate-[0.85]"
                />
                <div
                  className="absolute inset-0 bg-foreground/20"
                  aria-hidden
                />
                <span
                  className="absolute inset-0 flex items-center justify-center font-display text-4xl font-light leading-none text-white/80 sm:text-5xl"
                  aria-hidden
                >
                  {col.number}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
                  {col.title}
                </h3>
                <p className="mt-2 font-display text-sm leading-relaxed text-muted-foreground sm:mt-2.5 sm:text-[0.9375rem]">
                  {col.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
