import { CartOwerview } from "@/entity/User";
import { CartProductList } from "@/widgets/CartProductList";
import { PageTitle } from "@/widgets/PageTitle";
import { Button, Container, Grid2 } from "@mui/material";

const CartPage = () => {
  return (
    <Container maxWidth="xl">
      <PageTitle>Корзина</PageTitle>
      <Grid2 container columnSpacing={2} rowSpacing={2} direction={["column-reverse", "column-reverse", "row"]}>
        <Grid2 size={[12, 12, 8]}>
          <CartProductList />
        </Grid2>
        <Grid2 size={[12, 12, 4]}>
          <CartOwerview
            actions={
              <Button
                fullWidth
                size="large"
                color="success"
                variant="contained"
                href="/checkout"
              >
                Оформить заказ
              </Button>
            }
          />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default CartPage;
