"use client";
import { getRouteProductPage } from "@/shared/router/routes";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Divider,
  CardActions,
  Link,
  styled,
  Box,
} from "@mui/material";

import { CartProductCounter } from "@/features/CartProductCounter";
import { Product } from "@/entity/Product";
import { ImageNotFound } from "@/shared/ui/ImageNotFound";
import { formatPrice } from "@/shared/lib/PriceFormatters";

const CardImageContainer = styled(Link)(() => ({
  aspectRatio: "1/1",
  overflow: "hidden",
  display: "block",
}));

const CardImage = styled(CardMedia)(() => ({
  width: "100%",
  height: "100%",
  ":hover": { transform: "scale(1.1)" },
  transition: "transform 0.3s ease-in-out",
})) as typeof CardMedia;

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  display: "flex",
  gap: theme.spacing(1),
  justifyContent: "space-between",
}));

const ProductCard = styled(Card)(({ theme }) =>
  theme.unstable_sx({
    borderRadius: [4, 6],
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    overflow: "hidden",
  }),
);

interface SmamllProductCardProps {
  product: Product;
}

export const SmallProductCard = (props: SmamllProductCardProps) => {
  const { product } = props;
  const image = product.images?.[0];

  return (
    <ProductCard variant="outlined">
      <CardImageContainer href={getRouteProductPage(product.id)} sx={{textDecoration: 'none'}}>
        {image ? (
          <CardImage component="img" src={image ?? "/les.jpeg"} alt="nature" />
        ) : (
        <Box display="flex" flexDirection="column" gap={1} alignItems="center" justifyContent="center" height="100%" sx={{borderBottom: 1, borderColor: 'divider'}}>
          <ImageNotFound/>
        </Box>
        )}
      </CardImageContainer>
      <CardContent>
        <ProductTitle variant="h5">{product.name}</ProductTitle>
        <Typography mb={2} variant="h5" fontWeight="bold" color="success">
          {formatPrice(product.price)}₽
        </Typography>
        <Rating value={Number(product.rate)} readOnly />
        <Typography>{product.description}</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <CartProductCounter product={product} />
      </CardActions>
    </ProductCard>
  );
};
