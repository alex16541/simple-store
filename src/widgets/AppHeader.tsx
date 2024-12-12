"use client";
import { alpha, Box, styled, Toolbar } from "@mui/material";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Breadcrumbs } from "./Breadcrumbs";
import { AppSearch } from "./AppSearch";
import { CartButton } from "./CartButton";

const AppBar = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    bgcolor: alpha(theme.palette.background.default, 0.5),
    position: "sticky",
    top: 0,
    zIndex: "appBar",
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
) as typeof Box;

export const AppHeader = () => {
  return (
    <AppBar component={"header"}>
      <Toolbar sx={{ gap: 2 }}>
        <Breadcrumbs sx={{ display: ["none", "block"] }} />
        <Box flexGrow={1}>
          <AppSearch />
        </Box>
        <ThemeSwitcher />
        <CartButton />
      </Toolbar>
    </AppBar>
  );
};
