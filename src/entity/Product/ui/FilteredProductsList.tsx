"use client";
import { CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import { ProductFilters } from "./ProductFilters";
import { ProductsList } from "./ProductsList";
import { Product } from "../model/types/product";
import { useEffect, useState } from "react";
import { getProducts } from "../actions";
export const FilteredProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchData().finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <Stack
        gap={2}
        alignItems={"center"}
        height={"300px"}
        justifyContent={"center"}
      >
        <CircularProgress color="success" />
        <Typography>Загрузка страницы</Typography>
      </Stack>
    );

  return (
    <Grid2 container>
      <Grid2 size={[12, 12, 12, 9]}>
        <ProductsList products={products} />
      </Grid2>
      <Grid2 size={[0, 0, 0, 3]} display={["none", "none", "none", "block"]}>
        <ProductFilters />
      </Grid2>
    </Grid2>
  );
};
