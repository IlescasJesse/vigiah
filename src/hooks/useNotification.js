"use client";

import * as React from "react";
import { Snackbar, Alert } from "@mui/material";

/**
 * Hook personalizado para notificaciones con MUI
 * Uso profesional para aplicaciones médicas
 */
export default function useNotification() {
  const [notification, setNotification] = React.useState({
    open: false,
    message: "",
    severity: "info", // 'success', 'error', 'warning', 'info'
  });

  const showNotification = React.useCallback((message, severity = "info") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  }, []);

  const hideNotification = React.useCallback(() => {
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

  const NotificationComponent = React.useMemo(
    () => (
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={hideNotification}
          severity={notification.severity}
          variant='filled'
          sx={{ width: "100%", fontWeight: 500 }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    ),
    [notification, hideNotification],
  );

  return {
    showSuccess: (message) => showNotification(message, "success"),
    showError: (message) => showNotification(message, "error"),
    showWarning: (message) => showNotification(message, "warning"),
    showInfo: (message) => showNotification(message, "info"),
    NotificationComponent,
  };
}
