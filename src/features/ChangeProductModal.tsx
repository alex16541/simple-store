"use client";

import { Product } from "@/entity/Product";
import { updateProduct } from "@/entity/Product/server";
import { ModalHeader } from "@/shared/ui/ModalHeader";
import { NumericFormat } from "react-number-format";
import {
  Button,
  TextField,
  Stack,
  InputAdornment,
  Dialog,
  Typography,
} from "@mui/material";
import { useActionState, useState } from "react";

interface ChangeProductModalProps {
  product: Product;
}

export const ChangeProductModal = (props: ChangeProductModalProps) => {
  const { product } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [state, action, isPending] = useActionState(updateProduct, {});
  const [price, setPrice] = useState(product.price);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onSubmit = (data: FormData) => {
    data.set("id", product.id);
    data.set("price", price);

    action(data);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={onOpen} color="success" sx={{ width: "100%" }}>
        Редактировать продукт
      </Button>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          component: "form",
          variant: "outlined",
          action: onSubmit,
          sx: {
            p: 4,
            borderRadius: 6,
            width: "100%",
            maxWidth: "600px",
          },
        }}
      >
        <ModalHeader
          title={`Редактор продукта #${product.id}:`}
          onClose={onClose}
        />
        <Stack gap={2}>
          <TextField
            name="name"
            label="Name"
            defaultValue={product.name}
            color="success"
            required
          />
          <TextField
            name="description"
            label="Description"
            defaultValue={product.description}
            color="success"
            multiline
          />
          <NumericFormat
            customInput={TextField}
            label="Price"
            decimalScale={2}
            thousandSeparator=" "
            fixedDecimalScale
            onValueChange={(value) => setPrice(value.value)}
            color="success"
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              },
            }}
            defaultValue={product.price}
          />
          <TextField
            name="brand"
            color="success"
            label="Brand"
            defaultValue={product.brand}
          />
          <TextField
            name="category"
            color="success"
            label="Category"
            defaultValue={product.category}
          />
          <NumericFormat
            name="stock"
            label="Stock"
            defaultValue={product.stock}
            color="success"
            thousandSeparator=" "
            decimalScale={0}
            customInput={TextField}
          />
          {state?.message && (
            <Typography color="warning">{state.message}</Typography>
          )}
          <Button
            disabled={isPending}
            color="success"
            type="submit"
            size="large"
          >
            Сохранить изменения
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};
