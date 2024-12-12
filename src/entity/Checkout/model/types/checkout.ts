import { DetailedAddress, DetailedAddressFormErrors } from "@/entity/Address";
import { PaymentType } from "@/features/PaymentTypeSelect";

export interface DeliveryAddress {
  detailedAddress?: DetailedAddress;
  addressErrors?: DetailedAddressFormErrors;
}

export interface CheckoutData {
  deliveryAddress: DeliveryAddress;
  paymentType: PaymentType;
}
