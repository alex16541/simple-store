import { DetailedAddress } from "@/entity/Address";
import {
  createOrder,
  addProductsToOrderItemsTable,
  updateProductsInStock,
} from "@/entity/Order/server";
import { CartProduct } from "@/entity/User";
import { PaymentType } from "@/features/PaymentTypeSelect";
import { getSession } from "@/lib/server/session";
import { NextRequest } from "next/server";

export interface CreateOrderBody {
  address: DetailedAddress;
  products: CartProduct[];
  paymentType: PaymentType;
  totalPrice: number;
}

export const POST = async (request: NextRequest) => {
  try {
    const user = await getSession();

    if(!user) throw new Error("User unauthorized");

    const { address, products, paymentType, totalPrice } =
      (await request.json()) as CreateOrderBody;

    const orders = (await createOrder(user.id, address, paymentType, totalPrice)) as {
      id: string;
    }[];

    const orderId = orders[0].id;

    if (!orderId) throw Error("No id returned while order creating");

    // TODO: Обернуть в транзакцию
    await addProductsToOrderItemsTable(orderId, products);
    await updateProductsInStock(products);

    return Response.json(
      {
        orderId,
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    return Response.json(
      { error: `Internal error while order creation: ${e}` },
      {
        status: 500,
      },
    );
  }
};
