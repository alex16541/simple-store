import { PageTitle } from "@/widgets/PageTitle";
import {
  getRouteAdminPage,
  getRouteLoginPage,
  getRouteProductsPage,
  getRouteRegisterPage,
} from "@/shared/router/routes";
import { Card, Container, Paper, Stack } from "@mui/material";
import NextLink from "next/link";

const links = [
  {
    href: getRouteProductsPage(),
    text: "Перейти к списку продуктов",
  },
  {
    href: getRouteRegisterPage(),
    text: "Зарегистрироваться",
  },
  {
    href: getRouteLoginPage(),
    text: "Авторизоваться",
  },
  {
    href: getRouteAdminPage(),
    text: "Админ панель",
  },
];

export default function Home() {
  return (
    <Container>
      <PageTitle>Home page</PageTitle>
      <Paper sx={{ padding: 2, borderRadius: 6 }} variant="outlined">
        <Stack gap={2}>
          {links.map((link) => (
            <Card
              key={link.href}
              component={NextLink}
              href={link.href}
              prefetch={true}
              sx={{ padding: 3, borderRadius: 6, textDecoration: "none" }}
            >
              {link.text}
            </Card>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}
