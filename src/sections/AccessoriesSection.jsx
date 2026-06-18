import { Img } from "@/components/ui/Img";
import { SectionHeading } from "@/sections/SectionHeading";
import { IMG } from "@/sections/data";

const showcaseImages = [
  {
    src: IMG.storyRack,
    alt: "Artisan sarees displayed on a gold rack",
  },
  {
    src: IMG.storyWeave,
    alt: "Artisan hands weaving a golden silk saree on a traditional handloom",
  },
  {
    src: IMG.storyBorder,
    alt: "Royal blue silk saree with intricate gold zari border",
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
            title="Weaving Stories In Every Saree"
            description="House of Riddhi celebrates heritage weaves, supporting artisans while offering contemporary, comfortable sarees."
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {showcaseImages.map((item) => (
            <figure
              key={item.alt}
              data-reveal
              className="reveal-up interactive-lift overflow-hidden rounded-2xl border border-gold/20 shadow-premium sm:rounded-3xl"
            >
              <Img
                src={item.src}
                alt={item.alt}
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
