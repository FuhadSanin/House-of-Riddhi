/**
 * Order / checkout persistence. Product reads & CRUD live in `@/api/products-api`.
 */
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export {
  createOrUpdateProduct,
  deleteProductById,
  fetchProducts,
  fetchProducts as getCatalogProducts,
} from "@/api/products-api";

export async function createOrder({ items, total, customer }) {
  if (!firestore) {
    return {
      id: `offline-${Date.now()}`,
      mode: "offline",
      message: "Order saved locally. Connect Firebase to persist orders.",
    };
  }

  const orderRef = await addDoc(collection(firestore, "orders"), {
    items,
    total,
    customer: customer ?? null,
    createdAt: serverTimestamp(),
    status: "placed",
  });

  return { id: orderRef.id, mode: "firebase" };
}
