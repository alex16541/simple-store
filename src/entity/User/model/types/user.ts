import { CartProduct } from "./cart";

export type UserRole = "customer" | "manager" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface UserSchema {
  user?: User;
  cart: CartProduct[];
}
