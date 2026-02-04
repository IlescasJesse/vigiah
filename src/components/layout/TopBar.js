"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Breadcrumbs,
  Link as MuiLink,
  Divider,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  NavigateNext as NavigateNextIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { DRAWER_WIDTH } from "./Sidebar";

// Breadcrumb configuration
const breadcrumbNameMap = {
  "/dashboard": "Dashboard",
  "/pacientes": "Pacientes",
  "/pacientes/nuevo": "Nuevo Paciente",
  "/agenda": "Agenda",
  "/calculadora": "Calculadora de Riesgo",
  "/configuracion": "Configuración",
};

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifAnchor, setNotifAnchor] = React.useState(null);
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    // Cargar datos del usuario desde localStorage solo en el cliente
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Eliminar cookie del servidor
    await fetch("/api/auth/logout", { method: "POST" });

    // Redirigir al login usando window.location para forzar recarga
    window.location.href = "/login";
  };

  const handleNotificationsOpen = (event) => {
    setNotifAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotifAnchor(null);
  };

  // Generate breadcrumbs from pathname
  const pathnames = pathname.split("/").filter((x) => x);

  const breadcrumbs = [
    <MuiLink
      key='home'
      component={Link}
      href='/dashboard'
      underline='hover'
      sx={{
        color: "text.primary",
        "&:hover": { color: "primary.main" },
        display: "flex",
        alignItems: "center",
      }}
    >
      Inicio
    </MuiLink>,
    ...pathnames.map((value, index) => {
      const last = index === pathnames.length - 1;
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      const name =
        breadcrumbNameMap[to] || value.charAt(0).toUpperCase() + value.slice(1);

      return last ? (
        <Typography key={to} color='text.primary' sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
      ) : (
        <MuiLink
          key={to}
          component={Link}
          href={to}
          underline='hover'
          sx={{
            color: "text.primary",
            "&:hover": { color: "primary.main" },
          }}
        >
          {name}
        </MuiLink>
      );
    }),
  ];

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 70 }}>
        {/* Breadcrumbs */}
        <Box sx={{ flex: 1 }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            aria-label='breadcrumb'
            sx={{ mb: 0.5 }}
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Typography variant='caption' sx={{ color: "text.secondary" }}>
            Sistema de Vigilancia Post-ICP
          </Typography>
        </Box>

        {/* Right Section: Notifications & Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Notifications */}
          <IconButton
            size='large'
            color='inherit'
            onClick={handleNotificationsOpen}
            sx={{
              color: "text.primary",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            <Badge badgeContent={3} color='error'>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />

          {/* User Profile */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              borderRadius: 2,
              px: 1.5,
              py: 0.75,
              "&:hover": { backgroundColor: "action.hover" },
            }}
            onClick={handleProfileMenuOpen}
          >
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography
                variant='body2'
                sx={{ fontWeight: 600, color: "text.primary" }}
                suppressHydrationWarning
              >
                {userData?.name || "Usuario"}
              </Typography>
              <Typography
                variant='caption'
                sx={{ color: "text.secondary" }}
                suppressHydrationWarning
              >
                {userData?.role || "Sin rol"}
              </Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 40,
                height: 40,
                fontWeight: 600,
              }}
              suppressHydrationWarning
            >
              {userData?.name?.charAt(0) || "U"}
            </Avatar>
          </Box>
        </Box>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
          },
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <AccountCircleIcon sx={{ mr: 1.5, color: "text.secondary" }} />
          Mi Perfil
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <SettingsIcon sx={{ mr: 1.5, color: "text.secondary" }} />
          Configuración
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1.5, color: "error.main" }} />
          <Typography color='error'>Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={handleNotificationsClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 320,
            maxWidth: 400,
            borderRadius: 2,
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
            Notificaciones
          </Typography>
        </Box>
        <MenuItem onClick={handleNotificationsClose} sx={{ py: 1.5 }}>
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 600, mb: 0.5 }}>
              3 pacientes con citas vencidas
            </Typography>
            <Typography variant='caption' sx={{ color: "text.secondary" }}>
              Hace 2 horas
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose} sx={{ py: 1.5 }}>
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 600, mb: 0.5 }}>
              5 ecocardiogramas pendientes (Mes 5)
            </Typography>
            <Typography variant='caption' sx={{ color: "text.secondary" }}>
              Hace 5 horas
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose} sx={{ py: 1.5 }}>
          <Box>
            <Typography variant='body2' sx={{ fontWeight: 600, mb: 0.5 }}>
              Control LDL bajo 70% en el último mes
            </Typography>
            <Typography variant='caption' sx={{ color: "text.secondary" }}>
              Ayer
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleNotificationsClose}
          sx={{
            justifyContent: "center",
            color: "primary.main",
            fontWeight: 600,
            py: 1.5,
          }}
        >
          Ver todas las notificaciones
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
