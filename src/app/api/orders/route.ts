import { DetailedAddress } from "@/entity/Address";
import { Product } from "@/entity/Product";
import { PaymentType } from "@/features/PaymentTypeSelect";
import { sql } from "@/lib/server/db";
import { NextRequest } from "next/server";

const paymentTypeToPaymentMethod: Record<PaymentType, string> = {
  cash: "cash",
  card_online: "card_online",
  card_offline: "card_offline",
};

const createOrder = async (
  address: DetailedAddress,
  paymentType: PaymentType,
  totalPrice: number,
) => {
  const data =
    await sql(`INSERT INTO orders (user_id, address, total_price, payment_method) 
VALUES (
${1}, 
${JSON.stringify(address)}, 
'pending', 
${totalPrice}, 
${paymentTypeToPaymentMethod[paymentType]})`);

  return data;
};

const addProductsToOrderItemsTable = async (
  orderId: number,
  products: Product[],
  totalPrice: number,
) => {
  const strings: string[]= [];

  products.forEach(p => {
    let string = `${orderId}, ${p.totalPrice}, ${p.unitPrice}`;

    strings.push(string);
  })

  const data =
    await sql(`INSERT INTO order_items (order_id, total_price) 
              ${strings.join(' and')}
`);
  return data;
};

export interface CreateOrderBody {
  address: DetailedAddress;
  paymentType: PaymentType;
  totalPrice: number;
}

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as CreateOrderBody;

    const order = createOrder(body.address, body.paymentType, body.totalPrice);
    const items = addProductsToOrderItemsTable(aksdjfkjalsdkfj);

    return Response.json(
      {
        order,
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    return Response.json(
      { error: "Internal error while order creation" },
      {
        status: 500,
      },
    );
  }
};
