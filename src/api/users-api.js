import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const USERS_COLLECTION = "users";

/**
 * Create a new Firebase Auth user via the REST API (does NOT sign out the
 * currently logged-in admin).  Metadata is also stored in Firestore so we
 * can list users without the Admin SDK.
 *
 * @param {{ email: string, password: string, displayName?: string }} params
 */
export async function createAdminUser({ email, password, displayName = "" }) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: false }),
    }
  );

  const data = await res.json();
  const code = data?.error?.message ?? "";

  if (!res.ok && !code.startsWith("EMAIL_EXISTS")) {
    throw new Error(firebaseRestError(code));
  }

  const uid = data.localId ?? null;
  const alreadyExisted = code.startsWith("EMAIL_EXISTS");

  // Store metadata in Firestore for listing.
  // If the user already existed in Firebase Auth we still save the record so
  // they appear in the list (use addDoc so we don't need the UID).
  if (uid) {
    await setDoc(doc(firestore, USERS_COLLECTION, uid), {
      uid,
      email,
      displayName: displayName.trim() || null,
      createdAt: serverTimestamp(),
    }, { merge: true });
  } else {
    await addDoc(collection(firestore, USERS_COLLECTION), {
      uid: null,
      email,
      displayName: displayName.trim() || null,
      createdAt: serverTimestamp(),
    });
  }

  return { uid, email, displayName, alreadyExisted };
}

/**
 * List all admin users stored in Firestore.
 * @returns {Promise<Array>}
 */
export async function listAdminUsers() {
  const q = query(
    collection(firestore, USERS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Update the displayName of an admin user's Firestore record.
 * @param {string} docId  Firestore document ID
 * @param {string} displayName
 */
export async function updateAdminUserName(docId, displayName) {
  await updateDoc(doc(firestore, USERS_COLLECTION, docId), {
    displayName: displayName.trim() || null,
  });
}

/**
 * Delete a user's Firestore metadata record.
 * (Full Auth deletion requires the Admin SDK / Cloud Function.)
 * @param {string} uid
 */
export async function deleteAdminUserRecord(uid) {
  await deleteDoc(doc(firestore, USERS_COLLECTION, uid));
}

function firebaseRestError(code) {
  switch (code) {
    case "EMAIL_EXISTS":
      return "A user with this email already exists.";
    case "INVALID_EMAIL":
      return "Please enter a valid email address.";
    case "WEAK_PASSWORD : Password should be at least 6 characters":
    case "WEAK_PASSWORD":
      return "Password must be at least 6 characters.";
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      return "Too many attempts. Please try again later.";
    case "OPERATION_NOT_ALLOWED":
      return "Email/password sign-in is not enabled in Firebase.";
    default:
      return `Could not create user (${code}).`;
  }
}
