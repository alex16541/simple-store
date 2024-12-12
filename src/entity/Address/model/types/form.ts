import { AddressDetails } from "./address";

export type DetailedAddressFormFields = keyof AddressDetails | "address";

export type DetailedAddressFormErrors = OptionalRecord<
  DetailedAddressFormFields,
  string
>;
