"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Toolbar,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Calculate as CalculateIcon,
  Settings as SettingsIcon,
  LocalHospital as HospitalIcon,
} from "@mui/icons-material";

const DRAWER_WIDTH = 280;

const navigationItems = [
  { text: "Dashboard", icon: <DashboardIcon />, href: "/dashboard" },
  { text: "Pacientes", icon: <PeopleIcon />, href: "/pacientes" },
  { text: "Agenda", icon: <CalendarIcon />, href: "/agenda" },
  { text: "Calculadora Riesgo", icon: <CalculateIcon />, href: "/calculadora" },
  { text: "Configuración", icon: <SettingsIcon />, href: "/configuracion" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        },
      }}
    >
      {/* Logo Area */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <HospitalIcon
          sx={{
            fontSize: 40,
            color: "primary.main",
          }}
        />
        <Box>
          <Typography
            variant='h5'
            sx={{
              fontWeight: 700,
              color: "primary.main",
              letterSpacing: "-0.5px",
            }}
          >
            VIGIAH
          </Typography>
          <Typography
            variant='caption'
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              display: "block",
              lineHeight: 1.2,
            }}
          >
            Sistema de Seguimiento
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ overflow: "auto", flex: 1, pt: 2 }}>
        <List sx={{ px: 2 }}>
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isActive}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                    },
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? "white" : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.9375rem",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
        <Typography
          variant='caption'
          sx={{
            color: "text.secondary",
            display: "block",
            textAlign: "center",
          }}
        >
          VIGIAH v1.0.0
        </Typography>
        <Typography
          variant='caption'
          sx={{
            color: "text.secondary",
            display: "block",
            textAlign: "center",
          }}
        >
          © 2026 Hospital Público
        </Typography>
      </Box>
    </Drawer>
  );
}

export { DRAWER_WIDTH };
