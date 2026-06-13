import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

/** Generate a short order ID like 24S-A3F9B2 */
function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `24S-${suffix}`;
}

/**
 * Upload the payment screenshot to Cloudinary, then create an order document
 * in the Firestore `orders` collection with a custom "24S-XXXXXX" ID.
 *
 * Firestore schema:
 *   items[]       – { productId, name, price, quantity, category }
 *   total         – number (INR)
 *   customer      – { phone, email }
 *   screenshotUrl – string | null
 *   status        – "pending_review" | "confirmed" | "cancelled"
 *   createdAt     – Timestamp
 */
export async function submitOrder({ items, total, customer, screenshotFile, onProgress }) {
  let screenshotUrl = null;

  if (screenshotFile) {
    const result = await uploadToCloudinary(screenshotFile, {
      folder: "order-screenshots",
      onProgress,
    });
    screenshotUrl = result.url;
  }

  const orderItems = items.map(({ id, name, price, quantity, category }) => ({
    productId: id,
    name,
    price,
    quantity,
    category: category ?? null,
  }));

  if (!firestore) {
    return { id: `24S-OFFLINE`, screenshotUrl, mode: "offline" };
  }

  const orderId = generateOrderId();
  const orderRef = doc(collection(firestore, "orders"), orderId);

  await setDoc(orderRef, {
    items: orderItems,
    total,
    customer: {
      phone: customer?.phone?.trim() ?? "",
      email: customer?.email?.trim() ?? "",
      address: customer?.address?.trim() ?? "",
      city: customer?.city?.trim() ?? "",
      pincode: customer?.pincode?.trim() ?? "",
    },
    screenshotUrl,
    status: "pending_review",
    createdAt: serverTimestamp(),
  });

  return { id: orderId, screenshotUrl, mode: "firebase" };
}

/**
 * Update the status of an order.
 * @param {string} orderId
 * @param {"pending_review"|"confirmed"|"cancelled"} status
 */
export async function updateOrderStatus(orderId, status) {
  if (!firestore) throw new Error("Firestore not available");
  await updateDoc(doc(firestore, "orders", orderId), { status });
}

/**
 * Fetch all orders from Firestore, sorted newest-first.
 * @returns {Promise<Array>}
 */
export async function fetchOrders() {
  if (!firestore) return [];

  const snap = await getDocs(
    query(collection(firestore, "orders"), orderBy("createdAt", "desc"))
  );

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate?.() ?? null,
  }));
}
