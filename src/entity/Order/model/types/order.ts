import { CartProduct } from "@/entity/User";

export type OrderStatus = "pending" | "paid" | "delivired" | "cancelled";
export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  items: CartProduct[];
  totalPrice: string;
}
