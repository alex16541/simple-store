import { DbActions } from "@/widgets/DbActions";
import { PageTitle } from "@/widgets/PageTitle";
import { Container } from "@mui/material";

const AdminPage = () => {
  return (
    <Container>
      <PageTitle>Admin Page</PageTitle>
      <DbActions />
    </Container>
  );
};

export default AdminPage;
