import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

export type PaymentType = "card_online" | "card_offline" | "cash";

interface PaymentTypeSelectProps {
  onChange: (value: PaymentType) => void;
  value: PaymentType;
}

const options = [
  { label: "Картой онлайн", value: "card_online" },
  { label: "Картой при получении", value: "card_offline" },
  { label: "Наличными при получении", value: "cash" },
].map((item) => (
  <MenuItem key={item.value} value={item.value}>
    {item.label}
  </MenuItem>
));

export const PaymentTypeSelect = (props: PaymentTypeSelectProps) => {
  const { value, onChange } = props;

  return (
    <FormControl fullWidth>
      <InputLabel required>Способ оплаты</InputLabel>
      <Select
        label="Способ оплаты"
        required
        value={value}
        onChange={(e) => onChange(e.target.value as PaymentType)}
      >
        {options}
      </Select>
    </FormControl>
  );
};
