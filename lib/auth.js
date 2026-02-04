import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "vigiah-secret-key-2026";

/**
 * Verifica el token JWT desde cookies o header
 * @param {Request} request - Next.js request object
 * @returns {Object|null} - Payload del token o null si es inválido
 */
export function verifyToken(request) {
  try {
    // Intentar obtener token del header Authorization
    const authHeader = request.headers.get("authorization");
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // Si no hay token en header, buscar en cookies
    if (!token) {
      const cookieToken = request.cookies.get("token")?.value;
      if (cookieToken) {
        token = cookieToken;
      }
    }

    // Si no hay token, retornar null
    if (!token) {
      return null;
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verificando token:", error.message);
    return null;
  }
}

/**
 * Verifica token desde cookies (para middleware)
 * @param {string} token - Token JWT
 * @returns {Object|null} - Payload del token o null si es inválido
 */
export function verifyTokenFromString(token) {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verificando token:", error.message);
    return null;
  }
}

/**
 * Middleware de autenticación para rutas API
 * Uso: const user = requireAuth(request);
 */
export function requireAuth(request) {
  const user = verifyToken(request);
  
  if (!user) {
    throw new Error("No autorizado");
  }
  
  return user;
}

/**
 * Genera un nuevo token JWT
 */
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}
