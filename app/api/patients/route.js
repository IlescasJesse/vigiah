import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";
import { requireAuth } from "@/lib/auth";

/**
 * GET /api/patients
 * Obtiene la lista de todos los pacientes
 */
export async function GET(request) {
  try {
    // Verificar autenticación
    const user = requireAuth(request);
    
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "ACTIVO";

    const patients = await Patient.find({ status })
      .sort({ lastName: 1, firstName: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    
    if (error.message === "No autorizado") {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Error al obtener pacientes" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/patients
 * Crea un nuevo paciente
 */
export async function POST(request) {
  try {
    // Verificar autenticación
    const user = requireAuth(request);
    
    await connectDB();

    const body = await request.json();

    const patient = await Patient.create(body);

    return NextResponse.json(
      {
        success: true,
        data: patient,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear paciente:", error);
    
    if (error.message === "No autorizado") {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Error al crear paciente" },
      { status: 500 }
    );
  }
}
