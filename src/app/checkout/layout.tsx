"use client";
import { CheckoutProgress } from "@/entity/Checkout";
import { selectCheckoutInited } from "@/entity/Checkout/model/selectors/checkoutSlectors";
import { useAppSelector } from "@/lib/store/hooks";
import { Card, CircularProgress, Container, Stack } from "@mui/material";

const CheckoutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isCheckoutInited = useAppSelector(selectCheckoutInited);

  return (
    <Container sx={{ paddingY: 2 }}>
      <Stack gap={3}>
        <CheckoutProgress />

        <Card
          sx={{
            padding: 2,
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {isCheckoutInited ? (
            children
          ) : (
            <Stack alignItems="center">
              <CircularProgress color="success" />
            </Stack>
          )}
        </Card>
      </Stack>
    </Container>
  );
};

export default CheckoutLayout;
