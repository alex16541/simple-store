"use client";
import { signupUser } from "@/entity/User/server";
import { PageTitle } from "@/widgets/PageTitle";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

const SignupPage = () => {
  const searchParams = useSearchParams();
  const signupFrom = searchParams.get("from");

  const [state, action, pending] = useActionState(signupUser, undefined);

  return (
    <Container maxWidth="sm">
      <PageTitle>Зарегистрируйтесь:</PageTitle>
      <Card
        component="form"
        action={action}
        sx={{ borderRadius: 6, m: "0 auto" }}
        variant="outlined"
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            paddingBottom: 0,
          }}
        >
          <TextField
            placeholder="Имя"
            color="success"
            name="name"
            variant="outlined"
            defaultValue={state?.payload?.get("name") ?? ""}
          />
          <TextField
            placeholder="Электронная почта"
            color="success"
            name="email"
            variant="outlined"
            defaultValue={state?.payload?.get("email") ?? ""}
          />
          <TextField
            placeholder="Пароль"
            color="success"
            name="password"
            type="password"
            variant="outlined"
            defaultValue={state?.payload?.get("password") ?? ""}
          />
          <TextField
            placeholder="Повторите пароль"
            color="success"
            name="confirm"
            type="password"
            variant="outlined"
            defaultValue={state?.payload?.get("confirm") ?? ""}
          />
          <input name="from" defaultValue={signupFrom ?? undefined} hidden />
          {state?.message && (
            <Typography textAlign="center" color="error" variant="subtitle1">
              {state.message}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            color="success"
            size="large"
            type="submit"
            disabled={pending}
            endIcon={
              pending ? <CircularProgress color="inherit" size={20} /> : null
            }
          >
           Зарегистрироваться 
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default SignupPage;
