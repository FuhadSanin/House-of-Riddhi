import { Link } from "react-router-dom";
import { Package, RefreshCw, Shield, Truck } from "lucide-react";
import { SectionHeading } from "@/sections/SectionHeading";
import { SiteFooter } from "@/sections/SiteFooter";
import { RETURN_POLICY, SHIPPING, formatInr } from "@/lib/shipping";

function formatThreshold(value) {
  return formatInr(value);
}

export const shippingInfo = [
  {
    icon: Truck,
    title: "Standard Delivery",
    description: `5–7 working days across India. Free shipping on orders above ${formatThreshold(SHIPPING.FREE_THRESHOLD)}.`,
    details: [
      "Available for all pin codes across India",
      "Tracked shipment with SMS & email updates",
      `Shipping charges: ${formatThreshold(SHIPPING.STANDARD_FEE)} for orders below ${formatThreshold(SHIPPING.FREE_THRESHOLD)}`,
    ],
  },
  {
    icon: Package,
    title: "Express Delivery",
    description: "2–3 working days. Available at checkout for select cities.",
    details: [
      "Available for metro cities: Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Kolkata",
      `Express charges: ${formatThreshold(SHIPPING.EXPRESS_FEE)} (flat rate)`,
      "Order before 12 PM for same-day dispatch",
    ],
  },
  {
    icon: Shield,
    title: "Safe Packaging",
    description:
      "Every saree is wrapped in tissue, boxed, and packed with care to reach you in pristine condition.",
    details: [
      "Tissue-wrapped to protect delicate weaves",
      "Rigid box packaging to prevent damage",
      "Signature House of Riddhi branded packaging",
    ],
  },
];

export const returnPolicy = [
  {
    title: `${RETURN_POLICY.WINDOW_DAYS}-Day Return Window`,
    desc: "Initiate a return within 7 days of delivery. Items must be unworn, unwashed, and in original packaging with all tags intact.",
  },
  {
    title: "Easy Exchange",
    desc: "Not satisfied with the colour or quality? We'll arrange a free exchange for the same or equivalent value saree from our collection.",
  },
  {
    title: "Refund Process",
    desc: `Approved refunds are processed within ${RETURN_POLICY.REFUND_DAYS} to your original payment method. UPI and bank transfers are processed faster.`,
  },
  {
    title: "Non-Returnable Items",
    desc: "Custom-ordered sarees, sale or discounted items, and sarees purchased as bulk gifting orders are not eligible for return.",
  },
];

const returnSteps = [
  "WhatsApp or email us within 7 days of delivery with your order number and reason for return.",
  "We'll send you a prepaid return shipping label (for quality issues) or coordinate a pickup.",
  "Pack the saree in its original box with all tags and tissue intact.",
  "Once received and inspected, refund or exchange will be processed within 5–7 working days.",
];

function ShippingCards({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {items.map(({ icon: Icon, title, description, details }) => (
        <div
          key={title}
          className="rounded-2xl border border-gold/15 bg-card p-5 shadow-premium-sm sm:rounded-3xl sm:p-6"
        >
          <div className="flex size-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/8">
            <Icon className="size-5 text-gold" aria-hidden />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <ul className="mt-4 space-y-2">
            {details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold opacity-70" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ReturnCards({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map(({ title, desc }) => (
        <div
          key={title}
          className="rounded-2xl border border-gold/12 bg-card p-5 shadow-premium-sm sm:rounded-3xl sm:p-6"
        >
          <div className="flex items-start gap-3">
            <RefreshCw className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
            <div>
              <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReturnStepsCTA() {
  return (
    <div className="rounded-3xl border border-gold/18 bg-gradient-to-br from-gold/6 to-maroon/4 p-6 sm:p-8">
      <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
        How to Initiate a Return
      </h3>
      <ol className="mt-5 space-y-3">
        {returnSteps.map((step, i) => (
          <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/12 px-6 py-2.5 text-sm font-semibold text-[#128C7E] transition-all hover:bg-[#25D366]/22"
        >
          WhatsApp Us
        </a>
        <a
          href="mailto:hello@houseofriddhi.in"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/25 bg-card px-6 py-2.5 text-sm font-semibold text-maroon transition-all hover:border-gold/45 hover:bg-gold/6"
        >
          Email: hello@houseofriddhi.in
        </a>
      </div>
    </div>
  );
}

export function ShippingSection() {
  return (
    <section
      id="shipping"
      className="scroll-my-16 scroll-mt-20 border-b border-gold/15 bg-gradient-to-tr from-gold/5 via-background to-maroon/4 py-14 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div data-reveal className="reveal-up">
          <SectionHeading
            eyebrow="Shipping & Returns"
            title="Delivered with Care, Returned with Ease"
            description="Every saree is packed with care. Free standard shipping on orders above ₹2,999 — and a simple return process if something isn't quite right."
          />
        </div>

        <div data-reveal className="reveal-up mt-12">
          <ShippingCards items={shippingInfo} />
        </div>

        <div data-reveal className="reveal-up mt-12">
          <h2 className="mb-6 text-center font-display text-xl font-semibold text-foreground sm:text-2xl">
            Returns at a Glance
          </h2>
          <ReturnCards items={returnPolicy.slice(0, 2)} />
        </div>

        <div data-reveal className="reveal-up mt-8 text-center">
          <Link
            to="/shipping"
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-card px-6 py-2.5 text-sm font-semibold text-maroon transition-all hover:border-gold/45 hover:bg-gold/6"
          >
            View full shipping & returns policy
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ShippingPage() {
  return (
    <>
      <section className="min-h-[70svh] py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Shipping & Returns"
            title="Delivered with Care, Returned with Ease"
            description="We take great care in packaging and shipping your sarees. Should anything not meet your expectations, our return process is simple and hassle-free."
          />

          <div className="mt-14">
            <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-semibold text-foreground sm:text-2xl">
              <span className="h-px flex-1 max-w-[3rem] bg-gold/40" aria-hidden />
              Shipping Information
              <span className="h-px flex-1 max-w-[3rem] bg-gold/40" aria-hidden />
            </h2>
            <ShippingCards items={shippingInfo} />
          </div>

          <div className="mt-14">
            <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-semibold text-foreground sm:text-2xl">
              <span className="h-px flex-1 max-w-[3rem] bg-gold/40" aria-hidden />
              Returns & Refunds
              <span className="h-px flex-1 max-w-[3rem] bg-gold/40" aria-hidden />
            </h2>
            <ReturnCards items={returnPolicy} />
          </div>

          <div className="mt-10">
            <ReturnStepsCTA />
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
