import { OrderStatus } from "../types/order";

export const statusTextMap: Record<OrderStatus, string> = {
  pending: 'Доставляем',
  paid: 'Оплачен',
  delivered: 'Уже у вас',
  cancelled: 'Осменён',
}
