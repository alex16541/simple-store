import { Box, IconButton, SxProps, Toolbar } from "@mui/material";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { AppSearch } from "./AppSearch";
import { CartButton } from "./CartButton";
import { AvatarMenu } from "@/features/AvatarMenu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

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
        <IconButton href="/">
          <HomeRoundedIcon />
        </IconButton>
        {/* <Breadcrumbs sx={{ display: ["none", "block"] }} /> */}
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
