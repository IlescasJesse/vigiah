"use client";

import * as React from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar, { DRAWER_WIDTH } from "./Sidebar";
import TopBar from "./TopBar";

/**
 * Main Layout Component for VIGIAH
 * Implements persistent sidebar and top bar navigation
 */
export default function MainLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        {/* Top Bar */}
        <TopBar />
        {/* Page Content */}
        <Toolbar sx={{ minHeight: 70 }} /> {/* Spacer for AppBar */}
        <Box
          sx={{
            p: 3,
            minHeight: "calc(100vh - 70px)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
