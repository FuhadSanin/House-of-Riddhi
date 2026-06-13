import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/api/query-keys";
import { deleteCategoryById, fetchCategories, saveCategory } from "@/api/categories-api";
import { createOrUpdateProduct, deleteProductById, fetchProducts } from "@/api/products-api";
import { fetchOrders, updateOrderStatus } from "@/api/orders-api";

export function useProductsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: fetchProducts,
    staleTime: 30_000,
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: fetchCategories,
    staleTime: 60_000,
  });
}

/** Sorted display names from `fetchCategories` results only. */
export function categoryNamesFromDocs(categoryDocs) {
  return (categoryDocs ?? [])
    .map((c) => c.name)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

export function useOrdersQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.orders,
    queryFn: fetchOrders,
    staleTime: 15_000,
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.orders }),
  });
}

export function useInvalidateShopQueries() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: QUERY_KEYS.products });
    qc.invalidateQueries({ queryKey: QUERY_KEYS.categories });
  };
}

export function useProductMutations() {
  const invalidate = useInvalidateShopQueries();

  const saveProduct = useMutation({
    mutationFn: createOrUpdateProduct,
    onSuccess: invalidate,
  });

  const deleteProduct = useMutation({
    mutationFn: deleteProductById,
    onSuccess: invalidate,
  });

  return { saveProduct, deleteProduct };
}

export function useCategoryMutations() {
  const qc = useQueryClient();
  const invalidateCategories = () => qc.invalidateQueries({ queryKey: QUERY_KEYS.categories });

  const saveCategoryMutation = useMutation({
    mutationFn: saveCategory,
    onSuccess: invalidateCategories,
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategoryById,
    onSuccess: invalidateCategories,
  });

  return { saveCategoryMutation, deleteCategoryMutation };
}
