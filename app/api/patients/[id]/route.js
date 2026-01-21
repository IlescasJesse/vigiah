import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";

/**
 * GET /api/patients/[id]
 * Obtiene un paciente específico por ID
 */
export async function GET(request, { params }) {
  try {
    await connectDB();

    const patient = await Patient.findById(params.id);

    if (!patient) {
      return NextResponse.json(
        { success: false, error: "Paciente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Error al obtener paciente:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener paciente" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/patients/[id]
 * Actualiza un paciente existente
 */
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    const patient = await Patient.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      return NextResponse.json(
        { success: false, error: "Paciente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar paciente" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/patients/[id]
 * Elimina un paciente (soft delete - cambia status a INACTIVO)
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const patient = await Patient.findByIdAndUpdate(
      params.id,
      { status: "INACTIVO" },
      { new: true }
    );

    if (!patient) {
      return NextResponse.json(
        { success: false, error: "Paciente no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    return NextResponse.json(
      { success: false, error: "Error al eliminar paciente" },
      { status: 500 }
    );
  }
}
