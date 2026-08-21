import { apiFetch } from "./apiClient";

export interface ProductListItem {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
}

interface ProductIngredient {
  id: number;
  productId: number;
  ingredientId: number;
  unitId: number;
  amount: number;
  orderNum: number;
  ingredients: { title: string };
  units: { name: string; abbreviation: string };
}

export interface ProductDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  procedure: string;
  durationInMinutes: number;
  amount: number;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productIngredients: ProductIngredient[];
}

export async function getProductList(): Promise<ProductListItem[]> {
  return apiFetch<ProductListItem[]>("/products");
}

export async function getProductById(
  id: number | string,
): Promise<ProductDetail> {
  return apiFetch<ProductDetail>(`/products/${id}`);
}
