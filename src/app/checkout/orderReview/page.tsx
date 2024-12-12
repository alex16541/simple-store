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
} from "@/entity/User";
import { PaymentType } from "@/features/PaymentTypeSelect";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
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
  const totalCurrency = useAppSelector(selectCartTotalCurrency);
  const totalItemsQuantity = useAppSelector(selectCartTotalItemsQuantity);

  const createOrder = async () => {
    try {
      setIsLoading(true);

      if (!data.deliveryAddress.detailedAddress)
        throw new Error("Address is not defined");

      const body: CreateOrderBody = {
        address: data.deliveryAddress.detailedAddress,
        paymentType: data.paymentType,
        totalPrice: totalCurrency,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(body),
      }).then((d) => d.json());

      if (res.message) throw new Error(res.message);

      if (res.order) {
        // dispatch(checkoutActions.setLastCreatedOrder(order));
        router.push("/checkout/successScreen");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(checkoutActions.setCurrentStep(CheckoutStep.orderReview));
  }, []);

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
        Общая сумма заказа: {totalCurrency}₽
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
