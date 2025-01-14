import { PageTitle } from "@/widgets/PageTitle";
import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import {
  getRouteLoginPage,
  getRouteOrderPage,
  getRouteOrdersPage,
} from "@/shared/router/routes";
import { statusTextMap } from "@/entity/Order";
import { fetchUserOrders } from "@/entity/Order/server";
import { getSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { formatPrice } from "@/shared/lib/PriceFormatters";
import { formatDate } from "@/shared/lib/DateFormatters";

const UserOrdersPage = async () => {
  const user = await getSession();

  if (!user) return redirect(getRouteLoginPage(getRouteOrdersPage()));

  const orders = await fetchUserOrders(user.id);

  return (
    <Container>
      <PageTitle>Ваши заказы</PageTitle>
      <Stack gap={2}>
        {orders.map((order) => (
          <Card
            key={order.id}
            variant="outlined"
            component={Link}
            href={getRouteOrderPage(order.id)}
            sx={{
              borderRadius: 6,
            }}
          >
            <CardContent>
              <Stack direction="row" gap={2} justifyContent="space-between">
                <Typography>
                  Заказ от:{" "}
                  {formatDate(order.createdAt)}
                </Typography>
                <Typography variant="h6">{formatPrice(order.totalPrice)}₽</Typography>
              </Stack>
              <Typography variant="h5" fontWeight="bold" color="success">
                {statusTextMap[order.status]}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default UserOrdersPage;
