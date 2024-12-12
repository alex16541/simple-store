import { Product } from "@/entity/Product";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { userActions } from "../model/slices/UserSlice";
interface UseUserCartProps {
  product: Product;
}
export const useUserCart = (props: UseUserCartProps) => {
  const { product } = props;

  const dispatch = useAppDispatch();
  const inCartQuantity = useAppSelector(
    (store) =>
      store.User.cart.find((item) => item.productData.id === product.id)
        ?.quantity ?? 0,
  );

  const onAddToCart = () => {
    dispatch(userActions.addProductToCart(product));
  };

  const onDeleteFromCart = () => {
    dispatch(userActions.deleteProductFromCart(product.id));
  };

  return {
    inCartQuantity,
    onAddToCart,
    onDeleteFromCart,
  };
};
