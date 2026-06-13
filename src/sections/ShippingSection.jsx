import { Package, RefreshCw, Shield, Truck } from "lucide-react";
import { SectionHeading } from "@/sections/SectionHeading";
import { SiteFooter } from "@/sections/SiteFooter";

const shippingInfo = [
  {
    icon: Truck,
    title: "Standard Delivery",
    description: "5–7 working days across India. Free shipping on orders above ₹2,999.",
    details: [
      "Available for all pin codes across India",
      "Tracked shipment with SMS & email updates",
      "Shipping charges: ₹99 for orders below ₹2,999",
    ],
  },
  {
    icon: Package,
    title: "Express Delivery",
    description: "2–3 working days. Available at checkout for select cities.",
    details: [
      "Available for metro cities: Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Kolkata",
      "Express charges: ₹199 (flat rate)",
      "Order before 12 PM for same-day dispatch",
    ],
  },
  {
    icon: Shield,
    title: "Safe Packaging",
    description: "Every saree is wrapped in tissue, boxed, and packed with care to reach you in pristine condition.",
    details: [
      "Tissue-wrapped to protect delicate weaves",
      "Rigid box packaging to prevent damage",
      "Signature House of Riddhi branded packaging",
    ],
  },
];

const returnPolicy = [
  {
    title: "7-Day Return Window",
    desc: "Initiate a return within 7 days of delivery. Items must be unworn, unwashed, and in original packaging with all tags intact.",
  },
  {
    title: "Easy Exchange",
    desc: "Not satisfied with the colour or quality? We'll arrange a free exchange for the same or equivalent value saree from our collection.",
  },
  {
    title: "Refund Process",
    desc: "Approved refunds are processed within 5–7 working days to your original payment method. UPI and bank transfers are processed faster.",
  },
  {
    title: "Non-Returnable Items",
    desc: "Custom-ordered sarees, sale or discounted items, and sarees purchased as bulk gifting orders are not eligible for return.",
  },
];

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

          {/* Shipping section */}
          <div className="mt-14">
            <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-semibold text-foreground sm:text-2xl">
              <span className="h-px flex-1 max-w-[3rem] bg-gold/40" aria-hidden />
              Shipping Information
              <span className="h-px flex-1 max-w-[3rem] bg-gold/40" aria-hidden />
            </h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {shippingInfo.map(({ icon: Icon, title, description, details }) => (
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
          </div>

          {/* Returns section */}
          <div className="mt-14">
            <h2 className="mb-6 flex items-center gap-3 font-display text-xl font-semibold text-foreground sm:text-2xl">
              <span className="h-px flex-1 max-w-[3rem] bg-gold/40" aria-hidden />
              Returns & Refunds
              <span className="h-px flex-1 max-w-[3rem] bg-gold/40" aria-hidden />
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {returnPolicy.map(({ title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gold/12 bg-card p-5 shadow-premium-sm sm:rounded-3xl sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <RefreshCw className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to initiate a return */}
          <div className="mt-10 rounded-3xl border border-gold/18 bg-gradient-to-br from-gold/6 to-maroon/4 p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
              How to Initiate a Return
            </h3>
            <ol className="mt-5 space-y-3">
              {[
                "WhatsApp or email us within 7 days of delivery with your order number and reason for return.",
                "We'll send you a prepaid return shipping label (for quality issues) or coordinate a pickup.",
                "Pack the saree in its original box with all tags and tissue intact.",
                "Once received and inspected, refund or exchange will be processed within 5–7 working days.",
              ].map((step, i) => (
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
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
