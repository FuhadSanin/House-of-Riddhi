/**
 * Static image paths and shared data for House of Riddhi.
 * Run `npm run optimise-images` after adding new assets.
 */
export const IMG = {
  // brand
  logo: "/generated/brand/image.png",
  logo_red: "/generated/brand/image.png",
  logo_warm: "/generated/brand/image.png",
  logoFull: "/generated/brand/image.png",
  heroBg: "/generated/brand/hero-white-saree.webp",
  heroBrand: "/generated/brand/ho.webp",
  logo_packaging: "/generated/brand/riddhi-packaging.png",

  // saree landing imagery
  heroSaree: "/generated/saree_section/hero-saree.webp",
  catalog1: "/generated/saree_section/catalog-1.webp",
  catalog2: "/generated/saree_section/catalog-2.webp",
  catalog3: "/generated/saree_section/catalog-3.webp",
  catalog4: "/generated/saree_section/catalog-4.webp",
  featuredSaree: "/generated/saree_section/featured-saree.webp",
  storyRack: "/generated/saree_section/story-rack.webp",
  storyChest: "/generated/saree_section/story-chest.webp",
  storyWeave: "/generated/saree_section/story-weave.webp",
  storyBorder: "/generated/saree_section/story-border.webp",
  packaging: "/generated/saree_section/packaging.webp",
  brandBg: "/generated/saree_section/brand-saree-bg.webp",
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "Our Story", href: "#story" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#reach-us" },
  { label: "Shop", href: "/shop" },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "WhatsApp", href: "https://wa.me/919999999999", icon: "whatsapp" },
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

export const COLLECTIONS = [
  {
    id: "artisan",
    number: "1",
    title: "Artisan-crafted sarees",
    description:
      "Discover handwoven silks and cottons inspired by timeless Indian weaving traditions.",
    image: IMG.catalog1,
    imageAlt: "Handwoven artisan saree with traditional motifs",
  },
  {
    id: "occasions",
    number: "2",
    title: "Curated for every occasion",
    description:
      "Each drape is curated for weddings, festivals, and elegant everyday wear.",
    image: IMG.catalog2,
    imageAlt: "Elegant saree curated for festive occasions",
  },
  {
    id: "limited",
    number: "3",
    title: "Limited edition designs",
    description:
      "Collaborations with master weavers ensure authenticity and fair, transparent sourcing.",
    image: IMG.catalog3,
    imageAlt: "Limited edition saree with master weaver collaboration",
  },
  {
    id: "quality",
    number: "4",
    title: "Quality guaranteed",
    description:
      "Premium fabrics are inspected to ensure lasting color, sheen, and fall.",
    image: IMG.catalog4,
    imageAlt: "Premium saree fabric with rich sheen and drape",
  },
];
