"use client";
import {
  Card,
  Stack,
  Box,
  Divider,
  CardContent,
  Typography,
  Rating,
  Chip,
  CardActions,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CartProductCounter } from "@/features/CartProductCounter";
import { Product, ProductGallery } from "@/entity/Product";
import { UserRole } from "@/entity/User";
import { ChangeProductModal } from "@/features/ChangeProductModal";

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
  userRole: UserRole;
}

export const ProductDetailsCard = (props: ProductDetailsCard) => {
  const { product, userRole } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <ProductCard variant="outlined">
      <ProductGallery
        sx={{
          p: 2,
        }}
        orientation={isDesktop ? "horizontal" : "vertical"}
        images={product.images}
      />
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
            flexWrap="wrap"
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
              {userRole === 'manager' && <ChangeProductModal product={product} />}
          </CardActions>
        </Box>
      </Stack>
    </ProductCard>
  );
};
