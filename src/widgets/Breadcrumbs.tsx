"use client";

import {
  Typography,
  Breadcrumbs as MuiBreadcrumbs,
  BreadcrumbsProps,
  Link,
} from "@mui/material";
import { usePathname } from "next/navigation";

const breadcrumbNameMap = {
  "/": "Главная",
  "/products": "Товары",
  "/auth": "Аутетификация",
  "/auth/login": "Авторизация",
  "/auth/signup": "Регистрация",
  "/user": "Профиль пользователя",
  "/orders": "Заказы",
  "/manager": "Панель менеджера",
  "/manager/orders": "Открытые заказы",
  "/cart": "Корзина",
  "/checkout": "Оформление заказа",
  "/checkout/deliveryAddress": "Выбор адреса доставки",
  "/checkout/paymentType": "Выбор способа оплаты",
  "/checkout/orderReview": "Подтверждение заказа",
  "/checkout/successScreen": "Заказ создан!",
  "/admin": "Админ панель",
};

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <MuiBreadcrumbs {...props}>
      <Link underline="hover" color="inherit" href="/">
        МАГАЗ
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to =
          `/${pathnames.slice(0, index + 1).join("/")}` as keyof typeof breadcrumbNameMap;

        return last ? (
          <Typography key={to} sx={{ color: "text.primary" }}>
            {breadcrumbNameMap[to] ?? value}
          </Typography>
        ) : (
          <Link underline="hover" color="inherit" href={to} key={to}>
            {breadcrumbNameMap[to] ?? value}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};
