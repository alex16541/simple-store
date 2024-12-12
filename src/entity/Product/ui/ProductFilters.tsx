"use client";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Slider,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { useProductFilters } from "../hooks/useProductFilters";

const rateMarks = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

interface ProductFiltersProps {
  sx?: SxProps;
}

export const ProductFilters = (props: ProductFiltersProps) => {
  const { sx } = props;

  const {
    categories,
    brands,
    selectedCategory,
    selectedBrand,
    selectedPriceMin,
    selectedPriceMax,
    selectedRateRange,
    onChangeMinPrice,
    onChangeMaxPrice,
    onChangeRate,
    onChangeBrand,
    onChangeCategory,
    clearFilters,
    initialLoading,
    minPricePlaceholder,
    maxPricePlaceholder,
  } = useProductFilters();

  return (
    <Card variant="outlined" sx={{ ...sx, borderRadius: 6 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5">Общие фильтры</Typography>
        <Autocomplete
          options={initialLoading ? ["Загрузка..."] : categories}
          onChange={onChangeCategory}
          getOptionDisabled={(item) => item === "Загрузка..."}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Категория"
              value={selectedCategory}
              fullWidth
            />
          )}
        />
        <Stack gap={1}>
          <Typography variant="subtitle1">Цена, руб</Typography>
          <Stack direction="row" gap={1}>
            <TextField
              variant="outlined"
              label="От"
              placeholder={minPricePlaceholder}
              value={selectedPriceMin}
              type="number"
              onChange={onChangeMinPrice}
            />
            <TextField
              onChange={onChangeMaxPrice}
              value={selectedPriceMax}
              variant="outlined"
              label="До"
              placeholder={maxPricePlaceholder}
              type="number"
            />
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Typography variant="subtitle1">Рейтинг</Typography>
          {selectedRateRange && (
            <Slider
              value={selectedRateRange}
              color="success"
              onChange={onChangeRate}
              valueLabelDisplay="auto"
              max={5}
              step={0.1}
              marks={rateMarks}
            />
          )}
        </Stack>
        <Autocomplete
          options={initialLoading ? ["Загрузка..."] : brands}
          getOptionDisabled={(item) => item === "Загрузка..."}
          onChange={onChangeBrand}
          renderInput={(params) => (
            <TextField
              {...params}
              value={selectedBrand}
              name="brand"
              variant="outlined"
              label="Бренд"
              fullWidth
            />
          )}
        />
        <Button
          size="large"
          color="inherit"
          fullWidth
          sx={{ borderRadius: 3 }}
          onClick={clearFilters}
        >
          Отчистить фильтры
        </Button>
      </CardContent>
    </Card>
  );
};
