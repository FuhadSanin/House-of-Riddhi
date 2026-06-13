import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { REVIEWS } from "@/sections/data";

export function ReviewCarousel() {
  const [api, setApi] = useState();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActive(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const id = window.setInterval(() => api.scrollNext(), 5200);
    return () => window.clearInterval(id);
  }, [api]);

  return (
    <div className="mx-auto mt-10 max-w-4xl px-1 sm:px-4">
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {REVIEWS.map((item) => (
            <CarouselItem key={item.author}>
              <Card className="border border-gold/20 bg-card shadow-premium hover:border-gold/35 transition-colors">
                <CardContent className="px-6 py-10 sm:px-12 sm:py-12">
                  {/* Quote decoration */}
                  <div className="mb-4 text-gold opacity-40">
                    <svg viewBox="0 0 40 32" fill="currentColor" className="size-8" aria-hidden>
                      <path d="M0 32V19.2C0 8.533 6.4 2.133 19.2 0l2.4 3.2C14.4 4.8 10.133 8.267 8.8 13.6H16V32H0zm24 0V19.2C24 8.533 30.4 2.133 43.2 0l2.4 3.2C38.4 4.8 34.133 8.267 32.8 13.6H40V32H24z"/>
                    </svg>
                  </div>
                  <p className="font-display text-lg italic leading-relaxed text-foreground sm:text-xl">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                    <div>
                      <footer className="text-sm font-bold text-maroon">{item.author}</footer>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2 border border-gold/25 bg-card text-maroon hover:bg-gold/6 sm:-left-4" />
        <CarouselNext className="-right-2 border border-gold/25 bg-card text-maroon hover:bg-gold/6 sm:-right-4" />
      </Carousel>

      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Review slides">
        {REVIEWS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={idx === active}
            aria-label={`Go to review ${idx + 1}`}
            className={cn(
              "size-2.5 rounded-full transition-all",
              idx === active ? "bg-gold scale-125" : "bg-muted-foreground/30 hover:bg-gold/50"
            )}
            onClick={() => api?.scrollTo(idx)}
          />
        ))}
      </div>
    </div>
  );
}
