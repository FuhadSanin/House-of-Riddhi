import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { nav } from "@/sections/data";

function navItemTo(href) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function SiteHeader({ cartCount = 0, onCartOpen = () => {} }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navMounted, setNavMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setNavMounted(true); }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-gold/20 bg-ivory/95 shadow-premium-sm backdrop-blur-2xl backdrop-saturate-150"
            : "border-b border-gold/10 bg-ivory/80 backdrop-blur-xl"
        )}
      >
        {/* Gold top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

        <div className="relative z-10 mx-auto flex h-16 min-h-[4rem] max-w-6xl items-center justify-between gap-3 px-4 sm:h-18 sm:gap-4 sm:px-6">
          {/* Logo */}
          <Link
            to="/#home"
            className="inline-flex min-w-0 shrink items-center gap-3 rounded-md text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <img
              src="/generated/brand/riddhi-logo-dark.png"
              alt="House of Riddhi logo"
              className="h-11 w-auto max-h-14 shrink-0 object-contain sm:h-12"
              decoding="async"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold leading-tight tracking-wide text-maroon sm:text-xl">
                House of Riddhi
              </span>
              <span className="hidden text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-gold sm:block">
                Heritage woven in elegance
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden flex-1 items-center justify-center gap-x-7 md:flex lg:justify-center"
            aria-label="Main"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                to={navItemTo(item.href)}
                className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-300 hover:text-maroon"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Cart button */}
            <button
              type="button"
              onClick={onCartOpen}
              className="relative inline-flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-full border border-gold/25 bg-card/90 shadow-premium-sm transition-colors hover:border-gold/50 hover:bg-gold/8"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="size-[18px] text-maroon" />
              {cartCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-maroon px-1.5 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              ) : null}
            </button>

            {/* Shop CTA */}
            <Link
              to="/shop"
              className={cn(
                buttonVariants(),
                "hidden rounded-full border border-gold/20 bg-maroon px-5 text-primary-foreground shadow-gold hover:bg-maroon/85 md:inline-flex"
              )}
            >
              Shop Collection
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="inline-flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-full border border-gold/25 bg-card/90 shadow-premium-sm md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="size-5 text-maroon" /> : <Menu className="size-5 text-maroon" />}
            </button>
          </div>
        </div>
      </header>

      {navMounted
        ? createPortal(
            <div
              id="mobile-nav"
              className={cn(
                "fixed inset-x-0 bottom-0 top-[4.125rem] z-[85] flex flex-col bg-ivory/98 backdrop-blur-md transition-[visibility,opacity,transform] duration-200 md:hidden",
                menuOpen
                  ? "visible pointer-events-auto translate-y-0 opacity-100"
                  : "invisible pointer-events-none translate-y-1 opacity-0"
              )}
              aria-hidden={!menuOpen}
            >
              {/* Gold accent top */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

              <nav
                className="flex max-h-[min(100dvh-4.125rem,100vh-4.125rem)] flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-5"
                aria-label="Mobile main"
              >
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    to={navItemTo(item.href)}
                    className="rounded-xl px-4 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-primary/8 hover:text-maroon active:bg-primary/12"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="my-3 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

                <Link
                  to="/shop"
                  className={cn(
                    buttonVariants(),
                    "mx-1 mt-2 rounded-full bg-maroon text-primary-foreground shadow-gold hover:bg-maroon/85"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  Shop Collection
                </Link>

                <div className="mt-6 text-center">
                  <p className="font-display text-sm italic text-gold">
                    "Heritage woven in elegance."
                  </p>
                </div>
              </nav>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
