import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/sections/SectionHeading";
import { SiteFooter } from "@/sections/SiteFooter";
import { cn } from "@/lib/utils";

export const faqs = [
  {
    q: "What types of sarees does House of Riddhi offer?",
    a: "We specialise in handcrafted cotton, linen, and handloom sarees. Our collection includes everyday cotton sarees with traditional block prints, crisp linen sarees for festive occasions, and authentic handloom weaves from Tamil Nadu, West Bengal, and Andhra Pradesh.",
  },
  {
    q: "Are all your sarees genuinely handmade?",
    a: "Yes. Every saree in our collection is handwoven or hand-printed by skilled artisans. Handloom sarees carry the official Handloom Mark — a government-certified guarantee of authentic artisan craftsmanship.",
  },
  {
    q: "How do I choose the right saree size?",
    a: "Our sarees are standard 5.5 or 6 metres in length with a 0.8m blouse piece. Detailed measurements are listed on each product page. If you have specific requirements, please contact us on WhatsApp and we can guide you.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "We accept returns within 7 days of delivery for unopened, unworn sarees in original packaging. Exchanges are available for size or quality concerns. Custom-ordered and sale items are non-returnable. See our Shipping & Returns page for full details.",
  },
  {
    q: "How do I care for my handloom saree?",
    a: "Cotton and linen sarees should be hand-washed or dry-cleaned. Avoid machine washing. Iron on medium heat with a damp cloth between the iron and saree. Store in a cool, dry place, ideally wrapped in muslin cloth to preserve the weave.",
  },
  {
    q: "Do you offer bulk or gifting orders?",
    a: "Absolutely. We cater to wedding trousseau orders, corporate gifting, and festive bulk orders. Contact us via WhatsApp or the contact form with your requirements — quantity, fabric preference, budget — and we'll create a bespoke proposal.",
  },
  {
    q: "Can I customise a saree?",
    a: "Yes, we offer customisation for select handloom weaves — including colour choices, border patterns, and blouse piece preferences. Customisation orders require a lead time of 4–6 weeks. Reach out to discuss your vision.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery within India takes 5–7 working days. Express delivery (2–3 days) is available at checkout. All orders are shipped with tracking. International shipping is available to select countries — please contact us for rates.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major UPI apps (PhonePe, Google Pay, Paytm), debit/credit cards, net banking, and bank transfers. Cash on Delivery (COD) is available for select pin codes.",
  },
  {
    q: "How can I contact House of Riddhi?",
    a: "You can reach us via WhatsApp at +91 99999 99999, email at hello@houseofriddhi.in, or through the contact form on our website. We respond within 24 hours on all business days.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gold/15 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-semibold text-foreground sm:text-lg">
          {faq.q}
        </span>
        <ChevronDown
          className={cn(
            "mt-1 size-5 shrink-0 text-gold transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          aria-hidden
        />
      </button>
      <div
        className={cn(
          "overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all duration-300",
          isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {faq.a}
      </div>
    </div>
  );
}

function FAQAccordion({ items, defaultOpenIdx = null }) {
  const [openIdx, setOpenIdx] = useState(defaultOpenIdx);
  const toggle = (idx) => setOpenIdx((prev) => (prev === idx ? null : idx));

  return (
    <div className="rounded-3xl border border-gold/18 bg-card shadow-premium">
      <div className="px-5 py-2 sm:px-8">
        {items.map((faq, idx) => (
          <FAQItem
            key={faq.q}
            faq={faq}
            isOpen={openIdx === idx}
            onToggle={() => toggle(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export function FAQSection() {
  const featuredFaqs = faqs.slice(0, 6);

  return (
    <section
      id="faq"
      className="scroll-my-16 scroll-mt-20 border-b border-gold/15 bg-gradient-to-bl from-maroon/4 via-background to-gold/6 py-14 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div data-reveal className="reveal-up">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Quick answers about our sarees, orders, and care. Need more detail? Browse the full FAQ or reach us on WhatsApp."
          />
        </div>

        <div data-reveal className="reveal-up mt-12">
          <FAQAccordion items={featuredFaqs} />
        </div>

        <div data-reveal className="reveal-up mt-8 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-card px-6 py-2.5 text-sm font-semibold text-maroon transition-all hover:border-gold/45 hover:bg-gold/6"
          >
            View all questions
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FAQPage() {
  return (
    <>
      <section className="min-h-[70svh] py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              description="Everything you need to know about House of Riddhi sarees, orders, and care. Can't find what you're looking for? Reach us on WhatsApp."
            />
          </div>

          <div className="mt-12">
            <FAQAccordion items={faqs} />
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/8 to-maroon/4 p-6 text-center sm:p-8">
            <p className="font-display text-lg font-semibold text-foreground sm:text-xl">
              Still have questions?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Our team is happy to help — reach out any time.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/12 px-6 py-2.5 text-sm font-semibold text-[#128C7E] transition-all hover:bg-[#25D366]/22"
              >
                Chat on WhatsApp
              </a>
              <a
                href="mailto:hello@houseofriddhi.in"
                className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-card px-6 py-2.5 text-sm font-semibold text-maroon transition-all hover:border-gold/45 hover:bg-gold/6"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
