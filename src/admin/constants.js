export const initialForm = {
  name: "",
  price: "",
  category: "",
  badge: "",
  image: "",
  galleryEntries: [],
  description: "",
};

export const initialCategoryForm = { id: "", name: "" };

export function newGalleryEntry(url = "") {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `g-${Math.random().toString(36).slice(2, 11)}`;
  return { id, url };
}

export const selectClass =
  "mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const fieldLabelClass = "text-xs font-medium uppercase tracking-wide text-muted-foreground";
