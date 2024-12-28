import { PageTitle } from "@/widgets/PageTitle";
import {
  getRouteAdminPage,
  getRouteCartPage,
  getRouteLoginPage,
  getRouteLogoutPage,
  getRouteManagerOrdersPage,
  getRouteOrdersPage,
  getRouteProductsPage,
  getRouteSignupPage,
} from "@/shared/router/routes";
import { Card, Container, Paper, Stack } from "@mui/material";
import NextLink from "next/link";
import { getSession } from "@/lib/server/session";

const links = [
  {
    href: getRouteProductsPage(),
    text: "Перейти к списку продуктов",
  },
  {
    href: getRouteCartPage(),
    text: "Карзина",
  },
  {
    href: getRouteOrdersPage(),
    text: "Ваши заказы",
    authOnly: true,
  },
  {
    href: getRouteManagerOrdersPage(),
    text: "Не доставленные заказы",
    authOnly: true,
    roles: ["manager", "admin"],
  },
  {
    href: getRouteLoginPage(),
    text: "Авторизоваться",
    unAuthOnly: true,
  },
  {
    href: getRouteSignupPage(),
    text: "Зарегистрироваться",
    unAuthOnly: true,
  },
  {
    href: getRouteLogoutPage(),
    text: "Выйти из акаунта",
    authOnly: true,
  },
  {
    href: getRouteAdminPage(),
    text: "Админ панель",
    authOnly: true,
    roles: ["admin"],
  },
];

export default async function Home() {
  const user = await getSession();

  return (
    <Container>
      <PageTitle>Home page</PageTitle>
      <Paper sx={{ padding: 2, borderRadius: 6 }} variant="outlined">
        <Stack gap={2}>
          {links.map((link) => {
            if(link.authOnly && !user) return null;
            if(link.unAuthOnly && user) return null;

            if(link.roles?.length && !link.roles.find(r => r === (user?.role ?? 'customer'))) return null;  

            return (
              <Card
                key={link.href}
                component={NextLink}
                href={link.href}
                prefetch={true}
                sx={{ padding: 3, borderRadius: 6, textDecoration: "none" }}
              >
                {link.text}
              </Card>
            );
          })}
        </Stack>
      </Paper>
    </Container>
  );
}
