import { Product } from "@/entity/Product";

export interface CartProduct {
  productData: Product;
  quantity: number;
}
