import { Grid2 } from "@mui/material";
import { Product } from "../model/types/product";
import { SmallProductCard } from "../../../widgets/SmallProductCard";
interface ProductsListProps {
  products?: Product[];
}
export const ProductsList = (props: ProductsListProps) => {
  const { products = [] } = props;
  return (
    <Grid2 container spacing={2}>
      {products.map((product) => (
        <Grid2 key={product.id} size={[12, 6, 4, 4]}>
          <SmallProductCard product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
};
