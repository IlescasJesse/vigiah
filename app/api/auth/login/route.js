import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../../../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "vigiah-secret-key-2026";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validaciones
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Respuesta exitosa (sin incluir password)
    const { password: _, ...userWithoutPassword } = user;

    // Crear respuesta con cookie
    const response = NextResponse.json({
      message: "Login exitoso",
      token,
      user: userWithoutPassword,
    });

    // Establecer cookie HTTP-only con el token
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
