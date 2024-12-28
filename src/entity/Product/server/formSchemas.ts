import { FormState } from "@/shared/types";
import { z } from "zod";

export type UpdateOrderFormState = FormState<{
  id: string[];
  name: string[];
  description: string[];
  price: string[];
  brand: string[];
  category: string[];
  stock: string[];
}>;

export const UpdateOrderSchema = z.object({
  id: z.string(),
  name: z.string().max(255).min(1).trim(),
  description: z.string().max(255).trim(),
  price: z.number().gte(0, 'Price - должно быть положительным числом'),
  brand: z.string().max(255).trim(),
  category: z.string().max(255).trim(),
  stock: z.number().gte(0, 'Stock - дложно быть положительным числом').int('Stock - должно быть целым числом'),
});
