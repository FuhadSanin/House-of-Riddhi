import { SocialLinkButton } from "@/components/SocialIcon";
import { SOCIALS } from "@/sections/data";

export function SocialRail() {
  return (
    <nav
      aria-label="Social media"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
    >
      {SOCIALS.map(({ label, href, icon }) => (
        <SocialLinkButton key={label} label={label} href={href} icon={icon} />
      ))}
    </nav>
  );
}
