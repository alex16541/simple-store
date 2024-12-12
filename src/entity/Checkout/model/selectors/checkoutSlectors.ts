import { isDetailedAddressValid } from "@/entity/Address";
import { RootState } from "@/lib/store/store";
import { createSelector} from "@reduxjs/toolkit";

export const selectCheckoutCurrentStep = (store: RootState) => store.Checkout.currentStep;
export const selectCheckoutLastStep = (store: RootState) => store.Checkout.lastStep;
export const selectCheckoutData = (store: RootState) => store.Checkout.data;
export const selectCheckoutInited= (store: RootState) => store.Checkout._inited;

export const selectCheckoutPaymentType = (state: RootState) => state.Checkout.data.paymentType;
export const selectCheckoutDeliveryAddress = (store: RootState) => store.Checkout.data.deliveryAddress;
export const selectCheckoutAllStepsPassed = createSelector([(state: RootState) => state.Checkout.data], data => {
  const isAddressValid = isDetailedAddressValid(data.deliveryAddress?.detailedAddress);
return isAddressValid &&  data.paymentType
})
