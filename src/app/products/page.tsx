import { Container, Grid2, Stack, Typography } from "@mui/material";
import { PageTitle } from "@/widgets/PageTitle";
import {
  ProductsList,
  getProducts,
  ProductFilters,
  ProductFiltersFab,
} from "@/entity/Product";
import { LoadNextPageButton } from "./LoadNextPageButton";

interface ProductsPageProsp {
  searchParams: Promise<Record<string, string>>;
}
const ProductsPage = async (props: ProductsPageProsp) => {
  const { searchParams: params } = props;
  const searchParams = await params;
  const { data: products, totalItems } = await getProducts(searchParams);

  return (
    <Container sx={{ paddingBottom: 2 }} maxWidth="xl">
      <PageTitle>Список товаров</PageTitle>
      <Grid2 container columnSpacing={2}>
        <Grid2 size={[12, 12, 12, 9]}>
          {+totalItems ? (
            <Stack gap={2}>
              <ProductsList products={products} />
              <LoadNextPageButton pageSize={9} totalItems={totalItems} />
            </Stack>
          ) : (
            <Stack>
              <Typography variant="h6">
                Мы ничего не нашли по вашему запросу 😟
              </Typography>
              {!searchParams.size && (
                <Typography>Попробуйте изменить запрос</Typography>
              )}
            </Stack>
          )}
        </Grid2>
        <Grid2 size={[0, 0, 0, 3]} display={["none", "none", "none", "block"]}>
          <ProductFilters />
        </Grid2>
      </Grid2>
      <ProductFiltersFab
        sx={{
          display: ["block", "block", "block", "none"],
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      />
    </Container>
  );
};

export default ProductsPage;
