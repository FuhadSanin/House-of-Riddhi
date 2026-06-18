import { Link } from "react-router-dom";
import { Aperture, Share2, Video, MessageCircle } from "lucide-react";
import { IMG } from "@/sections/data";

const footerLinks = {
  Shop: [
    { label: "All Sarees", href: "/shop" },
    { label: "Cotton Sarees", href: "/shop" },
    { label: "Linen Sarees", href: "/shop" },
    { label: "Handloom Weaves", href: "/shop" },
    { label: "New Arrivals", href: "/shop" },
    { label: "Bestsellers", href: "/shop" },
  ],
  Explore: [
    { label: "Our Story", href: "/#story" },
    { label: "Collections", href: "/#collections" },
    { label: "Contact Us", href: "/#reach-us" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping & Returns", href: "/shipping" },
  ],
};

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: Aperture },
  { label: "Share", href: "https://facebook.com", icon: Share2 },
  { label: "YouTube", href: "https://youtube.com", icon: Video },
  { label: "WhatsApp", href: "https://wa.me/919999999999", icon: MessageCircle },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-maroon-deep text-primary-foreground">
      {/* Gold accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      {/* Newsletter */}
      <div className="border-b border-gold/15 bg-primary/20 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-2xl font-semibold text-primary-foreground sm:text-3xl">
                Join the House of Riddhi Circle
              </p>
              <p className="mt-1 text-sm text-primary-foreground/65">
                New arrivals, exclusive offers, and weaving stories — delivered to your inbox.
              </p>
            </div>
            <form
              className="flex w-full max-w-sm gap-2 sm:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-full border border-gold/30 bg-white/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/50 sm:w-56"
              />
              <button
                type="submit"
                className="rounded-full border border-gold/40 bg-gold px-5 py-2.5 text-sm font-semibold text-maroon-deep transition-opacity hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-white/5 p-1.5">
                  <img
                    src={IMG.logo_warm}
                    alt=""
                    aria-hidden
                    className="size-full object-contain"
                  />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold tracking-[0.02em] text-primary-foreground">
                    House of Riddhi
                  </p>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-gold">
                    Heritage woven in elegance
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/60">
                Celebrating the art of Indian handloom — every saree tells a story of tradition,
                craftsmanship, and timeless grace.
              </p>

              {/* Social links */}
              <div className="mt-6 flex gap-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 bg-white/6 text-primary-foreground/75 transition-colors hover:border-gold/60 hover:bg-gold/15 hover:text-gold"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold opacity-80">
                  {heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        to={href}
                        className="text-sm text-primary-foreground/60 transition-colors hover:text-gold"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold divider + bottom bar */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-primary-foreground/40 sm:flex-row sm:px-6 sm:text-left">
          <p>© {new Date().getFullYear()} House of Riddhi. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/faq" className="hover:text-gold transition-colors">FAQ</Link>
            <Link to="/shipping" className="hover:text-gold transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
