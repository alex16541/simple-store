import { Product } from "@/entity/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSchema } from "../types/user";

const USER_CART_STORAGE_KEY = "USER_CART";

const initialState: UserSchema = {
  cart: [],
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    initCart: (state) => {
      const cart = JSON.parse(
        localStorage.getItem(USER_CART_STORAGE_KEY) ?? "[]",
      );

      if (Array.isArray(cart)) state.cart = cart;
    },

    addProductToCart: (state, action: PayloadAction<Product>) => {
      const productInCart = state.cart.find(
        (item) => item.productData.id === action.payload.id,
      );

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        state.cart = [
          ...state.cart,
          { productData: action.payload, quantity: 1 },
        ];
      }

      localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state.cart));
    },

    deleteProductFromCart: (state, action: PayloadAction<number>) => {
      const item = state.cart.find(
        (item) => item.productData.id === action.payload,
      );

      const items = state.cart.filter(
        (item) => item.productData.id !== action.payload,
      );

      if (item?.quantity && item?.quantity > 1) {
        item.quantity -= 1;
        state.cart = [...items, item];
      } else if (item?.quantity === 1) {
        state.cart = items;
      }

      localStorage.setItem(USER_CART_STORAGE_KEY, JSON.stringify(state.cart));
    },
  },
});

export const { actions: userActions, reducer: UserReducer } = UserSlice;
