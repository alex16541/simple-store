"use client";
import { Box, Button, ButtonGroup } from "@mui/material";
import { Product } from "@/entity/Product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useUserCart } from "@/entity/User/hooks/useUsercart";

interface CartProductCounterProps {
  product: Product;
}

export const CartProductCounter = (props: CartProductCounterProps) => {
  const { product } = props;

  const { inCartQuantity, onAddToCart, onDeleteFromCart } = useUserCart({
    product,
  });
  return (
    <>
      {!!inCartQuantity ? (
        <ButtonGroup sx={{ width: "100%" }}>
          <Button
            color="success"
            onClick={onDeleteFromCart}
            variant="contained"
          >
            <RemoveIcon />
          </Button>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            width="100%"
            sx={{
              width: "100%",
              backgroundColor: "success.main",
              color: "success.contrastText",
              fontWeight: "bold",
            }}
          >
            {inCartQuantity}
          </Box>
          <Button onClick={onAddToCart} color="success" variant="contained">
            <AddIcon />
          </Button>
        </ButtonGroup>
      ) : (
        <Button onClick={onAddToCart} color="success" fullWidth>
          Добавить в корзину
        </Button>
      )}
    </>
  );
};
