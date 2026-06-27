import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

export const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "dri0818tj";

export const cld = new Cloudinary({ cloud: { cloudName } });

/**
 * Returns a Cloudinary image instance with auto format, auto quality, and
 * optional width/height crop applied. Use with <AdvancedImage cldImg={img} />.
 *
 * @param {string} publicId   - Cloudinary public_id (e.g. "products/abc123")
 * @param {{ width?: number, height?: number }} [opts]
 */
export function getCldImage(publicId, { width = 500, height = 500 } = {}) {
  return cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(width).height(height));
}

/**
 * Build a plain Cloudinary delivery URL from a public_id string.
 * Useful when you only have the public_id stored in Firestore.
 *
 * @param {string} publicId
 * @param {{ width?: number, height?: number, crop?: string }} [opts]
 * @returns {string}
 */
export function cldUrl(publicId, { width, height, crop = "fill" } = {}) {
  const transforms = [
    "f_auto",
    "q_auto",
    width && `w_${width}`,
    height && `h_${height}`,
    (width || height) && `c_${crop}`,
  ]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`;
}
