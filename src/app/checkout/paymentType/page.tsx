"use client";
import {
  checkoutActions,
  CheckoutStep,
  selectCheckoutPaymentType,
} from "@/entity/Checkout";
import { PaymentType, PaymentTypeSelect } from "@/features/PaymentTypeSelect";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getRouteCheckoutOrderReviewPage } from "@/shared/router/routes";
import { Button } from "@mui/material";
import { useEffect } from "react";

const PaymentTypeStep = () => {
  const dispatch = useAppDispatch();
  const paymentType = useAppSelector(selectCheckoutPaymentType);

  const onChange = (paymentType: PaymentType) => {
    dispatch(checkoutActions.setPaymentType(paymentType));
  };

  useEffect(() => {
    dispatch(checkoutActions.setCurrentStep(CheckoutStep.paymentType));
  }, [dispatch]);

  return (
    <>
      <PaymentTypeSelect value={paymentType} onChange={onChange} />
      <Button
        variant="contained"
        size="large"
        disabled={!paymentType}
        href={getRouteCheckoutOrderReviewPage()}
      >
        Далее
      </Button>
    </>
  );
};

export default PaymentTypeStep;
