import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/login", "/api/auth/login"];

  // Si la ruta es pública, permitir acceso
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Para rutas protegidas, verificar token en el header
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  // Si no hay token en el header, verificar en cookies
  const cookieToken = request.cookies.get("token")?.value;

  // Si no hay token, redirigir al login
  if (!token && !cookieToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

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
    "/((?!_next/static|_next/image|favicon.ico|img).*)",
  ],
};
