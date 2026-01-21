"use client";

import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Rutas que no deben tener el MainLayout (sidebar + topbar)
  const publicRoutes = ["/login"];

  const isPublicRoute = publicRoutes.includes(pathname);

  // Si es una ruta pública, devolver children sin layout
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Para rutas protegidas, usar el MainLayout
  return <MainLayout>{children}</MainLayout>;
}
