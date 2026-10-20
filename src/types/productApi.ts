export interface ProductApi {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  categoryId: number;
  categoryName: string;
}