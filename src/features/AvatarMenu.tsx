"use client";
import { Logout } from "@mui/icons-material";
import { IconButton, Avatar, Menu, ListItemIcon, MenuItem } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRouteLogoutPage } from "@/shared/router/routes";
import { selectUserData } from "@/entity/User";
import { useAppSelector } from "@/lib/store/hooks";

export const AvatarMenu = () => {

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectUserData);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onLogout = () => {
    router.push(getRouteLogoutPage())
  }

  if(!user) return null;

  return (
    <>
      <IconButton
        ref={setAnchorEl}
        onClick={handleClick}
        size="small"
        aria-controls={isOpen ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'text.primary'}}>{user?.name.slice(0,1)}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <Divider /> */}
        {/* <MenuItem onClick={handleClose}> */}
        {/*   <ListItemIcon> */}
        {/*     <PersonAdd fontSize="small" /> */}
        {/*   </ListItemIcon> */}
        {/*   Add another account */}
        {/* </MenuItem> */}
        {/* <MenuItem onClick={handleClose}> */}
        {/*   <ListItemIcon> */}
        {/*     <Settings fontSize="small" /> */}
        {/*   </ListItemIcon> */}
        {/*   Settings */}
        {/* </MenuItem> */}
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти 
        </MenuItem>
      </Menu>
    </>
  );
};
