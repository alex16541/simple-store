"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";
import {
  selectCartTotalCurrency,
  selectCartTotalItemsQuantity,
} from "../model/selectors/userSelectors";

interface CartOwerviewProps {
  actions?: ReactNode;
}

export const CartOwerview = (props: CartOwerviewProps) => {
  const { actions } = props;
  const totalCurrency = useAppSelector(selectCartTotalCurrency);
  const cartDiscount = 0;
  const discountCurrency = totalCurrency * cartDiscount;
  const totalCurrencyWithDiscount =
    totalCurrency - discountCurrency;
  const totalItemsQuantity = useAppSelector(selectCartTotalItemsQuantity);

  return (
    <Card variant="outlined" sx={{ borderRadius: 6 }}>
      <CardContent>
        <Typography>{totalItemsQuantity} предметов</Typography>
        {/* <Typography>Общая сумма: {totalCurrency}₽</Typography> */}
        {/* <Typography>Скидка: {cartDiscount * 100}%</Typography> */}
        {/* <Typography>Сумма скидки: {discountCurrency}₽</Typography> */}
        <Typography variant="h3" fontWeight="bold">
          Итоговая сумма:
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="success">
          {totalCurrencyWithDiscount}₽
        </Typography>
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};
