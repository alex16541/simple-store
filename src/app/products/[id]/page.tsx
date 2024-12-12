import { Container } from "@mui/material";
import {
  getProduct,
  Product,
  ProductTabs,
} from "@/entity/Product";
import { ProductDetailsCard } from "@/widgets/ProductDetailsCard";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async (props: ProductPageProps) => {
  const { params } = props;
  const { id } = await params;
  const product: Product = await getProduct(+id);

  return (
    <Container sx={{ paddingY: 2 }}>
      <ProductDetailsCard product={product} />
      <ProductTabs />
    </Container>
  );
};

export default ProductPage;
