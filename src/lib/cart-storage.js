const STORAGE_KEY = "house-of-riddhi-cart-v1";

function sanitizeLine(row) {
  if (!row || typeof row !== "object") return null;
  const id = row.id;
  if (id == null || String(id).trim() === "") return null;
  const quantity = Math.floor(Number(row.quantity));
  if (!Number.isFinite(quantity) || quantity < 1) return null;
  const price = Number(row.price);
  if (!Number.isFinite(price) || price < 0) return null;
  const name = typeof row.name === "string" ? row.name : "";
  const image = typeof row.image === "string" ? row.image : "";
  return {
    id: String(id),
    name,
    price,
    image,
    category: typeof row.category === "string" ? row.category : "General",
    badge: typeof row.badge === "string" ? row.badge : "",
    description: typeof row.description === "string" ? row.description : "",
    gallery: Array.isArray(row.gallery) ? row.gallery.filter((u) => typeof u === "string") : [],
    quantity,
  };
}

export function loadPersistedCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.map(sanitizeLine).filter(Boolean);
  } catch {
    return [];
  }
}

export function persistCart(cart) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn("Could not persist cart to localStorage", e);
  }
}
