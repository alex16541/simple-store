import { RootState } from "@/lib/store/store";

export const selectUserCart = (store: RootState) => store.User.cart

export const selectCartTotalCurrency = (state: RootState) =>
  state.User.cart.reduce(
    (prev: number, current) =>
      Number(current.productData.price) * current.quantity + prev,
    0,
  );

export const selectCartTotalItemsQuantity = (state: RootState) =>
  state.User.cart.reduce((prev: number, current) => prev + current.quantity, 0);
