import { Product } from "@/entity/Product";

export interface UserSchema {
  cart: { productData: Product; quantity: number }[];
}
