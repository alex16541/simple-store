import { CheckoutStep } from "../consts/steps";
import { CheckoutData } from "./checkout";

export interface CheckoutSliceSchema {
  currentStep: CheckoutStep;
  lastStep: CheckoutStep;
  data: CheckoutData;
  _inited: boolean;
}
