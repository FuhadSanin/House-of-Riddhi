export const SHIPPING = {
  FREE_THRESHOLD: 2999,
  STANDARD_FEE: 99,
  EXPRESS_FEE: 199,
  EXPRESS_CITIES: [
    "mumbai",
    "delhi",
    "new delhi",
    "bengaluru",
    "bangalore",
    "chennai",
    "hyderabad",
    "kolkata",
  ],
};

export const RETURN_POLICY = {
  WINDOW_DAYS: 7,
  REFUND_DAYS: "5–7 working days",
};

export function calculateSubtotal(items = []) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getStandardShippingFee(subtotal) {
  return subtotal >= SHIPPING.FREE_THRESHOLD ? 0 : SHIPPING.STANDARD_FEE;
}

export function isExpressAvailable(city) {
  if (!city?.trim()) return false;
  const normalized = city.trim().toLowerCase();
  return SHIPPING.EXPRESS_CITIES.some(
    (metro) => normalized.includes(metro) || metro.includes(normalized)
  );
}

export function calculateOrderTotals({
  subtotal,
  deliveryMethod = "standard",
  city = "",
}) {
  const standardFee = getStandardShippingFee(subtotal);
  const expressAvailable = isExpressAvailable(city);
  const useExpress = deliveryMethod === "express" && expressAvailable;

  const shippingFee = useExpress ? SHIPPING.EXPRESS_FEE : standardFee;

  return {
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    deliveryMethod: useExpress ? "express" : "standard",
    expressAvailable,
    freeShippingEligible: subtotal >= SHIPPING.FREE_THRESHOLD,
    amountForFreeShipping: Math.max(0, SHIPPING.FREE_THRESHOLD - subtotal),
  };
}

export function formatInr(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
