"use client";

import Link from "next/link";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import { useAuth } from "hooks/useAuth";
import { useLogout } from "hooks/useLogout";

export default function HeaderLogin() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { user, isAuthenticated, isLoading } = useAuth();
  const { logout, isLoading: isLoggingOut } = useLogout();
  
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
  };

  // Si está cargando, mostrar un botón simple
  if (isLoading) {
    return (
      <IconButton disabled>
        <AccountCircleOutlined sx={{ color: "grey.600" }} />
      </IconButton>
    );
  }

  // Si no está autenticado, mostrar botón de login
  if (!isAuthenticated) {
    return (
      <IconButton LinkComponent={Link} href="/login">
        <AccountCircleOutlined sx={{ color: "grey.600" }} />
      </IconButton>
    );
  }

  // Si está autenticado, mostrar menú de usuario
  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar 
          sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
          alt={user?.name || user?.username || "Usuario"}
        >
          {(user?.name || user?.username || "U").charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {user?.name || user?.username || "Usuario"}
          </Typography>
        </MenuItem>
        <MenuItem disabled>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </MenuItem>
        
        <MenuItem component={Link} href="/orders" onClick={handleClose}>
          <Person sx={{ mr: 1 }} fontSize="small" />
          Mis Pedidos
        </MenuItem>
        
        <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
          <Logout sx={{ mr: 1 }} fontSize="small" />
          {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
        </MenuItem>
      </Menu>
    </>
  );
}
