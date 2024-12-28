import { Box, SxProps, Toolbar } from "@mui/material";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Breadcrumbs } from "./Breadcrumbs";
import { AppSearch } from "./AppSearch";
import { CartButton } from "./CartButton";
import { AvatarMenu } from "@/features/AvatarMenu";

const appHeaderSx: SxProps = {
  bgcolor: `rgba('palette.background.default.mainChannel' / 0.5)`,
  position: "sticky",
  top: 0,
  zIndex: "appBar",
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${"palette.divider"}`,
};

export const AppHeader = async () => {
  return (
    <Box sx={appHeaderSx} component={"header"}>
      <Toolbar sx={{ gap: 2 }}>
        <Breadcrumbs sx={{ display: ["none", "block"] }} />
        <Box flexGrow={1}>
          <AppSearch />
        </Box>
        <ThemeSwitcher />
        <CartButton />
        <AvatarMenu />
      </Toolbar>
    </Box>
  );
};
