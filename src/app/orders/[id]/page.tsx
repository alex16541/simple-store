import { CartItem } from "@/entity/User";
import { PageTitle } from "@/widgets/PageTitle";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { redirect } from "next/navigation";
import {
  getRouteLoginPage,
  getRouteOrderPage,
  getRouteOrdersPage,
} from "@/shared/router/routes";
import { Order, statusTextMap } from "@/entity/Order";
import { fetchOrder, fetchOrderItems } from "@/entity/Order/server";
import { getSession } from "@/lib/server/session";
import { GoBackButton } from "@/shared/ui/GoBackButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const getOrder = async (
  userId: string | number | null,
  orderId: string | number,
) => {
  try {
    const orders = await fetchOrder(userId, orderId);

    const order = orders[0];

    if (!order) throw new Error("order not found");

    const items = await fetchOrderItems(orderId);

    if (!items) throw new Error("items not found");

    order.items = items;

    return order as Order;
  } catch (e) {
    console.log(e);
    return null;
  }
};

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

const OrderPage = async (props: OrderPageProps) => {
  const { params } = props;
  const { id: orderId } = await params;

  const user = await getSession();

  if (!user) return redirect(getRouteLoginPage(getRouteOrderPage(orderId)));
  if (!orderId) return redirect(getRouteOrdersPage());

  const isCustomer = user.role === "customer";
  const userId = isCustomer ? user.id : null;

  const order = await getOrder(userId, orderId);

  if (!order)
    return (
      <Container>
        <Card
          sx={{
            p: 2,
            borderRadius: 6,
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Упс... Похоже такой страницы не существует 😞
          </Typography>
          <Stack direction="row" gap={2}>
            <GoBackButton />
            <Button
              href="/"
              color="success"
              variant="contained"
              startIcon={<HomeRoundedIcon />}
            >
              На главную
            </Button>
          </Stack>
        </Card>
      </Container>
    );

  return (
    <Container maxWidth="xl">
      <PageTitle>Состав заказа №{order.id}</PageTitle>
      <Grid2 container columnSpacing={2} rowSpacing={2} direction={["column-reverse", "column-reverse", "row"]}>
        <Grid2 size={[12, 12, 8]}>
          <Stack gap={2}>
            {order.items.map((i) => (
              <CartItem
                key={i.productData.id}
                product={i.productData}
                quantity={i.quantity}
                actions={
                  <Stack direction="row" gap={1}>
                    {isCustomer ? (
                      <>
                        <Button color="success" variant="contained">
                          В карзину
                        </Button>
                        <Button color="success" variant="outlined">
                          Оценить
                        </Button>
                      </>
                    ) : null}
                  </Stack>
                }
              />
            ))}
          </Stack>
        </Grid2>
        <Grid2 size={[12, 12, 4]}>
          <Card variant="outlined" sx={{ borderRadius: 6 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                {statusTextMap[order.status]}
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                Сумма заказа:
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="success">
                {order.totalPrice}₽
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default OrderPage;
