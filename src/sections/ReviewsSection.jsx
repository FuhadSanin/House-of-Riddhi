import { Star } from "lucide-react";
import { SectionHeading } from "@/sections/SectionHeading";
import { ReviewCarousel } from "@/sections/ReviewCarousel";

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="scroll-my-16 scroll-mt-20 border-b border-gold/15 bg-gradient-to-tr from-gold/6 via-background to-maroon/4 py-14 sm:flex sm:min-h-[100svh] sm:snap-start sm:items-center sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="reveal-up">
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by Women Across India"
            description="From bridal trousseaux to daily drapes — our customers share their House of Riddhi experience. Authenticity you can feel; quality you can trust."
          />
        </div>

        {/* Star rating display */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-5 fill-gold text-gold" aria-hidden />
          ))}
          <span className="ml-2 text-sm font-semibold text-muted-foreground">
            4.9 / 5 from 200+ customers
          </span>
        </div>

        <div data-reveal className="reveal-up">
          <ReviewCarousel />
        </div>
      </div>
    </section>
  );
}
