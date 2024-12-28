"use client";
import {
  IconButton,
  Badge,
  Drawer,
  Typography,
  Box,
  Stack,
  SxProps,
  Fab,
} from "@mui/material";
import FilterIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ProductFilters } from "./ProductFilters";
import { useSearchParams } from "next/navigation";

interface ProductFiltersButtonProps {
  sx?: SxProps;
}

export const ProductFiltersFab = (props: ProductFiltersButtonProps) => {
  const { sx } = props;
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  return (
    <>
      <Fab onClick={() => setIsOpen(true)} sx={sx} color="success">
        <Badge badgeContent={searchParams.size}>
          <FilterIcon />
        </Badge>
      </Fab>
      <Drawer
        PaperProps={{
          variant:"outlined",
          sx: {
            borderRadius: [0, 6],
            borderTopRightRadius: [0, 0],
            borderBottomRightRadius: [0, 0],
            border: [0, 1],
            borderColor: ['divider', 'divider'] 
          },
        }}
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box sx={{ width: ["100vw", 500, 500, 600], padding: 3 }}>
          <Stack direction="row" justifyContent="space-between" gap={2} mb={2}>
            <Typography variant="h5">Фильтры</Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <ProductFilters />
        </Box>
      </Drawer>
    </>
  );
};
