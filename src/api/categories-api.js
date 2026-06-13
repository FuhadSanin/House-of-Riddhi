import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

/**
 * Category document in Firestore collection `categories`.
 * @typedef {{ id: string; name: string }} ShopCategory
 */

/**
 * Load storefront categories. Documents should include at least `name` (string).
 * If Firestore rules deny reads on `categories`, returns [].
 * @returns {Promise<ShopCategory[]>}
 * @throws {Error} On non-permission Firestore failures (e.g. network).
 */
export async function fetchCategories() {
  if (!firestore) {
    return [];
  }

  try {
    const snapshot = await getDocs(collection(firestore, "categories"));
    const list = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: String(data.name ?? "").trim(),
      };
    });
    return list.filter((c) => c.name).sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    if (err?.code === "permission-denied") {
      return [];
    }
    console.error("fetchCategories:", err);
    throw new Error(err?.message || "Failed to load categories");
  }
}

/**
 * Create or update a category. Omit `id` to create a document with an auto-generated id.
 * @param {{ id?: string; name: string }} input
 * @returns {Promise<ShopCategory>}
 */
export async function saveCategory(input) {
  if (!firestore) {
    throw new Error("Firebase is not configured.");
  }
  const name = String(input.name ?? "").trim();
  if (!name) {
    throw new Error("Category name is required.");
  }
  const payload = {
    name,
    updatedAt: serverTimestamp(),
  };
  const existingId = input.id?.trim();
  if (existingId) {
    await setDoc(doc(firestore, "categories", existingId), payload, { merge: true });
    return { id: existingId, name };
  }
  const ref = await addDoc(collection(firestore, "categories"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, name };
}

/**
 * @param {string} categoryId Firestore document id
 */
export async function deleteCategoryById(categoryId) {
  if (!firestore) {
    throw new Error("Firebase is not configured.");
  }
  const id = categoryId?.trim();
  if (!id) {
    throw new Error("Category id is required.");
  }
  await deleteDoc(doc(firestore, "categories", id));
}
