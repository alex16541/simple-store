import { OrderStatus } from "../types/order";

export const statusTextMap: Record<OrderStatus, string> = {
  pending: 'Доставляем',
  paid: 'Оплачен',
  delivired: 'Уже у вас',
  cancelled: 'Осменён',
}
