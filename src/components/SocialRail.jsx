import { SocialLinkButton } from "@/components/SocialIcon";
import { SOCIALS } from "@/sections/data";

export function SocialRail() {
  return (
    <nav
      aria-label="Social media"
      className="fixed right-3 top-44 z-40 hidden flex-col gap-2.5 sm:top-44 md:flex"
    >
      {SOCIALS.map(({ label, href, icon }) => (
        <SocialLinkButton key={label} label={label} href={href} icon={icon} />
      ))}
    </nav>
  );
}
