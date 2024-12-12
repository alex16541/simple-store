import { getRouteCheckoutDeliveryAddressPage } from "@/shared/router/routes"
import { redirect } from "next/navigation"

const CheckoutPage = () => {
  return redirect(getRouteCheckoutDeliveryAddressPage());
}

export default CheckoutPage;
