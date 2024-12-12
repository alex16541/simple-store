import { useState } from "react";
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

export const useDetailedAddressForm = (options: UseDetailedAddrssFormOptions) => {
  const {defaultValue, onChange, onChangeErrors} = options;
  const [formData, _setFormData] = useState<DetailedAddress>(defaultValue ?? {
    address: defaultAddress,
    details: defaultAddressDetails,
  });

  const [errors, _setErrors] = useState<DetailedAddressFormErrors>({});

  const setFormData = (d: DetailedAddress) => {
    onChange?.(d);
    _setFormData(d); 
  }

  const setErrors = (e: DetailedAddressFormErrors) => {
    onChangeErrors?.(e);
    _setErrors(e); 
  }

  const onChangeAddress = (address: Address) => {
    if (!address.formatted) {
      setFormData({ ...formData, address: { ...defaultAddress } });
      setErrors({ ...errors, address: "Укажите адресс доставки" });
      return;
    }

    setErrors({ ...errors, address: "" });
    setFormData({ ...formData, address: { ...formData.address, ...address } });
  };

  const onChangeApartment = (apartment: string | null) => {
    setFormData({
      ...formData,
      details: { ...formData.details, apartment: apartment ?? "" },
    });
  };

  const onChangeFloor = (floor: string | null) => {
    setFormData({
      ...formData,
      details: { ...formData.details, floor: floor ?? "" },
    });
  };

  const onChangeIntercom = (intercom: string | null) => {
    setFormData({
      ...formData,
      details: { ...formData.details, intercom: intercom ?? "" },
    });
  };

  const onChangeEntrance = (entrance: string | null) => {
    setFormData({
      ...formData,
      details: { ...formData.details, entrance: entrance ?? "" },
    });
  };

  const onChangeComment = (comment: string | null) => {
    setFormData({
      ...formData,
      details: { ...formData.details, comment: comment ?? "" },
    });
  };

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
