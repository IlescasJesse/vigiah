import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";

/**
 * GET /api/patients
 * Obtiene la lista de todos los pacientes
 */
export async function GET(request) {
  try {
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
    return NextResponse.json(
      { success: false, error: "Error al crear paciente" },
      { status: 500 }
    );
  }
}
