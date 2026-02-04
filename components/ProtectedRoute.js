"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Rutas públicas
  const publicRoutes = ["/login"];

  useEffect(() => {
    // Si estamos en una ruta pública, no hacer nada
    if (publicRoutes.includes(pathname)) {
      return;
    }

    // Verificar autenticación
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      // No hay sesión, redirigir al login
      router.push("/login");
    }
  }, [pathname, router]);

  // Mostrar loader mientras se verifica
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!isPublicRoute && !token) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
