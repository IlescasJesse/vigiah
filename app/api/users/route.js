import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * GET /api/users
 * Obtiene la lista de usuarios (MySQL via Prisma)
 */
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users
 * Crea un nuevo usuario
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    // Validar campos requeridos
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email y password son requeridos" },
        { status: 400 }
      );
    }

    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "RESIDENTE",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear usuario:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "El email ya está registrado" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
