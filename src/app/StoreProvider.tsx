'use client';
import { checkoutActions } from "@/entity/Checkout";
import { userActions } from "@/entity/User";
import { AppStore, makeStore } from "@/lib/store/store";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  } 

  useEffect(() => {
    if(storeRef.current){
      storeRef.current.dispatch(userActions.initCart());
      storeRef.current.dispatch(checkoutActions.initCheckout());
    }
  }, [storeRef.current])

  return <Provider store={storeRef.current}>{children}</Provider>;
};
