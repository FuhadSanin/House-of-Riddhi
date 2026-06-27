import { v2 as cloudinary } from "cloudinary";

// Reads CLOUDINARY_URL from the environment (set in .env).
// Run: npm run cloudinary:onboard
if (!process.env.CLOUDINARY_URL) {
  console.error("Set CLOUDINARY_URL in .env before running this script.");
  process.exit(1);
}

const SAMPLE_IMAGE_URL =
  "https://res.cloudinary.com/demo/image/upload/sample.jpg";

async function main() {
  console.log("Uploading sample image from Cloudinary demo...\n");

  const upload = await cloudinary.uploader.upload(SAMPLE_IMAGE_URL);

  console.log("Upload complete:");
  console.log("  Secure URL:", upload.secure_url);
  console.log("  Public ID:", upload.public_id);
  console.log();

  const details = await cloudinary.api.resource(upload.public_id);

  console.log("Image metadata:");
  console.log("  Width:", details.width, "px");
  console.log("  Height:", details.height, "px");
  console.log("  Format:", details.format);
  console.log("  Bytes:", details.bytes);
  console.log();

  // f_auto — Cloudinary picks the best format for the browser (e.g. WebP/AVIF).
  // q_auto — Cloudinary balances quality and file size automatically.
  const transformedUrl = cloudinary.url(upload.public_id, {
    fetch_format: "auto",
    quality: "auto",
    secure: true,
  });

  console.log(
    "Done! Click link below to see optimized version of the image. Check the size and the format."
  );
  console.log(transformedUrl);
}

main().catch((err) => {
  console.error("Error:", err.message ?? err);
  process.exit(1);
});
