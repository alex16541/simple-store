import { Typography } from "@mui/material";
import { ReactNode } from "react";

export const PageTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Typography variant="h4" fontWeight="bold" gutterBottom marginTop={2}>
      {children}
    </Typography>
  );
};
