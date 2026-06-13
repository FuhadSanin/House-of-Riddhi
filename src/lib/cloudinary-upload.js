import { cloudName } from "@/lib/cloudinary";

const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const TARGET_SIZE_BYTES = 100 * 1024; // 100 KB
const WEBP_QUALITY = 0.92;
const SCALE_STEP = 0.9; // shrink by 10% each iteration

/**
 * Compress an image File to under 100 KB and convert it to WebP.
 * Keeps quality fixed at a high value and scales dimensions down instead.
 *
 * @param {File} file
 * @returns {Promise<File>}
 */
export async function compressToWebP(file) {
  const bitmap = await createImageBitmap(file);
  let width = bitmap.width;
  let height = bitmap.height;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let blob;

  do {
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    blob = await new Promise((res) => canvas.toBlob(res, "image/webp", WEBP_QUALITY));
    if (blob.size <= TARGET_SIZE_BYTES) break;
    width *= SCALE_STEP;
    height *= SCALE_STEP;
  } while (true);

  bitmap.close();

  const baseName = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}

/**
 * Upload a File to Cloudinary using an unsigned upload preset.
 * The file is automatically compressed to ≤ 100 KB and converted to WebP first.
 *
 * @param {File} file
 * @param {{ folder?: string, onProgress?: (pct: number) => void }} [opts]
 * @returns {Promise<{ url: string, publicId: string, width: number, height: number }>}
 */
export async function uploadToCloudinary(file, { folder = "uploads", onProgress } = {}) {
  if (!uploadPreset) {
    throw new Error(
      "VITE_CLOUDINARY_UPLOAD_PRESET is not set. " +
        "Create an unsigned upload preset in your Cloudinary dashboard and add it to .env."
    );
  }

  const webpFile = await compressToWebP(file);

  const formData = new FormData();
  formData.append("file", webpFile);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  // Use XMLHttpRequest so we can track upload progress.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      });
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve({
          url: data.secure_url,
          publicId: data.public_id,
          width: data.width,
          height: data.height,
        });
      } else {
        let msg = `Cloudinary upload failed (${xhr.status})`;
        try {
          const err = JSON.parse(xhr.responseText);
          if (err?.error?.message) msg = err.error.message;
        } catch {}
        reject(new Error(msg));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}
