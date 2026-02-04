"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
} from "@mui/icons-material";

/**
 * ConfirmDialog - Dialog profesional para confirmaciones médicas
 *
 * @param {boolean} open - Estado de apertura del dialog
 * @param {function} onClose - Callback al cerrar
 * @param {function} onConfirm - Callback al confirmar
 * @param {string} title - Título del dialog
 * @param {string} message - Mensaje principal
 * @param {string} type - Tipo: 'warning', 'error', 'info', 'success'
 * @param {string} confirmText - Texto del botón confirmar
 * @param {string} cancelText - Texto del botón cancelar
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message = "¿Está seguro de realizar esta acción?",
  type = "warning",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "primary",
}) {
  const getIcon = () => {
    switch (type) {
      case "error":
        return <ErrorIcon sx={{ fontSize: 48, color: "error.main" }} />;
      case "warning":
        return <WarningIcon sx={{ fontSize: 48, color: "warning.main" }} />;
      case "info":
        return <InfoIcon sx={{ fontSize: 48, color: "info.main" }} />;
      case "success":
        return <SuccessIcon sx={{ fontSize: 48, color: "success.main" }} />;
      default:
        return <InfoIcon sx={{ fontSize: 48, color: "primary.main" }} />;
    }
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {getIcon()}
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "text.primary", fontSize: "1rem" }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant='outlined' color='inherit'>
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant='contained'
          color={confirmColor}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
