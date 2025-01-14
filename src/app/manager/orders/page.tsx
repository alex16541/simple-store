import { statusTextMap } from "@/entity/Order";
import { fetchManagerOrders } from "@/entity/Order/server";
import { formatDate } from "@/shared/lib/DateFormatters";
import { formatPrice } from "@/shared/lib/PriceFormatters";
import { getRouteOrderPage } from "@/shared/router/routes";
import { GoBackButton } from "@/shared/ui/GoBackButton";
import { PageTitle } from "@/widgets/PageTitle";
import { Container, Stack, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

const ManagerOrdersPage = async () => {
  const orders = await fetchManagerOrders();

  if (!orders.length)
    return (
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={1}
          mt={3}
        >
          Похоже, все заказы уже доставлены 🌞
        </Typography>
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          Можете отдыхать!
        </Typography>
        <Stack gap={1} direction="row" justifyContent="center">
          <GoBackButton />
        </Stack>
      </Container>
    );

  return (
    <Container>
      <PageTitle>Открытые заказы:</PageTitle>
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
                <Stack direction="row" gap={2} alignItems="center">
                  <Typography fontWeight="bold" color="success" variant="h6">#{order.id}</Typography>
                  <Typography>
                    От:{" "}
                    {formatDate(order.createdAt)}{" "}
                  </Typography>
                  <Typography>
                    Обновлён:{" "}
                    {formatDate(order.updatedAt)}
                  </Typography>
                </Stack>
                <Typography variant="h6">{formatPrice(order.totalPrice)}₽</Typography>
              </Stack>
              <Typography variant="h5" fontWeight="bold">
                {statusTextMap[order.status]}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default ManagerOrdersPage;
