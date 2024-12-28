import { Container } from "@mui/material";
import {
  getProduct,
  Product,
} from "@/entity/Product";
import { ProductDetailsCard } from "@/widgets/ProductDetailsCard";
import { getSession } from "@/lib/server/session";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async (props: ProductPageProps) => {
  const { params } = props;
  const { id } = await params;
  const product: Product = await getProduct(+id);
  const user = await getSession();

  return (
    <Container sx={{ paddingY: 2 }}>
      <ProductDetailsCard product={product} userRole={user?.role ?? 'customer'} />
      {/* <ProductTabs /> */}
    </Container>
  );
};

export default ProductPage;
