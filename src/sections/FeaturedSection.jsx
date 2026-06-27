import { Link } from "react-router-dom";
import { Img } from "@/components/ui/Img";
import { Button } from "@/components/ui/button";
import { useProductsQuery } from "@/features/shop/use-shop-queries";
import { SectionHeading } from "@/sections/SectionHeading";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function CollectionCard({ product, index }) {
  return (
    <article className="interactive-lift group flex w-[min(18rem,calc(100vw-2.5rem))] shrink-0 flex-col overflow-hidden rounded-3xl border border-gold/20 bg-card shadow-premium transition-all hover:border-gold/35 sm:w-[280px]">
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <Img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] saturate-[0.9]"
        />
        <div className="absolute inset-0 bg-foreground/15" aria-hidden />
        <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-maroon/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-gold shadow-sm">
          {product.badge || product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold leading-snug text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-3 font-display text-base font-bold text-maroon">
          {formatCurrency(product.price)}
        </p>
        <Link
          to={`/shop/${product.id}`}
          className="mt-4 inline-flex w-fit rounded-full border border-gold/30 px-4 py-2 text-xs font-semibold text-maroon transition-all hover:border-gold/60 hover:bg-gold/8"
        >
          Explore
        </Link>
      </div>
    </article>
  );
}

export function FeaturedSection() {
  const { data: products = [], isLoading, isError, error, refetch } = useProductsQuery();

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

      {isError ? (
        <div className="mx-auto mt-10 max-w-md px-4 text-center sm:px-6" role="alert">
          <p className="text-sm text-destructive">{error?.message || "Could not load collections."}</p>
          <Button type="button" variant="outline" size="sm" className="mt-4 rounded-full border-gold/30" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-10 flex gap-5 overflow-hidden pl-4 pr-5 sm:pl-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-[22rem] w-[min(18rem,calc(100vw-2.5rem))] shrink-0 animate-pulse rounded-3xl border border-gold/10 bg-card sm:w-[280px]"
            />
          ))}
        </div>
      ) : null}

      {!isLoading && !isError && !products.length ? (
        <p className="mx-auto mt-10 max-w-md px-4 text-center text-sm text-muted-foreground sm:px-6">
          New sarees are on their way — check back soon or visit the shop.
        </p>
      ) : null}

      {!isLoading && !isError && products.length ? (
        <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6" aria-label="Saree collections">
          <div className="flex flex-wrap justify-center gap-5">
            {products.map((product, index) => (
              <CollectionCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
