import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

/**
 * Optimised image component.
 *
 * Features:
 *  - Blur shimmer while the image is loading
 *  - Smooth fade-in once loaded
 *  - Graceful fallback icon + optional label when src is missing or broken
 *  - Lazy loading via IntersectionObserver (no layout shift)
 *
 * Usage:
 *   <Img src={IMG.hero} alt="Hero" className="h-full w-full object-cover" />
 *
 * Props (in addition to all standard <img> attributes):
 *   fallbackLabel  — text shown beneath the broken-image icon
 *   wrapperClass   — classes on the outer wrapper div
 *   eager          — set true to skip lazy-loading (above-the-fold images)
 */
export function Img({
  src,
  alt = "",
  className,
  wrapperClass,
  fallbackLabel,
  eager = false,
  ...rest
}) {
  const [status, setStatus] = useState("idle"); // idle | loading | loaded | error
  const imgRef = useRef(null);

  // Trigger loading once the element enters the viewport (lazy by default).
  useEffect(() => {
    if (!src) { setStatus("error"); return; }
    if (eager) { setStatus("loading"); return; }

    const el = imgRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus("loading");
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, eager]);

  const isLoaded  = status === "loaded";
  const isError   = status === "error" || !src;
  const isLoading = status === "loading" || status === "idle";

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", wrapperClass)}>
      {/* Shimmer skeleton shown while loading */}
      {isLoading && !isError && (
        <div className="absolute inset-0 animate-pulse bg-muted/60" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.4s_infinite]" />
        </div>
      )}

      {/* Actual image — rendered only when src is ready to load */}
      {status !== "idle" && !isError && (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "transition-[opacity,filter] duration-500",
            isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm",
            className
          )}
          {...rest}
        />
      )}

      {/* Fallback shown when src is missing or broken */}
      {isError && (
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-2 bg-muted/40 text-muted-foreground",
            className
          )}
          aria-label={alt || "Image unavailable"}
        >
          <ImageOff className="size-8 opacity-40" aria-hidden />
          {fallbackLabel && (
            <span className="text-xs font-medium opacity-50">{fallbackLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
