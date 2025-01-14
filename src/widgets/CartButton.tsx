"use client";
import {
  IconButton,
  Badge,
  Drawer,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { CartProductCounter } from "@/features/CartProductCounter";
import ProductionQuantityLimitsRoundedIcon from "@mui/icons-material/ProductionQuantityLimitsRounded";
import { CartItem } from "@/entity/User";
import { getRouteCartPage, getRouteCheckoutPage } from "@/shared/router/routes";
import { ModalHeader } from "@/shared/ui/ModalHeader";

export const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cart = useAppSelector((store) => store.User.cart);

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <Badge badgeContent={cart.length} color="success">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer
        PaperProps={{
          variant: "outlined",
          sx: {
            borderRadius: [0, 6],
            borderTopRightRadius: [0, 0],
            borderBottomRightRadius: [0, 0],
            border: [0, 1],
            borderColor: ['divider', 'divider'] 
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box
          sx={{
            width: ["100vw", 500, 500, 600],
            padding: 3,
            display: "grid",
            gridTemplate: "auto 1fr auto / 1fr",
            height: "100%",
          }}
        >
        <ModalHeader title="Корзина" onClose={() => setIsOpen(false)}/>
          <Stack gap={1} mb={3} pr={2} overflow={"hidden scroll"}>
            {!cart.length && (
              <Stack
                gap={1}
                alignItems="center"
                justifyContent={"center"}
                height={"100%"}
              >
                <ProductionQuantityLimitsRoundedIcon fontSize="large" />
                <Typography>В корзине ничего нет</Typography>
              </Stack>
            )}
            {cart.map((item) => (
              <CartItem
                key={item.productData.id}
                product={item.productData}
                actions={<CartProductCounter product={item.productData} />}
                quantity={item.quantity}
              />
            ))}
          </Stack>
          {!!cart.length && (
            <Stack gap={1}>
              <Button
                href={getRouteCheckoutPage()}
                onClick={() => setIsOpen(false)}
                fullWidth
                size="large"
                color="success"
                variant="contained"
              >
                Оформить заказ
              </Button>
              <Button
                href={getRouteCartPage()}
                onClick={() => setIsOpen(false)}
                fullWidth
                size="large"
                color="success"
                variant="outlined"
              >
                Перейти в корзину
              </Button>
            </Stack>
          )}
        </Box>
      </Drawer>
    </>
  );
};
