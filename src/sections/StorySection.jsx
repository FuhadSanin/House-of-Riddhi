import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IMG } from "@/sections/data";

export function StorySection() {
  return (
    <section
      id="story"
      className="scroll-mt-20 border-b border-gold/15 bg-gradient-to-br from-gold/8 via-background to-maroon/5 py-14 sm:flex sm:min-h-[100svh] sm:snap-start sm:items-center sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">

        {/* Left — story image / brand visual */}
        <div data-reveal className="reveal-up order-last lg:order-first">
          <div className="relative">
            {/* Main brand image */}
            <div className="overflow-hidden rounded-3xl border border-gold/20 shadow-gold">
              <img
                src={IMG.logo_packaging}
                alt="House of Riddhi luxury packaging"
                className="dino-float h-auto w-full object-cover"
              />
            </div>

            {/* Overlay quote card */}
            <div className="absolute -bottom-5 -right-4 max-w-[14rem] rounded-2xl border border-gold/25 bg-maroon/95 p-4 shadow-gold backdrop-blur-sm sm:-bottom-6 sm:-right-6 sm:max-w-[16rem]">
              <p className="font-display text-base font-medium italic leading-snug text-primary-foreground sm:text-lg">
                &ldquo;Tradition, woven beautifully.&rdquo;
              </p>
              <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
                — House of Riddhi
              </p>
            </div>

            {/* Top decorative badge */}
            <div className="absolute -left-4 -top-4 rounded-2xl border border-gold/30 bg-card/95 px-4 py-3 shadow-premium backdrop-blur-sm sm:-left-6 sm:-top-6">
              <p className="font-display text-xl font-bold text-gold sm:text-2xl">10+</p>
              <p className="text-[0.6rem] font-semibold uppercase tracking-wide text-muted-foreground">
                Years of craft
              </p>
            </div>
          </div>
        </div>

        {/* Right — copy */}
        <div data-reveal className="reveal-up">
          <p className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-gold">
            <span className="inline-block h-px w-8 bg-gold/60" aria-hidden />
            Our Story
          </p>

          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            Born from a love of Indian weaves and the women who wear them.
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              House of Riddhi began as a heartfelt quest — to bring authentic, handcrafted Indian
              sarees to women who value heritage over haste. Our founder, deeply rooted in the
              textile traditions of South India, saw master weavers creating extraordinary works
              that deserved a wider audience.
            </p>
            <p>
              We focus on cotton, linen, and handloom sarees — fabrics that breathe, age gracefully,
              and carry the fingerprints of skilled artisans. Each piece in our collection is
              hand-selected for its weave quality, authenticity, and that intangible quality we call
              <em className="font-display text-foreground not-italic"> soul</em>.
            </p>
            <p>
              Today, House of Riddhi is more than a boutique. It is a bridge between the loom and
              the woman — between a weaver&rsquo;s quiet pride and the quiet confidence of a saree
              worn beautifully.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/shop"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-maroon px-8 text-primary-foreground shadow-premium hover:bg-maroon/85"
              )}
            >
              Shop Our Collection
            </a>
            <a
              href="/#reach-us"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-maroon/30 text-maroon hover:border-gold/50 hover:bg-gold/5 hover:text-maroon"
              )}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
