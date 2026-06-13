import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export function normalizeProduct(docLike) {
  const data = docLike.data ? docLike.data() : docLike;
  return {
    id: docLike.id ?? data.id,
    name: data.name,
    price: Number(data.price),
    category: data.category ?? "General",
    badge: data.badge ?? "",
    image: data.image,
    gallery: Array.isArray(data.gallery) && data.gallery.length ? data.gallery : [data.image].filter(Boolean),
    description: data.description ?? "",
  };
}

/**
 * Load all products from Firestore. Returns an empty array when Firestore is missing or the collection is empty.
 * @throws {Error} When the Firestore read fails.
 */
export async function fetchProducts() {
  if (!firestore) {
    return [];
  }

  try {
    const productQuery = query(collection(firestore, "products"), orderBy("name"));
    const snapshot = await getDocs(productQuery);
    if (snapshot.empty) return [];
    return snapshot.docs.map((docItem) => normalizeProduct(docItem));
  } catch (err) {
    console.error("fetchProducts:", err);
    if (err?.code === "permission-denied") {
      throw new Error(
        "Firestore denied reading products. Open Firebase Console → Firestore → Rules and publish rules that allow read on `products`, or run: firebase deploy --only firestore:rules"
      );
    }
    throw new Error(err?.message || "Failed to load products");
  }
}

/** Pass `id` only when updating an existing product; omit for create (Firestore auto-generates document id). */
export async function createOrUpdateProduct(product) {
  if (!firestore) {
    throw new Error("Firebase is not configured.");
  }

  const name = product.name?.trim() ?? "";
  const price = Number(product.price) || 0;
  const category = product.category?.trim() || "General";
  const badge = product.badge?.trim() ?? "";
  const image = product.image?.trim() ?? "";
  const gallery = Array.isArray(product.gallery) ? product.gallery.filter(Boolean) : [];
  const description = product.description?.trim() ?? "";

  const existingId = product.id?.trim();

  if (existingId) {
    const payload = {
      id: existingId,
      name,
      price,
      category,
      badge,
      image,
      gallery,
      description,
      updatedAt: serverTimestamp(),
    };
    await setDoc(doc(firestore, "products", existingId), payload, { merge: true });
    return normalizeProduct({ id: existingId, name, price, category, badge, image, gallery, description });
  }

  const ref = await addDoc(collection(firestore, "products"), {
    name,
    price,
    category,
    badge,
    image,
    gallery,
    description,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });

  return normalizeProduct({
    id: ref.id,
    name,
    price,
    category,
    badge,
    image,
    gallery,
    description,
  });
}

export async function deleteProductById(productId) {
  if (!firestore) {
    throw new Error("Firebase is not configured.");
  }
  await deleteDoc(doc(firestore, "products", productId));
}
