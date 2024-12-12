import { Product } from "@/entity/Product";
import { Card, Box, CardMedia, Stack, Typography } from "@mui/material";
import { ReactNode, useMemo } from "react";
interface CartItemProps {
  product: Product;
  quantity: number;
  actions: ReactNode;
}
export const CartItem = (props: CartItemProps) => {
  const { product, actions, quantity } = props;

  const price = useMemo(() => {
      return Number(product.price).toFixed(0);
  }, [product.price])

  return (
    <Card
      key={product.id}
      variant="outlined"
      sx={{ display: "flex", gap: 2, padding: 2, borderRadius: 6, overflow: 'visible' }}
    >
      <Box
        width={100}
        height={100}
        sx={{
          overflow: "hidden",
          borderRadius: 4,
          objectFit: "cover",
        }}
      >
        <CardMedia
          component="img"
          src="/les.jpeg"
          alt={product.name}
          width="100%"
          height="100%"
        />
      </Box>

      <Stack justifyContent="space-between" flexGrow={1}>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="subtitle1">₽{price} * {quantity} = ₽{Number(price) * quantity}</Typography>
        {actions}
      </Stack>
    </Card>
  );
};
