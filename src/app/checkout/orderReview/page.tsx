"use client";
import { CreateOrderBody } from "@/app/api/orders/route";
import {
  checkoutActions,
  CheckoutStep,
  selectCheckoutAllStepsPassed,
  selectCheckoutData,
} from "@/entity/Checkout";
import {
  selectCartTotalCurrency,
  selectCartTotalItemsQuantity,
  selectUserCart,
  userActions,
} from "@/entity/User";
import { PaymentType } from "@/features/PaymentTypeSelect";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { formatPrice } from "@/shared/lib/PriceFormatters";
import { getRouteCheckoutSuccessPage } from "@/shared/router/routes";
import { Button, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const paymentTypeLabel: Record<PaymentType, string> = {
  cash: "Наличными при получении",
  card_online: "Банковской картой онлайн",
  card_offline: "Банковской картой при получении",
};

const OrderOverviewStep = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const isAllStepsPassed = useAppSelector(selectCheckoutAllStepsPassed);
  const data = useAppSelector(selectCheckoutData);
  const cart = useAppSelector(selectUserCart);
  const totalCurrency = useAppSelector(selectCartTotalCurrency);
  const totalItemsQuantity = useAppSelector(selectCartTotalItemsQuantity);

  const createOrder = async () => {
    try {
      setIsLoading(true);

      if (!data.deliveryAddress.detailedAddress)
        throw new Error("Не указан адрес доставки");

      const body: CreateOrderBody = {
        address: data.deliveryAddress.detailedAddress,
        products: cart,
        paymentType: data.paymentType,
        totalPrice: totalCurrency,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(body),
      }).then((d) => d.json());

      if (response.message) throw new Error(response.message);

      if (response.orderId) {
        dispatch(userActions.clearCart());
        router.push(getRouteCheckoutSuccessPage(response.orderId));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(checkoutActions.setCurrentStep(CheckoutStep.orderReview));
  }, [dispatch]);

  return (
    <>
      <Typography variant="h4" fontWeight="bold">
        Детали заказа:
      </Typography>
      <Typography>
        Адрес доставки:<span> </span>
        {data.deliveryAddress.detailedAddress?.address.formatted}
      </Typography>
      <Typography>
        Способ оплаты: {paymentTypeLabel[data.paymentType]}
      </Typography>
      <Typography>Общее кол-во товаров: {totalItemsQuantity}</Typography>
      <Divider />
      <Typography color="success" fontWeight="bold">
        Общая сумма заказа: {formatPrice(totalCurrency)}₽
      </Typography>
      <Button
        size="large"
        variant="contained"
        disabled={!isAllStepsPassed || isLoading}
        onClick={createOrder}
      >
        {data.paymentType === "card_online" ? "Оплатить" : "Оформить заказ"}
      </Button>
    </>
  );
};

export default OrderOverviewStep;
