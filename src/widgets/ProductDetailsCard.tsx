"use client";
import {
  Card,
  Stack,
  CardMedia,
  Box,
  Divider,
  CardContent,
  Typography,
  Rating,
  Chip,
  CardActions,
  styled,
} from "@mui/material";
import { CartProductCounter } from "@/features/CartProductCounter";
import { Product } from "@/entity/Product";

const CardImageContainer = styled(CardMedia)(({ theme }) =>
  theme.unstable_sx({
    maxWidth: ["100%", "100%", 650],
    padding: 2,
    paddingBottom: [0, 0, 2],
    width: "100%",
    overflow: "hidden",
    aspectRatio: "1/1",
  }),
);

const CardImage = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius * 5,
})) as typeof Box;

const ProductCard = styled(Card)(({ theme }) =>
  theme.unstable_sx({
    borderRadius: 6,
    display: "flex",
    flexDirection: ["column", "column", "row"],
    justifyContent: "flex-start",
    gap: 0,
  }),
);

interface ProductDetailsCard {
  product: Product;
}

export const ProductDetailsCard = (props: ProductDetailsCard) => {
  const { product } = props;

  return (
    <ProductCard variant="outlined">
      <CardImageContainer>
        <CardImage component="img" src="/les.jpeg" alt={product.name} />
      </CardImageContainer>
      <Divider
        orientation="vertical"
        sx={{ display: ["none", "none", "block"] }}
        flexItem
      />
      <Stack justifyContent="space-between" flexGrow={1}>
        <CardContent
          sx={{
            minWidth: 200,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 1,
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            display="flex"
            justifyContent="space-between"
            gap={1}
          >
            {product.name}{" "}
            <Box component={"span"}>{Number(product.price).toFixed(0)}₽</Box>
          </Typography>
          <Rating value={Number(product.rate)} readOnly />
          <Stack direction="row" gap={1}>
            <Chip label={product.brand} color="success" />
            <Chip label={product.category} />
          </Stack>
          <Typography>В наличии {product.stock} шт</Typography>
          <Typography>{product.description}</Typography>
        </CardContent>
        <Box>
          <Divider flexItem />
          <CardActions>
            <CartProductCounter product={product} />
          </CardActions>
        </Box>
      </Stack>
    </ProductCard>
  );
};
