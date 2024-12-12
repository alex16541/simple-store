import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckoutStep } from "../consts/steps";
import { CheckoutData, DeliveryAddress } from "../types/checkout";
import { CheckoutSliceSchema } from "../types/CheckoutSliceSchema";
import { PaymentType } from "@/features/PaymentTypeSelect";

const CHECKOUT_LOCALSTORAGE_KEY = "CHECKOUT_LOCALSTORAGE_KEY";

const initialState: CheckoutSliceSchema = {
  currentStep: CheckoutStep.gettingType,
  lastStep: CheckoutStep.gettingType,
  data: {
    deliveryAddress: {},
    paymentType: "card_online",
  },
  _inited: false,
};

const CheckoutSlice = createSlice({
  name: "Checkout",
  initialState,
  reducers: {
    initCheckout(state) {
      try {
        const json = localStorage.getItem(CHECKOUT_LOCALSTORAGE_KEY);

        if (!json) return;

        const data = JSON.parse(json) as CheckoutSliceSchema;
        state.data = data.data;
        state.lastStep = data.lastStep;
        state.currentStep = data.currentStep;
      } catch (e) {
        console.log(e);
      } finally {
        state._inited = true;
      }
    },
    setCurrentStep(state, { payload }: PayloadAction<CheckoutStep>) {
      state.currentStep = payload;

      if (payload > state.lastStep) state.lastStep = payload;

      localStorage.setItem(CHECKOUT_LOCALSTORAGE_KEY, JSON.stringify(state));
    },
    setData(state, { payload }: PayloadAction<CheckoutData>) {
      state.data = payload;

      localStorage.setItem(CHECKOUT_LOCALSTORAGE_KEY, JSON.stringify(state));
    },
    setDeliveryAddress(state, { payload }: PayloadAction<DeliveryAddress>) {
      state.data.deliveryAddress = {
        ...state.data.deliveryAddress,
        ...payload,
      };

      localStorage.setItem(CHECKOUT_LOCALSTORAGE_KEY, JSON.stringify(state));
    },
    setPaymentType(state, { payload }: PayloadAction<PaymentType>) {
      state.data.paymentType = payload;

      localStorage.setItem(CHECKOUT_LOCALSTORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const { actions: checkoutActions, reducer: CheckoutReducer } =
  CheckoutSlice;
