import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";
import { calculateRisk } from "@/lib/riskCalculator";

/**
 * POST /api/patients/[id]/visits
 * Agrega una nueva visita al paciente y calcula el riesgo
 */
export async function POST(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    const patient = await Patient.findById(params.id);

    if (!patient) {
      return NextResponse.json(
        { success: false, error: "Paciente no encontrado" },
        { status: 404 }
      );
    }

    // Crear la nueva visita
    const newVisit = {
      visitDate: body.visitDate || new Date(),
      visitNumber: body.visitNumber || patient.visits.length + 1,
      weight: body.weight,
      systolicBP: body.systolicBP,
      diastolicBP: body.diastolicBP,
      ldl: body.ldl,
      hba1c: body.hba1c,
      lvef: body.lvef,
      notes: body.notes,
      medications: body.medications || [],
    };

    // Calcular el riesgo usando la función utilitaria
    const riskData = {
      baselineLDL: patient.baselineLDL,
      currentLDL: newVisit.ldl,
      isDiabetic: patient.isDiabetic,
      currentHbA1c: newVisit.hba1c,
      baselineLVEF: patient.baselineLVEF,
      currentLVEF: newVisit.lvef,
      visitNumber: newVisit.visitNumber,
    };

    const riskResult = calculateRisk(riskData);

    // Agregar los resultados del análisis de riesgo a la visita
    newVisit.lipidControl = riskResult.lipidControl;
    newVisit.glycemicControl = riskResult.glycemicControl;
    newVisit.alerts = riskResult.alerts;

    // Agregar la visita al array de visitas del paciente
    patient.visits.push(newVisit);

    // Guardar el paciente actualizado
    await patient.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          visit: newVisit,
          riskAnalysis: riskResult,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al agregar visita:", error);
    return NextResponse.json(
      { success: false, error: "Error al agregar visita" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/patients/[id]/visits
 * Obtiene todas las visitas de un paciente
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
      count: patient.visits.length,
      data: patient.visits,
    });
  } catch (error) {
    console.error("Error al obtener visitas:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener visitas" },
      { status: 500 }
    );
  }
}
