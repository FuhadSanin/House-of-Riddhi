import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryNamesFromDocs, useCategoriesQuery, useProductMutations, useProductsQuery } from "@/features/shop/use-shop-queries";
import { toast } from "sonner";
import { LayoutGrid, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AdminImagePreview } from "@/admin/components/AdminImagePreview";
import { cn } from "@/lib/utils";

export function AdminProductsListPage() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: products = [], isLoading, isError, error, refetch, isFetching } = useProductsQuery();
  const { data: categoryDocs = [] } = useCategoriesQuery();
  const { deleteProduct } = useProductMutations();

  const apiCategoryNames = useMemo(() => categoryNamesFromDocs(categoryDocs), [categoryDocs]);

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.name.localeCompare(b.name)),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortedProducts.filter((p) => {
      if (categoryFilter !== "all" && (p.category || "General") !== categoryFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
      );
    });
  }, [sortedProducts, query, categoryFilter]);

  const onDelete = async (productId) => {
    if (!window.confirm(`Delete product “${productId}”? This cannot be undone.`)) return;
    try {
      await deleteProduct.mutateAsync(productId);
      toast.success("Product deleted", { description: productId });
    } catch (err) {
      toast.error("Delete failed", { description: err.message || "Could not delete product." });
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Product inventory</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Search, filter, and open a product to edit.</p>
        </div>
        <Link
          to="/admin/products/new"
          className={cn(buttonVariants({ size: "sm" }), "inline-flex h-9 gap-2 rounded-md shadow-sm no-underline")}
        >
          <Plus className="size-3.5" aria-hidden />
          New product
        </Link>
      </div>

      {isError ? (
        <div
          className="mb-8 flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          role="alert"
        >
          <p className="text-sm text-destructive">{error?.message || "Could not load catalog."}</p>
          <Button type="button" variant="outline" size="sm" className="shrink-0 rounded-md" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border bg-muted/30 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <LayoutGrid className="size-4 text-muted-foreground" aria-hidden />
            Inventory
            <span className="font-normal text-muted-foreground">· {filteredProducts.length} items</span>
            {isFetching && !isLoading ? (
              <Loader2 className="ml-2 size-3.5 animate-spin text-muted-foreground" aria-hidden />
            ) : null}
          </h3>
        </div>

        <div className="border-b border-border bg-card px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, SKU, or category"
                className="h-9 rounded-md border-border pl-9 text-sm shadow-sm"
                aria-label="Search products"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm sm:w-44"
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {apiCategoryNames.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ul className="divide-y divide-border">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex gap-3 px-4 py-3 sm:items-center sm:px-5">
                <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-2/5 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                </div>
                <div className="flex gap-1.5">
                  <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
                  <div className="h-8 w-8 animate-pulse rounded-md bg-muted" />
                </div>
              </li>
            ))
          ) : (
            filteredProducts.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 px-4 py-3 transition-colors hover:bg-muted/40 sm:items-center sm:px-5"
              >
                <AdminImagePreview src={item.image} alt="" size="sm" className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug text-foreground">{item.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    <span className="font-mono text-[11px]">{item.id}</span>
                    <span className="mx-1.5 text-border">|</span>
                    <span className="tabular-nums">INR {item.price}</span>
                    {item.category ? (
                      <>
                        <span className="mx-1.5 text-border">|</span>
                        {item.category}
                      </>
                    ) : null}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <Link
                    to={`/admin/products/${encodeURIComponent(item.id)}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "inline-flex h-8 rounded-md px-2.5 no-underline"
                    )}
                    aria-label={`Edit ${item.name}`}
                  >
                    <Pencil className="size-3.5" aria-hidden />
                  </Link>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-md border-destructive/30 px-2.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => onDelete(item.id)}
                    disabled={deleteProduct.isPending || isLoading}
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 className="size-3.5" aria-hidden />
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>

        {!isLoading && !filteredProducts.length ? (
          <div className="px-4 py-12 text-center sm:px-5">
            <p className="text-sm text-muted-foreground">
              {sortedProducts.length ? "No products match your filters." : "No products yet."}
            </p>
            <Link
              to="/admin/products/new"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 inline-flex rounded-md no-underline")}
            >
              Create product
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}
