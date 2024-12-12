import { CartOwerview } from "@/entity/User";
import { CartProductList } from "@/widgets/CartProductList";
import { PageTitle } from "@/widgets/PageTitle";
import { Button, Container, Grid2 } from "@mui/material";

const CartPage = () => {
  return (
    <Container maxWidth="xl">
      <PageTitle>Cart page</PageTitle>
      <Grid2 container columnSpacing={2}>
        <Grid2 size={[8]}>
          <CartProductList />
        </Grid2>
        <Grid2 size={[4]}>
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
