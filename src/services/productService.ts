import api from "../api/axios";
import type { Page } from "../types/page";
import type { ProductApi } from "../types/productApi";

export async function getProducts(): Promise<Page<ProductApi>> {
  const response = await api.get<Page<ProductApi>>("/api/products");

  return response.data;
}