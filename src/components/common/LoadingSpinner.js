"use client";

import * as React from "react";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";

/**
 * LoadingSpinner - Indicador de carga profesional
 *
 * @param {string} variant - 'circular', 'linear', 'overlay'
 * @param {string} message - Mensaje a mostrar
 * @param {string} size - Tamaño: 'small', 'medium', 'large'
 */
export default function LoadingSpinner({
  variant = "circular",
  message = "Cargando...",
  size = "medium",
  fullscreen = false,
}) {
  const getSizeValue = () => {
    switch (size) {
      case "small":
        return 24;
      case "large":
        return 60;
      default:
        return 40;
    }
  };

  if (variant === "linear") {
    return (
      <Box sx={{ width: "100%", mb: 2 }}>
        <LinearProgress />
        {message && (
          <Typography
            variant='body2'
            color='text.secondary'
            align='center'
            sx={{ mt: 1 }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: fullscreen ? 4 : 2,
      }}
    >
      <CircularProgress size={getSizeValue()} />
      {message && (
        <Typography
          variant='body2'
          color='text.secondary'
          align='center'
          sx={{ fontWeight: 500 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullscreen) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(255, 255, 255, 0.9)",
          zIndex: 9999,
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
}
