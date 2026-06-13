import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Img } from "@/components/ui/Img";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProductDetailsPage({ product, products, onBack, onAddToCart }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const gallery = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.gallery) && product.gallery.length) return product.gallery;
    return [product.image].filter(Boolean);
  }, [product]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState(null);

  useEffect(() => {
    setQuantity(1);
    setActiveImageIndex(0);
  }, [product?.id]);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setActiveImageIndex(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((item) => item.id !== product.id)
      .slice(0, 4);
  }, [product, products]);
  const marqueeProducts = useMemo(
    () => [...relatedProducts, ...relatedProducts],
    [relatedProducts]
  );

  if (!product) {
    return (
      <section className="flex min-h-[70svh] items-center justify-center px-4 py-20">
        <div className="w-full max-w-xl rounded-3xl border border-border/60 bg-card p-8 text-center shadow-premium">
          <h2 className="font-display text-3xl font-semibold">Product not found</h2>
          <p className="mt-3 text-muted-foreground">This item may have moved or is not available right now.</p>
          <Button className="mt-6 rounded-full" onClick={onBack}>
            <ArrowLeft />
            Back to shop
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-primary/12 bg-gradient-to-br from-luxury-navy/5 via-background to-luxury-gold/10 py-10 dark:border-accent/18 dark:from-luxury-navy/32 dark:via-background dark:to-accent/12 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Button variant="ghost" className="rounded-full" onClick={onBack}>
          <ArrowLeft />
          Back to shop
        </Button>

        <article className="mt-5 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-premium sm:rounded-3xl md:flex md:min-h-[calc(100svh-11rem)] md:items-center">
          <div className="grid w-full gap-5 lg:grid-cols-2 lg:gap-8">
            <div className="px-4 pt-4 sm:px-8 sm:pt-8 lg:pb-8">
              <Carousel
                setApi={setCarouselApi}
                className="mx-auto w-full max-w-md rounded-3xl border border-border/50 bg-muted/35 p-3 shadow-premium-sm"
              >
                <CarouselContent>
                  {gallery.map((image, idx) => (
                    <CarouselItem key={`${product.id}-${idx}`}>
                      <Img
                        src={image}
                        alt={`${product.name} view ${idx + 1}`}
                        eager
                        wrapperClass="h-64 w-full rounded-2xl sm:h-80 md:h-96"
                        className="h-full w-full object-cover"
                        fallbackLabel={product.name}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              <div className="mx-auto mt-4 flex max-w-md gap-3 overflow-x-auto pb-1">
                {gallery.map((image, idx) => (
                  <button
                    key={`${product.id}-thumb-${idx}`}
                    type="button"
                    onClick={() => carouselApi?.scrollTo(idx)}
                    onMouseEnter={() => carouselApi?.scrollTo(idx)}
                    onFocus={() => carouselApi?.scrollTo(idx)}
                    className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      activeImageIndex === idx
                        ? "border-primary shadow-md"
                        : "border-border/80 hover:border-primary/50"
                    }`}
                  >
                    <Img
                      src={image}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      wrapperClass="h-16 w-16 sm:h-20 sm:w-20"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{product.category}</p>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{product.name}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{product.description}</p>
              <p className="mt-8 text-3xl font-bold">{formatCurrency(product.price)}</p>

              <div className="mt-6">
                <p className="text-sm font-semibold">Quantity:</p>
                <div className="mt-2 inline-flex items-center rounded-md border border-input bg-background">
                  <button
                    type="button"
                    className="p-2 text-muted-foreground transition hover:text-foreground"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-10 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    className="p-2 text-muted-foreground transition hover:text-foreground"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  className="h-12 min-h-12 w-full touch-manipulation rounded-full px-8 sm:h-11 sm:w-auto"
                  onClick={() => {
                    onAddToCart(product, quantity);
                  }}
                >
                  <ShoppingCart />
                  Add to cart
                </Button>
                <Button
                  variant="secondary"
                  className="h-12 min-h-12 w-full touch-manipulation rounded-full px-8 sm:h-11 sm:w-auto"
                  onClick={() => {
                    onAddToCart(product, quantity);
                    navigate("/shop");
                  }}
                >
                  Buy now
                </Button>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-14">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            You may also like
          </h2>
          <div className="mt-8 overflow-hidden">
            <div className="marquee-left-track flex w-max gap-5 pr-5">
              {marqueeProducts.map((item, idx) => (
                <article
                  key={`${item.id}-${idx}`}
                  className="w-[min(17.5rem,calc(100vw-2.5rem))] shrink-0 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-lg sm:w-[260px]"
                >
                  <Img src={item.image} alt={item.name} wrapperClass="h-40 w-full" className="h-full w-full object-cover" fallbackLabel={item.name} />
                  <div className="p-4">
                    <h3 className="line-clamp-1 font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm font-bold text-primary">{formatCurrency(item.price)}</p>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-full" onClick={() => navigate(`/shop/${item.id}`)}>
                        View
                      </Button>
                      <Button size="sm" className="rounded-full" onClick={() => onAddToCart(item, 1)}>
                        Add
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
