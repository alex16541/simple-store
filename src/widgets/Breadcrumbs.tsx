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
  "/auth/register": "Регистрация",
  "/user": "Профиль пользователя",
  "/orders": "Вашы заказы",
  "/cart": "Карзина",
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
