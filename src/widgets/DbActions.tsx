"use client";
import {
  createProduct,
  createProductsTable,
  getCategories,
  getProducts,
} from "@/entity/Product/actions";
import { Product } from "@/entity/Product";
import { Button, Paper } from "@mui/material";
interface DbActionsProps {
  product?: Product;
}
export const DbActions = (props: DbActionsProps) => {
  const { product } = props;
  return (
    <Paper variant="outlined">
      <Button onClick={() => createProductsTable()}>Создать таблицу</Button>
      {product && (
        <Button onClick={() => createProduct({ ...product })}>
          Копировать продукт
        </Button>
      )}
      <Button onClick={async () => console.log(await getProducts())}>
        Получить продукты
      </Button>
      <Button onClick={async () => console.log(await getCategories())}>
        Получить категории
      </Button>
    </Paper>
  );
};
