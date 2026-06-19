import { Link } from "react-router-dom";
import { SocialLinkButton } from "@/components/SocialIcon";
import { IMG, SOCIALS } from "@/sections/data";

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

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-maroon-deep text-primary-foreground">
      {/* Gold accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      {/* Links grid */}
      <div className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4">
                <img
                  src={IMG.logo}
                  alt="House of Riddhi"
                  className="h-24 w-auto shrink-0 object-contain sm:h-28"
                />
              </div>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/60">
                Celebrating the art of Indian handloom — every saree tells a story of tradition,
                craftsmanship, and timeless grace.
              </p>

              {/* Social links */}
              <div className="mt-6 flex gap-3">
                {SOCIALS.map(({ label, href, icon }) => (
                  <SocialLinkButton
                    key={label}
                    label={label}
                    href={href}
                    icon={icon}
                    className="size-9"
                  />
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
