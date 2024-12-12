import { Container, Grid2 } from "@mui/material";
import { PageTitle } from "@/widgets/PageTitle";
import {
  ProductsList,
  Product,
  getProducts,
  ProductFilters,
  ProductFiltersFab,
} from "@/entity/Product";

interface ProductsPageProsp {
  searchParams: Promise<Record<string, string>>;
}
const ProductsPage = async (props: ProductsPageProsp) => {
  const { searchParams: params } = props;
  const searchParams = await params;
  const products: Product[] = await getProducts(searchParams);

  return (
    <Container sx={{ paddingBottom: 2 }} maxWidth="xl">
      <PageTitle>Ваши рекоммендации</PageTitle>
      <Grid2 container columnSpacing={2}>
        <Grid2 size={[12, 12, 12, 9]}>
          <ProductsList products={products} />
        </Grid2>
        <Grid2 size={[0, 0, 0, 3]} display={["none", "none", "none", "block"]}>
          <ProductFilters/>
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
