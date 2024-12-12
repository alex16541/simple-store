import { createSlice } from "@reduxjs/toolkit";

const ProductsPageSlice = createSlice({
  name: "ProductsPage",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { actions: productsPageActions, reducer: ProductsPageReducer } = ProductsPageSlice;
