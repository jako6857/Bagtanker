import { apiFetch } from "./apiClient";

export interface CategoryListItem {
  id: number;
  title: string;
  slug: string;
  description: string;
}

interface CategoryProductItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface CategoryDetail extends CategoryListItem {
  categoryProducts: { products: CategoryProductItem }[];
}

export async function getCategoryList(): Promise<CategoryListItem[]> {
  return apiFetch<CategoryListItem[]>("/categories");
}

export async function getCategoryDetail(slug: string): Promise<CategoryDetail> {
  return apiFetch<CategoryDetail>(`/categories/${slug}`);
}
