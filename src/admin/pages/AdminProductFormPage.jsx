import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  categoryNamesFromDocs,
  useCategoriesQuery,
  useProductMutations,
  useProductsQuery,
} from "@/features/shop/use-shop-queries";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ArrowLeft, Loader2, Plus, Trash2, UploadCloud } from "lucide-react";
import { AdminImagePreview } from "@/admin/components/AdminImagePreview";
import { fieldLabelClass, initialForm, newGalleryEntry } from "@/admin/constants";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

export function AdminProductFormPage() {
  const { productId } = useParams();
  const isNew = productId === undefined;
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [missing, setMissing] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [galleryUploading, setGalleryUploading] = useState({});
  const [galleryUploadProgress, setGalleryUploadProgress] = useState({});
  const imageFileRef = useRef(null);
  const galleryFileRefs = useRef({});

  const { data: products = [], isLoading, isError, error, refetch } = useProductsQuery();
  const { data: categoryDocs = [] } = useCategoriesQuery();
  const { saveProduct } = useProductMutations();
  const pending = saveProduct.isPending;

  const apiCategoryNames = useMemo(() => categoryNamesFromDocs(categoryDocs), [categoryDocs]);
  const formCategoryOptions = apiCategoryNames;

  /** Keep legacy product category visible in the list if it is not in Firestore categories. */
  const categorySelectOptions = useMemo(() => {
    const c = form.category?.trim();
    if (c && !formCategoryOptions.includes(c)) return [c, ...formCategoryOptions];
    return formCategoryOptions;
  }, [form.category, formCategoryOptions]);

  /* eslint-disable react-hooks/set-state-in-effect -- form follows URL + async Firestore products */
  useEffect(() => {
    if (isNew) {
      setForm(initialForm);
      setStatus({ type: "", message: "" });
      setMissing(false);
      return;
    }
    if (isLoading) return;
    const p = products.find((x) => x.id === productId);
    if (!p) {
      setMissing(true);
      setForm(initialForm);
      setStatus({ type: "", message: "" });
      return;
    }
    setMissing(false);
    const g = Array.isArray(p.gallery) ? p.gallery.filter(Boolean) : [];
    setForm({
      name: p.name ?? "",
      price: String(p.price ?? ""),
      category: p.category ?? "",
      badge: p.badge ?? "",
      image: p.image ?? "",
      galleryEntries: g.length ? g.map((url) => newGalleryEntry(url)) : [],
      description: p.description ?? "",
    });
    setStatus({ type: "info", message: `Editing “${p.name}” — change fields and save.` });
  }, [isNew, productId, products, isLoading]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are accepted");
      return;
    }
    setImageUploading(true);
    setImageUploadProgress(0);
    try {
      const { url } = await uploadToCloudinary(file, {
        folder: "products",
        onProgress: setImageUploadProgress,
      });
      setForm((prev) => ({ ...prev, image: url }));
      toast.success("Image uploaded", { description: "URL has been filled in automatically." });
    } catch (err) {
      toast.error("Upload failed", { description: err.message });
    } finally {
      setImageUploading(false);
      setImageUploadProgress(0);
      if (imageFileRef.current) imageFileRef.current.value = "";
    }
  };

  const onGalleryFileChange = async (entryId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are accepted");
      return;
    }
    setGalleryUploading((prev) => ({ ...prev, [entryId]: true }));
    setGalleryUploadProgress((prev) => ({ ...prev, [entryId]: 0 }));
    try {
      const { url } = await uploadToCloudinary(file, {
        folder: "products",
        onProgress: (pct) =>
          setGalleryUploadProgress((prev) => ({ ...prev, [entryId]: pct })),
      });
      setGalleryRow(entryId, url);
      toast.success("Gallery image uploaded");
    } catch (err) {
      toast.error("Upload failed", { description: err.message });
    } finally {
      setGalleryUploading((prev) => ({ ...prev, [entryId]: false }));
      setGalleryUploadProgress((prev) => ({ ...prev, [entryId]: 0 }));
      const ref = galleryFileRefs.current[entryId];
      if (ref) ref.value = "";
    }
  };

  const clearForm = () => {
    setForm(initialForm);
    setStatus({ type: "", message: "" });
  };

  const onSave = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    if (!form.category?.trim()) {
      toast.error("Select a category");
      return;
    }
    if (isNew && formCategoryOptions.length === 0) {
      toast.error("Add categories first", {
        description: "Open Categories in the header and create at least one category.",
      });
      return;
    }
    if (isNew && !formCategoryOptions.includes(form.category.trim())) {
      toast.error("Select a category from the list");
      return;
    }
    try {
      const gallery = form.galleryEntries.map((ent) => ent.url.trim()).filter(Boolean);
      await saveProduct.mutateAsync({
        ...form,
        id: isNew ? undefined : productId,
        price: Number(form.price),
        gallery,
      });
      toast.success("Product saved", { description: "Catalog updated." });
      navigate("/admin/products");
    } catch (err) {
      toast.error("Save failed", { description: err.message || "Could not save product." });
    }
  };

  const addGalleryRow = () => {
    setForm((p) => ({ ...p, galleryEntries: [...p.galleryEntries, newGalleryEntry()] }));
  };

  const removeGalleryRow = (id) => {
    setForm((p) => ({ ...p, galleryEntries: p.galleryEntries.filter((e) => e.id !== id) }));
  };

  const setGalleryRow = (id, value) => {
    setForm((p) => ({
      ...p,
      galleryEntries: p.galleryEntries.map((e) => (e.id === id ? { ...e, url: value } : e)),
    }));
  };

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-6 text-center" role="alert">
        <p className="text-sm text-destructive">{error?.message || "Could not load catalog."}</p>
        <Button type="button" variant="outline" size="sm" className="mt-4 rounded-md" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (!isNew && !isLoading && missing) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <h2 className="font-display text-xl font-semibold">Product not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">No product with id “{productId}”.</p>
        <Link
          to="/admin/products"
          className={cn(buttonVariants({ variant: "default", size: "sm" }), "mt-6 inline-flex no-underline")}
        >
          Back to inventory
        </Link>
      </div>
    );
  }

  if (!isNew && isLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-48 w-full animate-pulse rounded-lg bg-muted" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-full animate-pulse rounded-md bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/admin/products"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "inline-flex w-fit gap-2 px-0 text-muted-foreground hover:text-foreground no-underline"
          )}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to inventory
        </Link>
      </div>

      {status.message && status.type === "info" ? (
        <div
          className={cn(
            "mb-6 rounded-md border border-border bg-card px-4 py-3 text-sm shadow-sm",
            "border-l-4 border-l-primary"
          )}
          role="status"
        >
          {status.message}
        </div>
      ) : null}

      <form
        onSubmit={onSave}
        className="mx-auto max-w-2xl space-y-6 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6"
      >
        <div className="border-b border-border pb-4">
          <h2 className="text-sm font-semibold text-foreground">{isNew ? "New product" : "Edit product"}</h2>
          <p className="mt-1 text-xs text-muted-foreground">Required fields are marked. Save returns to inventory.</p>
        </div>

        <div className="rounded-md border border-border bg-muted/20 p-4">
          <p className={cn(fieldLabelClass, "mb-3")}>Primary image</p>
          <AdminImagePreview src={form.image} alt={form.name || "Product"} size="lg" />
          <div className="mt-4">
            <label className="text-sm font-medium text-foreground" htmlFor="admin-image">
              Main image URL
            </label>
            <div className="mt-1.5 flex gap-2">
              <Input
                id="admin-image"
                name="image"
                value={form.image}
                onChange={onFieldChange}
                placeholder="https://… or upload via button →"
                className="font-mono text-xs shadow-sm sm:text-sm"
                required
                autoComplete="off"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0 gap-1.5"
                disabled={imageUploading}
                onClick={() => imageFileRef.current?.click()}
              >
                {imageUploading ? (
                  <Loader2 className="size-3.5 animate-spin" aria-hidden />
                ) : (
                  <UploadCloud className="size-3.5" aria-hidden />
                )}
                {imageUploading ? "Uploading…" : "Upload"}
              </Button>
              <input
                ref={imageFileRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={onImageFileChange}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Paste a direct URL <span className="font-medium text-foreground/80">or</span> upload from your device — URL fills in automatically.
            </p>
            {imageUploading && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{imageUploadProgress === 0 ? "Compressing…" : "Uploading image…"}</span>
                  {imageUploadProgress > 0 && <span>{imageUploadProgress}%</span>}
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  {imageUploadProgress === 0 ? (
                    <div className="h-full w-full animate-pulse rounded-full bg-primary/50" />
                  ) : (
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-200"
                      style={{ width: `${imageUploadProgress}%` }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <fieldset className="space-y-4 border-0 p-0">
          <legend className={cn(fieldLabelClass, "mb-3 block w-full border-b border-border pb-2")}>General</legend>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="admin-name">
              Display name
            </label>
            <Input
              id="admin-name"
              name="name"
              value={form.name}
              onChange={onFieldChange}
              placeholder="Robot Keychain"
              className="mt-1.5 shadow-sm"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="admin-price">
                Price (INR)
              </label>
              <Input
                id="admin-price"
                name="price"
                type="number"
                min="0"
                step="1"
                value={form.price}
                onChange={onFieldChange}
                className="mt-1.5 shadow-sm tabular-nums"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground" htmlFor="admin-category">
                Category
              </label>
              <Select
                value={form.category}
                onValueChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger id="admin-category" className="mt-1.5 shadow-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categorySelectOptions.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formCategoryOptions.length === 0 ? (
                <p className="mt-1.5 text-xs text-muted-foreground">Add categories from the header (Categories) before publishing.</p>
              ) : null}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="admin-badge">
              Badge <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <Input
              id="admin-badge"
              name="badge"
              value={form.badge}
              onChange={onFieldChange}
              placeholder="New, Best seller…"
              className="mt-1.5 shadow-sm"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4 border-0 border-t border-border pt-6">
          <legend className={cn(fieldLabelClass, "mb-1 block w-full border-b border-border pb-2")}>Gallery</legend>
          <p className="text-xs text-muted-foreground">Add extra photos for the product page carousel. Each row is one URL.</p>
          <div className="space-y-3">
            {form.galleryEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="flex flex-col gap-2 rounded-lg border border-border/80 bg-muted/15 p-3 sm:flex-row sm:items-start sm:gap-3"
              >
                <AdminImagePreview src={entry.url} alt="" size="sm" className="mx-auto shrink-0 sm:mx-0" />
                <div className="min-w-0 flex-1">
                  <label className="sr-only" htmlFor={`admin-gallery-${entry.id}`}>
                    Gallery image URL {index + 1}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id={`admin-gallery-${entry.id}`}
                      value={entry.url}
                      onChange={(e) => setGalleryRow(entry.id, e.target.value)}
                      placeholder="Paste URL or upload →"
                      className="font-mono text-xs shadow-sm sm:text-sm"
                      autoComplete="off"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-9 shrink-0 gap-1.5"
                      disabled={galleryUploading[entry.id]}
                      onClick={() => galleryFileRefs.current[entry.id]?.click()}
                      aria-label={`Upload gallery image ${index + 1}`}
                    >
                      {galleryUploading[entry.id] ? (
                        <Loader2 className="size-3.5 animate-spin" aria-hidden />
                      ) : (
                        <UploadCloud className="size-3.5" aria-hidden />
                      )}
                    </Button>
                    <input
                      ref={(el) => { galleryFileRefs.current[entry.id] = el; }}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => onGalleryFileChange(entry.id, e)}
                    />
                  </div>
                  {galleryUploading[entry.id] && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{(galleryUploadProgress[entry.id] ?? 0) === 0 ? "Compressing…" : "Uploading…"}</span>
                        {(galleryUploadProgress[entry.id] ?? 0) > 0 && <span>{galleryUploadProgress[entry.id]}%</span>}
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        {(galleryUploadProgress[entry.id] ?? 0) === 0 ? (
                          <div className="h-full w-full animate-pulse rounded-full bg-primary/50" />
                        ) : (
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-200"
                            style={{ width: `${galleryUploadProgress[entry.id]}%` }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 shrink-0 border-destructive/25 text-destructive hover:bg-destructive/10"
                  onClick={() => removeGalleryRow(entry.id)}
                  aria-label={`Remove gallery image ${index + 1}`}
                >
                  <Trash2 className="size-3.5" aria-hidden />
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="secondary" size="sm" className="gap-1.5 rounded-md shadow-sm" onClick={addGalleryRow}>
            <Plus className="size-3.5" aria-hidden />
            Add gallery image
          </Button>
        </fieldset>

        <fieldset className="space-y-4 border-0 border-t border-border pt-6">
          <legend className={cn(fieldLabelClass, "mb-1 block w-full border-b border-border pb-2")}>Description</legend>
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="admin-description">
              Store listing copy
            </label>
            <Textarea
              id="admin-description"
              name="description"
              value={form.description}
              onChange={onFieldChange}
              className="mt-1.5 min-h-[120px] shadow-sm"
              required
            />
          </div>
        </fieldset>

        <div className="flex flex-wrap gap-2 border-t border-border pt-6">
          <Button type="submit" disabled={pending} size="sm" className="min-w-[7rem] rounded-md px-5 shadow-sm">
            {pending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />}
            Save changes
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => (isNew ? clearForm() : navigate("/admin/products"))} disabled={pending} className="rounded-md shadow-sm">
            {isNew ? "Reset form" : "Cancel"}
          </Button>
        </div>
      </form>
    </>
  );
}
