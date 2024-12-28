import { EmailLoginForm } from "@/entity/User/ui/EmailLoginForm";
import { getSession } from "@/lib/server/session";
import { getRouteLogoutPage } from "@/shared/router/routes";
import { PageTitle } from "@/widgets/PageTitle";
import { Container } from "@mui/material";
import { redirect } from "next/navigation";
interface LoginPageProps {
  searchParams: Promise<{ from?: string }>;
}
const LoginPage = async (props: LoginPageProps) => {
  const { searchParams } = props;
  const { from } = await searchParams;
  const user = await getSession();

  if (user) return redirect(getRouteLogoutPage(from));

  return (
    <Container maxWidth="sm">
      <PageTitle>Войдите в свой акаунт:</PageTitle>
      <EmailLoginForm redirectPath={from} />
    </Container>
  );
};

export default LoginPage;
