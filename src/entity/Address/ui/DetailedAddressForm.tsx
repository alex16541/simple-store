import { Stack, TextField } from "@mui/material";
import { AddressPicker } from "./AddressPicker";
import { DetailedAddress } from "../model/types/address";
import { useDetailedAddressForm } from "../hooks/useDetailedAddressForm";
import { DetailedAddressFormErrors } from "../model/types/form";

interface DetailedAddressFormProps {
  onChange?: (address: DetailedAddress) => void;
  onChangeErrors?: (errors: DetailedAddressFormErrors) => void;
  defaultValue?: DetailedAddress;
}

export const DetailedAddressForm = (props: DetailedAddressFormProps) => {
  const { onChange, onChangeErrors, defaultValue } = props;

  const {
    formData,
    errors,
    onChangeAddress,
    onChangeFloor,
    onChangeApartment,
    onChangeIntercom,
    onChangeEntrance,
    onChangeComment,
  } = useDetailedAddressForm({ defaultValue, onChange, onChangeErrors });

  return (
    <Stack gap={2}>
      <AddressPicker
        defaultQuery={defaultValue?.address.formatted}
        onChange={onChangeAddress}
        error={errors.address}
      />
      <Stack direction="row" gap={1}>
        <TextField
          label="Квартира \ офис"
          defaultValue={formData.details.apartment}
          onBlur={(e) => onChangeApartment(e.target.value)}
          fullWidth
        />
        <TextField
          label="Этаж"
          defaultValue={formData.details.floor}
          onBlur={(e) => onChangeFloor(e.target.value)}
          fullWidth
        />
      </Stack>
      <Stack direction="row" gap={1}>
        <TextField
          label="Подъезд"
          defaultValue={formData.details.entrance}
          onBlur={(e) => onChangeEntrance(e.target.value)}
          fullWidth
        />
        <TextField
          label="Домофон"
          defaultValue={formData.details.intercom}
          onBlur={(e) => onChangeIntercom(e.target.value)}
          fullWidth
        />
      </Stack>
      <TextField
        multiline
        label="Комментарий для доставщика"
        defaultValue={formData.details.comment}
        onBlur={(e) => onChangeComment(e.target.value)}
      />
    </Stack>
  );
};
