"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showNotification = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.email || !formData.password) {
      showNotification("Por favor complete todos los campos", "warning");
      return;
    }

    if (!formData.email.includes("@")) {
      showNotification("Por favor ingrese un correo válido", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token y datos del usuario en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        showNotification("¡Inicio de sesión exitoso!", "success");

        // Redirigir al dashboard usando window.location para forzar recarga completa
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        showNotification(data.message || "Credenciales incorrectas", "error");
      }
    } catch (error) {
      console.error("Error de login:", error);
      showNotification("Error al conectar con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #003366 0%, #00AEEF 100%)",
        padding: 3,
        margin: 0,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: "100%",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 200,
                height: 120,
                mb: 2,
              }}
            >
              <Image
                src='/img/hreo.png'
                alt='HREO Logo'
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: 1,
              }}
            >
              VIGIAH
            </Typography>
            <Typography variant='body2' color='text.secondary' align='center'>
              Sistema de Vigilancia e Indicadores de Gestión
            </Typography>
          </Box>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label='Correo Electrónico'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailIcon color='action' />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label='Contraseña'
              name='password'
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon color='action' />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge='end'
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant='contained'
              type='submit'
              size='large'
              disabled={loading}
              sx={{
                py: 1.5,
                fontWeight: 600,
                mb: 2,
              }}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          {/* Credenciales de prueba */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "grey.50",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ fontWeight: 600 }}
            >
              Credenciales de prueba:
            </Typography>
            <Typography
              variant='caption'
              display='block'
              color='text.secondary'
            >
              Admin: admin@vigiah.com / Admin123!
            </Typography>
            <Typography
              variant='caption'
              display='block'
              color='text.secondary'
            >
              Médico: dr.cardio@vigiah.com / Medico123!
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
