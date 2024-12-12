"use client";

import { CartItem, selectUserCart } from "@/entity/User";
import { CartProductCounter } from "@/features/CartProductCounter";
import { useAppSelector } from "@/lib/store/hooks";
import { Stack } from "@mui/material";
import { useMemo } from "react";

export const CartProductList = () => {
  const cart = useAppSelector(selectUserCart);

  const sorted = useMemo(() => {
    return cart.toSorted((a, b) => {
      return a.productData.name.localeCompare(b.productData.name);
    });
  }, [cart]);

  return (
    <Stack gap={2}>
      {sorted.map((item) => (
        <CartItem
          key={item.productData.id}
          product={item.productData}
          actions={<CartProductCounter product={item.productData} />}
          quantity={item.quantity}
        />
      ))}
    </Stack>
  );
};
