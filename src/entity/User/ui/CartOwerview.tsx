"use client";
import { useAppSelector } from "@/lib/store/hooks";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import {
  selectCartTotalCurrency,
  selectCartTotalItemsQuantity,
} from "../model/selectors/userSelectors";
import { GoBackButton } from "@/shared/ui/GoBackButton";
import { getRouteProductsPage } from "@/shared/router/routes";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

interface CartOwerviewProps {
  actions?: ReactNode;
}

export const CartOwerview = (props: CartOwerviewProps) => {
  const { actions } = props;
  const totalCurrency = useAppSelector(selectCartTotalCurrency);
  const cartDiscount = 0;
  const discountCurrency = totalCurrency * cartDiscount;
  const totalCurrencyWithDiscount = totalCurrency - discountCurrency;
  const totalItemsQuantity = useAppSelector(selectCartTotalItemsQuantity);

  if (totalItemsQuantity === 0)
    return (
      <Card variant="outlined" sx={{ borderRadius: 6, pb: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
          mt={3}
        >
          Ваша корзина пуста
        </Typography>
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          Хотите добавить что-нибуд в корзину? 🌞
        </Typography>
        <Stack gap={1} direction="row" justifyContent="center">
          <GoBackButton />
          <Button
            href={getRouteProductsPage()}
            variant="contained"
            color="success"
            startIcon={<AddShoppingCartRoundedIcon />}
          >
            К товарам
          </Button>
        </Stack>
      </Card>
    );

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
