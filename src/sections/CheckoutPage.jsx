import { ArrowLeft, CheckCircle2, Loader2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getCldImage } from "@/lib/cloudinary";
import { submitOrder } from "@/api/orders-api";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Renders a product thumbnail — uses AdvancedImage if the src is a Cloudinary public_id,
 *  otherwise falls back to a plain <img>. */
function ProductThumb({ src, alt }) {
  const isCldId = src && !src.startsWith("http") && !src.startsWith("/");
  if (isCldId) {
    return (
      <AdvancedImage
        cldImg={getCldImage(src, { width: 96, height: 96 })}
        alt={alt}
        className="h-12 w-12 shrink-0 rounded-xl object-cover"
        width={48}
        height={48}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="h-12 w-12 shrink-0 rounded-xl object-cover"
      width={48}
      height={48}
    />
  );
}

export function CheckoutPage({ onOrderConfirmed }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { items = [], total = 0 } = location.state ?? {};

  const [customer, setCustomer] = useState({ phone: "", email: "", address: "", city: "", pincode: "" });
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const fileInputRef = useRef(null);

  const onCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!items.length) navigate("/shop", { replace: true });
  }, [items, navigate]);

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  if (!items.length) return null;

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are accepted");
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setScreenshot(file);
    setPreview(URL.createObjectURL(file));
    setUploadProgress(0);
  };

  const clearFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setScreenshot(null);
    setPreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async () => {
    if (!customer.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (!customer.address.trim() || !customer.city.trim() || !customer.pincode.trim()) {
      toast.error("Delivery address is required");
      return;
    }
    if (!screenshot) {
      toast.error("Please upload your payment screenshot first");
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitOrder({
        items,
        total,
        customer,
        screenshotFile: screenshot,
        onProgress: setUploadProgress,
      });
      setOrderId(result.id);
      onOrderConfirmed?.();
      toast.success("Order submitted!", {
        description: `Order #${result.id.slice(0, 8)} — we'll confirm once we verify your payment.`,
      });
    } catch (err) {
      console.error(err);
      toast.error("Could not submit order", { description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (orderId) {
    return (
      <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-10 text-primary" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Order received!</h1>
        <p className="mt-3 text-muted-foreground">
          Order{" "}
          <span className="font-mono font-semibold text-foreground">#{orderId.slice(0, 8)}</span>{" "}
          has been created.
          <br />
          We'll confirm once we verify your payment screenshot.
        </p>
        <Link
          to="/shop"
          className={cn(
            buttonVariants({ variant: "default" }),
            "mt-8 rounded-full px-10 no-underline"
          )}
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  // ── Main checkout page ─────────────────────────────────────────────────────
  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      {/* Back */}
      <Link
        to="/shop"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-8 inline-flex gap-2 px-0 text-muted-foreground hover:text-foreground no-underline"
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to shop
      </Link>

      <h1 className="font-display text-3xl font-bold tracking-tight">Complete your order</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Scan the UPI QR code, pay, then upload your payment screenshot to confirm.
      </p>

      {/* ── Order summary ── */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-premium-sm">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Order summary
        </h2>
        <ul className="mt-4 divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <ProductThumb src={item.image} alt={item.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(item.price)} × {item.quantity}
                </p>
              </div>
              <span className="font-semibold tabular-nums">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold tabular-nums">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* ── UPI QR code ── */}
      <div className="mt-6 flex flex-col items-center rounded-2xl border border-border bg-card p-6 shadow-premium-sm">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Pay via UPI
        </h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Open any UPI app (GPay, PhonePe, Paytm…) and scan
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-white shadow-md">
          <img
            src="/upi-qr.jpg"
            alt="Scan Federal Bank UPI QR code to pay"
            className="mx-auto max-h-[min(22rem,65svh)] w-auto max-w-full object-contain"
            width={474}
            height={596}
            decoding="async"
          />
        </div>
        <p className="mt-4 text-center text-sm font-medium">
          Amount to pay:{" "}
          <span className="font-bold text-primary">{formatCurrency(total)}</span>
        </p>
      </div>

      {/* ── Steps ── */}
      <ol className="mt-6 space-y-3">
        {[
          "Scan the QR code with any UPI app.",
          `Enter the exact amount: ${formatCurrency(total)}.`,
          "Complete the payment and take a screenshot.",
          "Upload the screenshot below and tap Submit order.",
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>

      {/* ── Customer info ── */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-premium-sm">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Your contact details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We'll use this to confirm your order.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="checkout-phone">
              Phone number <span className="text-destructive">*</span>
            </label>
            <Input
              id="checkout-phone"
              name="phone"
              type="tel"
              value={customer.phone}
              onChange={onCustomerChange}
              placeholder="+91 98765 43210"
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="checkout-email">
              Email <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <Input
              id="checkout-email"
              name="email"
              type="email"
              value={customer.email}
              onChange={onCustomerChange}
              placeholder="you@example.com"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-foreground" htmlFor="checkout-address">
            Delivery address <span className="text-destructive">*</span>
          </label>
          <Textarea
            id="checkout-address"
            name="address"
            value={customer.address}
            onChange={onCustomerChange}
            placeholder="House / flat no., street, area, landmark…"
            className="mt-1.5 min-h-[80px]"
            required
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="checkout-city">
              City <span className="text-destructive">*</span>
            </label>
            <Input
              id="checkout-city"
              name="city"
              value={customer.city}
              onChange={onCustomerChange}
              placeholder="Mumbai"
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="checkout-pincode">
              Pincode <span className="text-destructive">*</span>
            </label>
            <Input
              id="checkout-pincode"
              name="pincode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={customer.pincode}
              onChange={onCustomerChange}
              placeholder="400001"
              className="mt-1.5"
              required
            />
          </div>
        </div>
      </div>

      {/* ── Screenshot upload ── */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-premium-sm">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Upload payment screenshot
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We use this to verify your payment before confirming the order.
        </p>

        {preview ? (
          <div className="relative mt-4 inline-block">
            <img
              src={preview}
              alt="Payment screenshot preview"
              className="max-h-72 w-auto rounded-xl border border-border object-contain shadow-md"
            />
            <button
              type="button"
              onClick={clearFile}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
              aria-label="Remove screenshot"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 py-10 transition-colors hover:border-primary/50 hover:bg-muted/50"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile(e.dataTransfer.files[0]);
            }}
          >
            <Upload className="size-7 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Click or drag &amp; drop your screenshot here
            </span>
            <span className="text-xs text-muted-foreground/70">PNG, JPG, WEBP accepted</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {/* Upload progress bar */}
        {submitting && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{uploadProgress === 0 ? "Compressing…" : "Uploading screenshot…"}</span>
              {uploadProgress > 0 && <span>{uploadProgress}%</span>}
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              {uploadProgress === 0 ? (
                <div className="h-full w-full animate-pulse rounded-full bg-primary/50" />
              ) : (
                <div
                  className="h-full rounded-full bg-primary transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Submit ── */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          className="rounded-full px-8"
          onClick={onSubmit}
          disabled={submitting || !screenshot}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
              Submitting…
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 size-4" aria-hidden />
              Submit order
            </>
          )}
        </Button>
        <Link
          to="/shop"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-full no-underline")}
        >
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
