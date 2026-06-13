import { Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactDetails = [
  {
    icon: Phone,
    label: "Call / WhatsApp",
    value: "+91 99999 99999",
    href: "tel:+919999999999",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@houseofriddhi.in",
    href: "mailto:hello@houseofriddhi.in",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Bengaluru, Karnataka, India",
    href: null,
  },
];

export function ReachUsSection({ form, status, onChange, onSubmit }) {
  return (
    <section
      id="reach-us"
      className="relative scroll-my-16 scroll-mt-20 border-b border-gold/15 bg-gradient-to-br from-maroon-deep/5 via-background to-gold/8 py-12 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14">

        {/* Left — contact info */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-24">
          <div>
            <p className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-gold">
              <span className="inline-block h-px w-8 bg-gold/60" aria-hidden />
              Get in Touch
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl">
              We&rsquo;d love to hear from you.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Whether you&rsquo;re searching for a bridal saree, ordering a gift, or simply curious about our weaves — reach out and we&rsquo;ll respond within 24 hours.
            </p>
          </div>

          {/* Contact details */}
          <div className="space-y-4">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/8">
                  <Icon className="size-4 text-gold" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
                  {href ? (
                    <a href={href} className="mt-0.5 text-sm font-medium text-foreground hover:text-maroon transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp quick button */}
          <a
            href="https://wa.me/919999999999?text=Hello%20House%20of%20Riddhi%2C%20I%20would%20like%20to%20enquire%20about%20your%20saree%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-3 text-sm font-semibold text-[#128C7E] transition-all hover:bg-[#25D366]/20 hover:border-[#25D366]/50"
          >
            <MessageCircle className="size-5 fill-[#25D366] text-[#25D366]" aria-hidden />
            Chat with us on WhatsApp
          </a>
        </div>

        {/* Right — contact form */}
        <div className="min-w-0">
          <form
            onSubmit={onSubmit}
            className="space-y-5 rounded-3xl border border-gold/20 bg-card/95 p-6 shadow-premium backdrop-blur-sm sm:p-8"
          >
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Send us a message
            </h3>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                required
                className="border-gold/20 focus-visible:ring-gold/40"
                placeholder="e.g. Priya Sharma"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email Address <span className="font-normal text-muted-foreground">(required)</span>
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                required
                className="border-gold/20 focus-visible:ring-gold/40"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-foreground">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={onChange}
                required
                className="min-h-28 border-gold/20 focus-visible:ring-gold/40"
                placeholder="Tell us about the saree you're looking for, occasion, preferred fabric, budget…"
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2 rounded-full bg-maroon px-8 text-primary-foreground shadow-premium hover:bg-maroon/85 sm:w-auto"
              disabled={status === "loading"}
            >
              {status === "loading" && <Loader2 className="size-4 animate-spin" aria-hidden />}
              Send Message
            </Button>

            {status === "success" && (
              <p className="text-sm font-medium text-emerald-600">
                Thank you for reaching out — we&rsquo;ll reply within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive">
                Could not send. Please try WhatsApp or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
