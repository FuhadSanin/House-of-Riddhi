import { Eye, Loader2, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryNamesFromDocs, useCategoriesQuery, useProductsQuery } from "@/features/shop/use-shop-queries";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/sections/SectionHeading";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ShopSection({ onAddToCart }) {
  const navigate = useNavigate();
  const { data: products = [], isLoading, isError, error, refetch, isFetching } = useProductsQuery();
  const { data: categoryDocs = [] } = useCategoriesQuery();
  const categories = useMemo(() => ["All", ...categoryNamesFromDocs(categoryDocs)], [categoryDocs]);
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((item) => (item.category || "General") === activeCategory);
  }, [products, activeCategory]);

  return (
    <section
      id="shop"
      className="scroll-mt-20 border-b border-gold/12 bg-gradient-to-br from-maroon/4 via-background to-gold/8 pb-14 pt-6 sm:pb-16 sm:pt-8"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div>
          <SectionHeading
            eyebrow="Shop"
            title="Discover Our Saree Collection"
            description="Browse our full range of handcrafted cotton, linen, and handloom sarees — filter by type and find your perfect weave."
          />
        </div>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              disabled={isLoading}
              className={`min-h-10 touch-manipulation rounded-full border px-5 py-2 text-sm font-semibold transition-all disabled:opacity-50 ${
                activeCategory === category
                  ? "border-gold/50 bg-maroon text-primary-foreground shadow-premium-sm"
                  : "border-gold/20 bg-card/80 text-muted-foreground hover:border-gold/40 hover:text-maroon"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Error state */}
        {isError ? (
          <div
            className="mt-10 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-8 text-center sm:px-6"
            role="alert"
          >
            <p className="text-sm font-medium text-destructive">{error?.message || "Could not load products."}</p>
            <Button type="button" variant="outline" size="sm" className="mt-4 rounded-full border-gold/30" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : null}

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-gold/10 bg-card shadow-premium sm:rounded-3xl">
                <div className="h-52 w-full animate-pulse bg-gradient-to-br from-gold/10 to-maroon/8 sm:h-60" />
                <div className="space-y-3 p-4 sm:p-5">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="mt-4 flex gap-2">
                    <div className="h-10 flex-1 animate-pulse rounded-full bg-muted" />
                    <div className="h-10 flex-1 animate-pulse rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Product grid */}
        {!isLoading && !isError ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="interactive-lift group overflow-hidden rounded-2xl border border-gold/15 bg-card shadow-premium transition-all hover:border-gold/35 sm:rounded-3xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60"
                  />
                  {/* Overlay gradient for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Category badge */}
                  <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-card/90 px-3 py-1 text-xs font-semibold text-maroon shadow-sm backdrop-blur-sm">
                    {product.badge || product.category}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
                    {product.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-foreground sm:text-2xl">
                    {product.name}
                  </h3>
                  <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-display text-lg font-bold text-maroon">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="flex w-full gap-2 sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 min-h-10 flex-1 touch-manipulation rounded-full border-gold/25 text-maroon hover:border-gold/50 hover:bg-gold/6 sm:h-9 sm:flex-initial"
                        onClick={() => navigate(`/shop/${product.id}`)}
                      >
                        <Eye className="size-3.5" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="h-10 min-h-10 flex-1 touch-manipulation rounded-full bg-maroon text-primary-foreground hover:bg-maroon/85 sm:h-9 sm:flex-initial"
                        onClick={() => onAddToCart(product)}
                      >
                        <ShoppingCart className="size-3.5" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {!isLoading && !isError && !visibleProducts.length ? (
          <div className="mt-10 rounded-3xl border border-gold/15 bg-card/60 px-6 py-16 text-center">
            <p className="font-display text-xl text-muted-foreground">
              No sarees in this category yet.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon — new arrivals are added every week.
            </p>
          </div>
        ) : null}

        {isFetching && !isLoading ? (
          <div className="mt-4 flex justify-center">
            <Loader2 className="size-5 animate-spin text-gold" aria-hidden />
          </div>
        ) : null}
      </div>
    </section>
  );
}
