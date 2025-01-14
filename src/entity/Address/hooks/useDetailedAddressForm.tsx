import { useEffect, useReducer, useState } from "react";
import {
  AddressDetails,
  DetailedAddress,
  Address,
} from "../model/types/address";
import { DetailedAddressFormErrors } from "../model/types/form";

const defaultAddress: Address = {
  city: "",
  house: "",
  street: "",
  country: "",
  formatted: "",
};

const defaultAddressDetails: AddressDetails = {
  apartment: "",
  floor: "",
  entrance: "",
  intercom: "",
  comment: "",
};

interface UseDetailedAddrssFormOptions {
  defaultValue?: DetailedAddress;
  onChange?: (formData: DetailedAddress) => void;
  onChangeErrors?: (errors: DetailedAddressFormErrors) => void;
}

type Action<Key extends keyof DetailedAddress = keyof DetailedAddress> = {
  field: Key;
  value: DetailedAddress[Key];
}; 

export const useDetailedAddressForm = (
  options: UseDetailedAddrssFormOptions,
) => {
  const { defaultValue, onChange, onChangeErrors } = options;

  const formReducer = (
    state: DetailedAddress,
    action: Action,
  ) => {
    const newState = { ...state, [action.field]: action.value };

    return newState;
  };

  const [formData, dispatchFormUpdate] = useReducer(
    formReducer,
    defaultValue,
    (state) => state ?? {
      address: defaultAddress,
      details: defaultAddressDetails,
    },
  );

  const [errors, _setErrors] = useState<DetailedAddressFormErrors>({});

  const setErrors = (e: DetailedAddressFormErrors) => {
    onChangeErrors?.(e);
    _setErrors(e);
  };

  const onChangeAddress = (address: Address) => {
    if (!address.formatted) {
      dispatchFormUpdate({ field: "address", value: { ...defaultAddress } });
      setErrors({ ...errors, address: "Укажите адресс доставки" });
      return;
    }

    setErrors({ ...errors, address: "" });
    dispatchFormUpdate({
      field: "address",
      value: { ...formData.address, ...address },
    });
  };

  const onChangeApartment = (apartment: string | null) => {
    dispatchFormUpdate({
      field: "details",
      value: { ...formData.details, apartment: apartment ?? "" },
    });
  };

  const onChangeFloor = (floor: string | null) => {
    dispatchFormUpdate({
      field: "details",
      value: { ...formData.details, floor: floor ?? "" },
    });
  };

  const onChangeIntercom = (intercom: string | null) => {
    dispatchFormUpdate({
      field: "details",
      value: { ...formData.details, intercom: intercom ?? "" },
    });
  };

  const onChangeEntrance = (entrance: string | null) => {
    dispatchFormUpdate({
      field: "details",
      value: { ...formData.details, entrance: entrance ?? "" },
    });
  };

  const onChangeComment = (comment: string | null) => {
    dispatchFormUpdate({
      field: "details",
      value: { ...formData.details, comment: comment ?? "" },
    });
  };

  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange])

  return {
    formData,
    errors,
    onChangeAddress,
    onChangeFloor,
    onChangeApartment,
    onChangeIntercom,
    onChangeEntrance,
    onChangeComment,
  };
};
