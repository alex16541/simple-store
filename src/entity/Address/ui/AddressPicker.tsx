import { Stack, TextField, Box, Autocomplete } from "@mui/material";
import { useAddressPicker } from "../hooks/useAddressPicker";
import { Address } from "../model/types/address";

interface AddressPickerProps {
  onChange: (address: Address) => void;
  error?: string;
  defaultQuery?: string;
}

export const AddressPicker = (props: AddressPickerProps) => {
  const { onChange, error, defaultQuery } = props;

  const {
    mapRef,
    onChangeSuggestInput,
    suggestOptions,
    onSelectAddress,
    address,
  } = useAddressPicker({ onChangeAddress: onChange, defaultQuery });

  return (
    <Stack gap={2}>
      <Autocomplete
        freeSolo
        value={address.formatted}
        filterOptions={(x) => x}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={onChangeSuggestInput}
            label="Адресс получения"
            required
            error={!!error}
            helperText={error}
          />
        )}
        onChange={onSelectAddress}
        options={suggestOptions}
        sx={{ flexGrow: 1 }}
      />
      <Box
        ref={mapRef}
        sx={{ height: "400px", borderRadius: 3, overflow: "hidden" }}
      />
    </Stack>
  );
};
