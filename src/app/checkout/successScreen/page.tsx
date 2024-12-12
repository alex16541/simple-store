import { getRouteOrderPage } from "@/shared/router/routes"
import { Typography, Button } from "@mui/material"

const SuccessScreenStep = () => {
        // lastCreatedOrderId = useAppSelector(selectLastCreatedOrder)
  return (
        <Typography>Заказ успешно создан! <Button href={getRouteOrderPage(1)}>Перейти на страницу заказ</Button></Typography>
  )
}

export default SuccessScreenStep;
