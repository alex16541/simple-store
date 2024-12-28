"use server";
import { sql } from "@/lib/server/db";
import { Order } from "../model/types/order";
import { CartProduct } from "@/entity/User";
import { DetailedAddress } from "@/entity/Address";
import { PaymentType } from "@/features/PaymentTypeSelect";

export const fetchUserOrders = async (userId: number | string) => {
  const data = await sql(
    `SELECT id, created_at as "createdAt", total_price as "totalPrice", status FROM orders WHERE user_id = ${userId}`,
  );

  return data as Order[];
};

export const fetchManagerOrders = async () => {
  const data = await sql(
    `SELECT id, created_at as "createdAt", updated_at as "updatedAt", total_price as "totalPrice", status FROM orders WHERE status != 'delivered' ORDER BY updated_at ASC`,
  );

  return data as Order[];
};

export const fetchOrder = async (
  userId: string | number | null,
  orderId: string | number,
) => {
  const userIdFilter = userId ? `AND user_id = ${userId}` : "";
  const data = await sql(
    `SELECT 
    id, 
    status,
    total_price AS "totalPrice",
    payment_method AS "paymentMethod",
    address,
    created_at as "createdAt", 
    updated_at as "updatedAt" 
    FROM orders 
    WHERE id = ${orderId} ` + userIdFilter,
  );

  return data as Order[];
};

export const fetchOrderItems = async (orderId: string | number) => {
  const data = await sql(`SELECT 
    oi.id,
    oi.product_id AS "productId",
    oi.quantity,
    oi.unit_price AS "unitPrice",
    oi.total_price AS "totalPrice",
    jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'description', p.description,
      'category', p.category,
      'price', p.price,
      'brand', p.brand
    ) AS "productData"
  FROM 
    order_items oi
  JOIN 
    products p ON oi.product_id = p.id
  WHERE oi.order_id = ${orderId}
`);

  return data as CartProduct[];
};

const paymentTypeToPaymentMethod: Record<PaymentType, string> = {
  cash: "cash",
  card_online: "card_online",
  card_offline: "card_offline",
};

export const createOrder = async (
  userId: string | number,
  address: DetailedAddress,
  paymentType: PaymentType,
  totalPrice: number,
) => {
  const values = `(
    ${userId}, 
    '${JSON.stringify(address)}', 
    '${paymentType === "card_online" ? "paid" : "pending"}', 
    ${totalPrice},
    '${paymentTypeToPaymentMethod[paymentType]}')`;

  const query = `INSERT INTO orders (user_id, address, status, total_price, payment_method) 
  VALUES ${values}
  RETURNING id`;

  const data = await sql(query);

  return data;
};

export const addProductsToOrderItemsTable = async (
  orderId: number | string,
  products: CartProduct[],
) => {
  const strings: string[] = [];

  products.forEach((p) => {
    const { productData: product, quantity } = p;
    const { id: productId, price } = product;
    const totalProductPrice = quantity * Number(price);

    const string = `(${orderId}, ${productId}, ${quantity}, ${price}, ${totalProductPrice})`;

    strings.push(string);
  });

  const data =
    await sql(`INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES ${strings.join(" ,")}
`);

  return data;
};

export const updateProductsInStock = async (
  products: CartProduct[],
  action: "-" | "+" = "-",
) => {
  const promises: Promise<unknown>[] = [];

  products.forEach((p) => {
    const promise = sql(
      `UPDATE products 
      SET stock = stock ${action} ${p.quantity} 
      WHERE id = ${p.productData.id}`,
    );

    promises.push(promise);
  });

  await Promise.all(promises);
};
