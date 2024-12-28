"use client";
import { styled, alpha, SxProps } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { KeyboardEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getRouteProductsPage } from "@/shared/router/routes";
import { toggleSearchParams } from "@/shared/lib/ToggleSearchParams";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius * 6,
  backgroundColor: alpha(theme.palette.common.black, 0.2),
  color: theme.palette.getContrastText(alpha(theme.palette.common.black, 0.2)),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.8),
    color: theme.palette.getContrastText(
      alpha(theme.palette.common.black, 0.8),
    ),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapperSx: SxProps = {
  padding: 2,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export const AppSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue] = useState(searchParams.get("search") ?? "");

  const handleEnterClick = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key !== "Enter") return;

    if (pathname.startsWith(getRouteProductsPage())) {
      const newParams = toggleSearchParams(
        { search: target.value.trim() },
        searchParams,
      );

      const newPathname = `${pathname}?${newParams.toString()}`;

      router.push(newPathname);
    } else {
      router.push(getRouteProductsPage() + `?search=${target.value}`);
    }
  };

  return (
    <Search>
      <Box sx={SearchIconWrapperSx}>
        <SearchIcon />
      </Box>
      <StyledInputBase
        placeholder="Поиск товаров…"
        inputProps={{ "aria-label": "Поиск товаров" }}
        defaultValue={searchValue}
        onKeyDown={handleEnterClick}
      />
    </Search>
  );
};
