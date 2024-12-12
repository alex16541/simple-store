"use client";
import { createTheme } from "@mui/material/styles";
import NextLink, { LinkProps } from "next/link";
import { forwardRef } from "react";

const LinkBehavior = forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkBehavior(props, ref) {
    const { href, ...other } = props;

    return <NextLink ref={ref} href={href} {...other} />;
  },
);

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    dark: true,
    light: true,
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "calc(6* var(--mui-shape-borderRadius))",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "--border-radius": "calc(3* var(--mui-shape-borderRadius))",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "var(--border-radius)",
        },
      },
    },
  },
});
