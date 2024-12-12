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
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@/lib/store/hooks";
import { CartProductCounter } from "@/features/CartProductCounter";
import ProductionQuantityLimitsRoundedIcon from "@mui/icons-material/ProductionQuantityLimitsRounded";
import { CartItem } from "@/entity/User";

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
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box
          sx={{
            width: ["100vw", 400, 500, 600],
            padding: 3,
            display: "grid",
            gridTemplate: "auto 1fr auto / 1fr",
            height: "100%",
          }}
        >
          <Stack direction="row" justifyContent="space-between" gap={2} mb={1}>
            <Typography variant="h5">Карзина</Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack gap={1} mb={3} pr={2} overflow={"hidden scroll"}>
            {!cart.length && (
              <Stack
                gap={1}
                alignItems="center"
                justifyContent={"center"}
                height={"100%"}
              >
                <ProductionQuantityLimitsRoundedIcon fontSize="large" />
                <Typography>В карзине ничего нет</Typography>
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
                fullWidth
                size="large"
                color="success"
                variant="contained"
              >
                Оформить заказ
              </Button>
              <Button
                href="/cart"
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
