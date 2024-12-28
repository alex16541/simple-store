"use client";
import { checkoutActions } from "@/entity/Checkout";
import { User, userActions } from "@/entity/User";
import { AppStore, makeStore } from "@/lib/store/store";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
interface StoreProviderProps {
  children: React.ReactNode;
  user?: User;
}
export const StoreProvider = (props: StoreProviderProps) => {
  const { children, user } = props;
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(userActions.initCart());
      if (user) storeRef.current.dispatch(userActions.setUser(user));
      storeRef.current.dispatch(checkoutActions.initCheckout());
    }
  }, [user]);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
