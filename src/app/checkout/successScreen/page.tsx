"use client";
import { checkoutActions, CheckoutStep } from "@/entity/Checkout";
import { useAppDispatch } from "@/lib/store/hooks";
import { getRouteCartPage, getRouteOrderPage } from "@/shared/router/routes";
import { Typography, Button, Stack } from "@mui/material";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessScreenStep = () => {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const orderId = params.get("orderId");

  useEffect(() => {
    dispatch(checkoutActions.setCurrentStep(CheckoutStep.successScreen));
  }, [dispatch]);

  if (!orderId) {
    return redirect(getRouteCartPage());
  }

  return (
    <Stack gap={4}>
      <Stack gap={2} alignItems="center">
        <Typography fontWeight="bold" variant="h4">
          Заказ успешно оформлен!! 🎉
        </Typography>
        <Typography variant="h5">Осталось только получить! 🌞</Typography>
      </Stack>

      <Stack direction="row" gap={2} justifyContent="center">
        <Button
          href="/"
          color="success"
          variant="outlined"
          sx={{ width: "max-content" }}
        >
          На главную
        </Button>

        <Button
          href={getRouteOrderPage(orderId)}
          color="success"
          variant="contained"
          sx={{ width: "max-content" }}
        >
          Перейти к заказу
        </Button>
      </Stack>
    </Stack>
  );
};

export default SuccessScreenStep;
