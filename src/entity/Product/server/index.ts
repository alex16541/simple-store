"use server";

import { sql } from "@/lib/server/db";
import { UpdateOrderFormState, UpdateOrderSchema } from "./formSchemas";
import { revalidatePath } from "next/cache";

export const updateProduct = async (
  _: UpdateOrderFormState,
  formData: FormData,
): Promise<UpdateOrderFormState> => {

  const validatedFields = UpdateOrderSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    brand: formData.get("brand"),
    category: formData.get("category"),
    stock: Number(formData.get("stock")),
  });

  if (!validatedFields.success) {
    return {
      message: `${validatedFields.error.issues[0].path} - ${validatedFields.error.issues[0].message}`,
      payload: formData,
    };
  }

  const product = validatedFields.data;

  await sql(`UPDATE products SET 
    name = '${product.name}',
    price = ${product.price},
    description = '${product.description}',
    category = '${product.category}',
    brand = '${product.brand}',
    stock = ${product.stock}
    WHERE id = ${product.id}`);

  revalidatePath(`/products/${product.id}`);

  return {message: 'Продукт был успешно обновлён', payload: formData};
};
