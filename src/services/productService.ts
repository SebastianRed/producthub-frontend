import api from "../api/axios";
import type { Page } from "../types/page";
import type { ProductApi } from "../types/productApi";

export interface ProductFilters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  stockMin?: number;
  active?: boolean;
}

export interface ProductQueryParams {
  page?: number;
  size?: number;
  sort?: string;
  filters?: ProductFilters;
}

export async function getProducts({
  page = 0,
  size = 10,
  sort = "name,asc",
  filters = {},
}: ProductQueryParams = {}): Promise<Page<ProductApi>> {
  const response = await api.get<Page<ProductApi>>("/products", {
    params: {
      page,
      size,
      sort,
      ...filters,
    },
  });

  return response.data;
}