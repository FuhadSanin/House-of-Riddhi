/**
 * Static image paths and shared data for House of Riddhi.
 * Run `npm run optimise-images` after adding new assets.
 */
export const IMG = {
  // brand
  logo: "/generated/brand/riddhi-logo-dark.png",
  logo_red: "/generated/brand/riddhi-logo-dark.png",
  logo_warm: "/generated/brand/riddhi-logo-warm.png",
  logo_packaging: "/generated/brand/riddhi-packaging.png",

  // hero — these resolve to existing optimised assets (saree imagery via admin)
  hero: "/generated/hero_section/hero-kids-gifts.webp",
  labubu: "/generated/hero_section/labubu.webp",
  dino_key: "/generated/hero_section/dino-key.png",
  hero_watch: "/generated/hero_section/hero_watch.webp",
  hero_jewellery: "/generated/hero_section/hero_jewellery.webp",

  // catalog / collections
  keychains: "/generated/catalog_section/catalog-keychains.webp",
  magnets: "/generated/catalog_section/catalog-magnets.webp",
  dinoKeychain: "/generated/catalog_section/dino-keychain-3d-bg.webp",

  // story
  story: "/generated/story_section/story-shelf.webp",
  robot: "/generated/story_section/robo.webp",

  // featured
  giftBox: "/generated/featured_section/featured-giftbox.webp",
  tray: "/generated/featured_section/featured-tray.webp",

  // reach us / contact
  reachUs: "/generated/reach_us_section/reach-us-illustration.webp",
  dinoGiftBox: "/generated/reach_us_section/dino-gift.webp",

  // accessories (repurposed as "why choose us" imagery)
  jewellery: "/generated/accessories_section/jewellery.webp",
  watches: "/generated/accessories_section/watches.webp",
  watch_no_background: "/generated/accessories_section/watch_no_background.webp",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "Our Story", href: "#story" },
  { label: "Contact", href: "#reach-us" },
  { label: "Shop", href: "/shop" },
];

export const REVIEWS = [
  {
    quote:
      "My Kanjivaram from House of Riddhi was breathtaking — the zari work caught every light perfectly. The packaging felt like receiving a royal gift.",
    author: "Meera Raghunathan",
    role: "Bride, Chennai",
  },
  {
    quote:
      "I ordered a handloom cotton saree for daily wear and it's been my go-to for two months. Soft, elegant, and washes beautifully. Truly handcrafted quality.",
    author: "Lakshmi Venkatesh",
    role: "Educator, Bengaluru",
  },
  {
    quote:
      "The linen sarees are divine — lightweight yet luxurious. I wore mine to a wedding and received endless compliments. House of Riddhi never disappoints.",
    author: "Priya Krishnamurthy",
    role: "Fashion curator, Hyderabad",
  },
  {
    quote:
      "Ordered a bulk gifting set of sarees for our team's Pongal celebration. Delivered on time, quality was consistent across all pieces. Will order again.",
    author: "Ananya Subramanian",
    role: "HR Manager, Coimbatore",
  },
];
