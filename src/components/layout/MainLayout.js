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
          minHeight: "100vh",
        }}
      >
        {/* Top Bar */}
        <TopBar />
        {/* Page Content */}
        <Box
          sx={{
            p: 3,
            mt: "70px",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
