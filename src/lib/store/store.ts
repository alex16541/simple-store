import { CheckoutReducer } from "@/entity/Checkout";
import { ProductsPageReducer } from "@/entity/Product";
import { UserReducer } from "@/entity/User";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () =>
  configureStore({
    reducer: {
      Checkout: CheckoutReducer,
      ProductsPage: ProductsPageReducer,
      User: UserReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
