import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/login"];
  const publicApiRoutes = ["/api/auth/login"];

  // Si la ruta es pública, permitir acceso
  if (
    publicRoutes.some((route) => pathname === route) ||
    publicApiRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // Para rutas protegidas, verificar que exista un token
  const token = request.cookies.get("token")?.value;

  if (!token) {
    // Si es una API, retornar 401
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { success: false, message: "No autorizado - Token requerido" },
        { status: 401 }
      );
    }

    // Si es una página, redirigir al login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Token existe, permitir acceso
  // La validación completa del token se hace en las rutas de API con requireAuth()
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - img folder
     */
    "/((?!_next/static|_next/image|favicon.ico|img|public).*)",
  ],
};
