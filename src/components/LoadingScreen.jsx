import { useEffect, useState } from "react";
import { IMG } from "@/sections/data";

const MIN_MS = 1200; // minimum time the screen stays visible

export function LoadingScreen({ children }) {
  const [phase, setPhase] = useState("visible"); // "visible" | "fading" | "gone"

  useEffect(() => {
    const start = Date.now();

    function dismiss() {
      const elapsed = Date.now() - start;
      const delay   = Math.max(0, MIN_MS - elapsed);

      setTimeout(() => {
        setPhase("fading");
        // Remove from DOM after the CSS transition finishes.
        setTimeout(() => setPhase("gone"), 600);
      }, delay);
    }

    // `load` fires once every resource (images, fonts, scripts) is ready.
    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      return () => window.removeEventListener("load", dismiss);
    }
  }, []);

  return (
    <>
      {children}

      {phase !== "gone" && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
          style={{ opacity: phase === "fading" ? 0 : 1, pointerEvents: phase === "fading" ? "none" : "auto" }}
        >
          {/* Logo */}
          <img
            src={IMG.logo}
            alt="House of Riddhi"
            className="h-32 w-auto object-contain sm:h-40"
            loading="eager"
          />

          {/* Brand name */}
          <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
            House of Riddhi
          </p>

          {/* Animated bar */}
          <div className="mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-muted">
            <div className="loading-bar h-full rounded-full bg-gold" />
          </div>

          {/* Subtle tagline */}
          <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold opacity-70">
            Heritage woven in elegance
          </p>
        </div>
      )}
    </>
  );
}
