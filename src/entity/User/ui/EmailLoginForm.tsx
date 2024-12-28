'use client';
import { useActionState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { loginUser } from "../server";

interface EmailLoginFormProps {
  redirectPath?: string;
}

export const EmailLoginForm = (props: EmailLoginFormProps) => {
  const { redirectPath } = props;
  const [state, action, pending] = useActionState(loginUser, undefined);
  return (
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
        <input name="from" defaultValue={redirectPath ?? undefined} hidden />
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
          Войти
        </Button>
      </CardActions>
    </Card>
  );
};
