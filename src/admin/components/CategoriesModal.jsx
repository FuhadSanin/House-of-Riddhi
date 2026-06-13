import { useEffect, useState, useCallback } from "react";
import { Loader2, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategoriesQuery, useCategoryMutations } from "@/features/shop/use-shop-queries";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { fieldLabelClass, initialCategoryForm } from "@/admin/constants";

export function CategoriesModal({ open, onOpenChange }) {
  const [categoryForm, setCategoryForm] = useState(initialCategoryForm);
  const {
    data: categoryDocs = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorDetail,
    refetch: refetchCategories,
  } = useCategoriesQuery();
  const { saveCategoryMutation, deleteCategoryMutation } = useCategoryMutations();
  const categoryPending = saveCategoryMutation.isPending || deleteCategoryMutation.isPending;

  const closeModal = useCallback(() => {
    setCategoryForm(initialCategoryForm);
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  if (!open) return null;

  const clearCategoryForm = () => setCategoryForm(initialCategoryForm);

  const fillCategoryForEdit = (c) => {
    setCategoryForm({
      id: c.id,
      name: c.name,
    });
  };

  const onCategoryFormChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm((p) => ({ ...p, [name]: value }));
  };

  const onSaveCategory = async (e) => {
    e.preventDefault();
    try {
      await saveCategoryMutation.mutateAsync({
        id: categoryForm.id.trim() || undefined,
        name: categoryForm.name,
      });
      toast.success(categoryForm.id ? "Category updated" : "Category added");
      clearCategoryForm();
    } catch (err) {
      toast.error(err.message || "Could not save category");
    }
  };

  const onDeleteCategoryDoc = async (c) => {
    if (!window.confirm(`Delete category “${c.name}”?`)) return;
    try {
      await deleteCategoryMutation.mutateAsync(c.id);
      toast.success("Category deleted");
      if (categoryForm.id === c.id) clearCategoryForm();
    } catch (err) {
      toast.error(err.message || "Could not delete category");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center" aria-modal="true" role="dialog" aria-labelledby="categories-modal-title">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Close categories"
        onClick={closeModal}
      />
      <div className="relative flex max-h-[min(90svh,720px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-premium">
        <div className="flex items-start justify-between gap-3 border-b border-border bg-muted/30 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h2 id="categories-modal-title" className="text-base font-semibold text-foreground">
              Store categories
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Firestore collection{" "}
              <code className="rounded border border-border bg-muted/80 px-1 py-0.5 font-mono text-[10px]">categories</code>
              — used for shop filters and product category options.
            </p>
          </div>
          <Button type="button" variant="ghost" size="icon" className="shrink-0 rounded-md" onClick={closeModal} aria-label="Close">
            <X className="size-5" />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          {categoriesError ? (
            <div className="mb-4 flex flex-col gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 sm:flex-row sm:items-center sm:justify-between" role="alert">
              <p className="text-sm text-destructive">{categoriesErrorDetail?.message || "Could not load categories."}</p>
              <Button type="button" variant="outline" size="sm" className="shrink-0 rounded-md" onClick={() => refetchCategories()}>
                Retry
              </Button>
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-5">
            <form className="space-y-4 lg:col-span-2" onSubmit={onSaveCategory}>
              <p className={cn(fieldLabelClass)}>Add or edit</p>
              {categoryForm.id ? (
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Document ID</span>
                  <p className="mt-1 break-all rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs">{categoryForm.id}</p>
                </div>
              ) : null}
              <div>
                <label htmlFor="modal-cat-name" className="text-sm font-medium text-foreground">
                  Display name
                </label>
                <Input
                  id="modal-cat-name"
                  name="name"
                  value={categoryForm.name}
                  onChange={onCategoryFormChange}
                  className="mt-1.5 shadow-sm"
                  placeholder="e.g. Keychains"
                  required
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="submit" size="sm" disabled={categoryPending} className="gap-2 rounded-md shadow-sm">
                  {categoryPending && <Loader2 className="size-3.5 animate-spin" aria-hidden />}
                  {categoryForm.id ? "Update category" : "Add category"}
                </Button>
                {categoryForm.id ? (
                  <Button type="button" variant="outline" size="sm" onClick={clearCategoryForm} disabled={categoryPending} className="rounded-md shadow-sm">
                    New category
                  </Button>
                ) : null}
              </div>
            </form>

            <div className="lg:col-span-3">
              <p className={cn(fieldLabelClass, "mb-2")}>All categories</p>
              {categoriesLoading ? (
                <div className="space-y-2 py-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md border border-border px-3 py-2.5">
                      <div className="space-y-1.5">
                        <div className="h-3.5 w-28 animate-pulse rounded bg-muted" />
                        <div className="h-2.5 w-20 animate-pulse rounded bg-muted" />
                      </div>
                      <div className="flex gap-1.5">
                        <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
                        <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : categoryDocs.length === 0 ? (
                <p className="rounded-md border border-dashed border-border bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
                  No categories yet. Add one using the form.
                </p>
              ) : (
                <ul className="max-h-[min(20rem,40svh)] divide-y divide-border overflow-y-auto rounded-md border border-border lg:max-h-[min(28rem,50svh)]">
                  {categoryDocs.map((c) => (
                    <li key={c.id} className="flex flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="font-mono text-[11px] text-muted-foreground">{c.id}</p>
                      </div>
                      <div className="flex shrink-0 gap-1.5">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-md px-2.5"
                          onClick={() => fillCategoryForEdit(c)}
                          disabled={categoryPending}
                          aria-label={`Edit ${c.name}`}
                        >
                          <Pencil className="size-3.5" aria-hidden />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-md border-destructive/30 px-2.5 text-destructive hover:bg-destructive/10"
                          onClick={() => onDeleteCategoryDoc(c)}
                          disabled={categoryPending}
                          aria-label={`Delete ${c.name}`}
                        >
                          <Trash2 className="size-3.5" aria-hidden />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
