export {
  checkoutActions,
  CheckoutReducer,
} from "./model/slices/CheckoutSlice";
export { CheckoutProgress } from "./ui/CheckoutProgress";
export { CheckoutStep } from "./model/consts/steps";
export {
  selectCheckoutDeliveryAddress,
  selectCheckoutCurrentStep,
  selectCheckoutLastStep,
  selectCheckoutData,
  selectCheckoutPaymentType,
  selectCheckoutGettingOrderType,
  selectCheckoutAllStepsPassed,
} from "./model/selectors/checkoutSlectors";

export type {CheckoutData, DeliveryAddress} from './model/types/checkout'
