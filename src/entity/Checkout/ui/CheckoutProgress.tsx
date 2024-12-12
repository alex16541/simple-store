import { Stepper, Step, StepLabel } from "@mui/material";
import { CheckoutStep } from "../model/consts/steps";
import { useAppSelector } from "@/lib/store/hooks";
import {
  selectCheckoutCurrentStep,
  selectCheckoutData,
} from "../model/selectors/checkoutSlectors";

const steps: { value: CheckoutStep; label: string }[] = [
  { value: CheckoutStep.deliveryAddress, label: "Адрес получения" },
  { value: CheckoutStep.paymentType, label: "Способ оплата" },
  { value: CheckoutStep.orderReview, label: "Подтверждение" },
  { value: CheckoutStep.payment, label: "Оплата" },
  { value: CheckoutStep.successScreen, label: "Получение" },
];

export const CheckoutProgress = () => {
  const currentStep = useAppSelector(selectCheckoutCurrentStep);
  const checkoutData = useAppSelector(selectCheckoutData);

  return (
    <Stepper alternativeLabel activeStep={currentStep}>
      {steps.map(({ value, label }) => {
        if (
          value === CheckoutStep.payment &&
          checkoutData.paymentType !== "card_online"
        ) {
          return null;
        }

        return (
          <Step key={value}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
