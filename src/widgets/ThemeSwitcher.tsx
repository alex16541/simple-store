"use client";
import { CircularProgress, IconButton, useColorScheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const ThemeSwitcher = () => {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return <CircularProgress color="success" />;
  }

  return (
    <IconButton onClick={() => setMode(mode === "light" ? "dark" : "light")}>
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};
