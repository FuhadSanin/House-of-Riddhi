import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

const TO_EMAIL = "totoysweb@gmail.com";

export async function submitContactMessage({ name, email, message }) {
  if (!firestore) {
    throw new Error("Firebase is not configured. Add VITE_FIREBASE_* values.");
  }

  // Write to the `mail` collection. The Firebase "Trigger Email" extension
  // watches this collection and sends the email automatically.
  await addDoc(collection(firestore, "mail"), {
    to: [TO_EMAIL],
    message: {
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    },
    createdAt: serverTimestamp(),
  });
}
