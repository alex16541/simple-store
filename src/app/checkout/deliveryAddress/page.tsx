"use client";
import {
  DetailedAddress,
  DetailedAddressFormErrors,
  isDetailedAddressValid,
} from "@/entity/Address";
import { DetailedAddressForm } from "@/entity/Address/ui/DetailedAddressForm";
import {
  checkoutActions,
  CheckoutStep,
  selectCheckoutDeliveryAddress,
} from "@/entity/Checkout";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getRouteCheckoutPaymentTypePage } from "@/shared/router/routes";
import { Button } from "@mui/material";
import { useEffect, useMemo } from "react";

const DeliveryAddressStep = () => {
  const dispatch = useAppDispatch();
  const deliveryAddress = useAppSelector(selectCheckoutDeliveryAddress);
  const { detailedAddress: address, addressErrors: errors = [] } =
    deliveryAddress;

  const onChangeAddress = (address: DetailedAddress) => {
    dispatch(checkoutActions.setDeliveryAddress({ detailedAddress: address }));
  };

  const onChangeErrors = (errors: DetailedAddressFormErrors) => {
    dispatch(checkoutActions.setDeliveryAddress({ addressErrors: errors }));
  };

  const isAddressValid = useMemo(() => {
    const isAnyError = Object.values(errors).filter(Boolean).length;
    const isValid = address ? isDetailedAddressValid(address) : false;

    return !isAnyError && isValid;
  }, [errors, address]);

  useEffect(() => {
    dispatch(checkoutActions.setCurrentStep(CheckoutStep.deliveryAddress));
  }, [dispatch]);

  return (
    <>
      <DetailedAddressForm
        defaultValue={address}
        onChange={onChangeAddress}
        onChangeErrors={onChangeErrors}
      />
      <Button
        variant="contained"
        size="large"
        disabled={!isAddressValid}
        href={getRouteCheckoutPaymentTypePage()}
      >
        Далее
      </Button>
    </>
  );
};

export default DeliveryAddressStep;
