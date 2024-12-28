import { Container, Typography, Stack, Button } from "@mui/material";
import { redirect } from "next/navigation";
import { removeSession } from "@/lib/server/session";

interface LogoutPageProps {
  searchParams: Promise<{ from?: string }>;
}

const LogoutPage = async (props: LogoutPageProps) => {
  const { searchParams } = props;
  const { from } = await searchParams;

  const onLogout = async () => {
    "use server";

    await removeSession();

    redirect("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={1}
        mt={3}
      >
        Вы уже авторизированы&nbsp;🌞
      </Typography>
      <Typography variant="subtitle1" textAlign="center" mb={2}>
        Выйти и зайти под другим пользователем?
      </Typography>
      <Stack gap={1} direction={["column", "row"]}>
        <Button href={from ?? '/'} color="success" variant="outlined" fullWidth>
          Нет, вернуться назад
        </Button>
        <Button
          onClick={onLogout}
          color="success"
          variant="contained"
          fullWidth
        >
          Да, выйти
        </Button>
      </Stack>
    </Container>
  );
};

export default LogoutPage;
