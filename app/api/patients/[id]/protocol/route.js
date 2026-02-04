import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Patient from "@/models/Patient";

/**
 * POST /api/patients/[id]/protocol
 * Guardar o actualizar el progreso de un paso del protocolo
 */
export async function POST(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await request.json();

    const {
      stepId,
      stepLabel,
      formData,
      completed,
      notes,
      completedBy,
      protocolUnlocked,
      unlockedBy,
      unlockedAt,
      lockedBy,
      lockedAt,
    } = body;

    // Buscar el paciente
    const patient = await Patient.findById(id);

    if (!patient) {
      return NextResponse.json(
        { error: "Paciente no encontrado" },
        { status: 404 },
      );
    }

    // Si se está actualizando el estado de desbloqueo del protocolo
    if (protocolUnlocked !== undefined) {
      patient.protocolUnlocked = protocolUnlocked;
      if (protocolUnlocked) {
        patient.unlockedBy = unlockedBy;
        patient.unlockedAt = unlockedAt;
      } else {
        patient.unlockedBy = lockedBy;
        patient.unlockedAt = lockedAt;
      }
      await patient.save();

      return NextResponse.json(
        {
          success: true,
          message: protocolUnlocked
            ? "Protocolo desbloqueado exitosamente"
            : "Protocolo bloqueado exitosamente",
          data: {
            protocolUnlocked: patient.protocolUnlocked,
            unlockedBy: patient.unlockedBy,
            unlockedAt: patient.unlockedAt,
          },
        },
        { status: 200 },
      );
    }

    // Validar datos requeridos para guardar un paso
    if (stepId === undefined || !stepLabel) {
      return NextResponse.json(
        { error: "stepId y stepLabel son requeridos" },
        { status: 400 },
      );
    }

    // Buscar si ya existe el paso en protocolSteps
    const existingStepIndex = patient.protocolSteps.findIndex(
      (step) => step.stepId === stepId,
    );

    const stepData = {
      stepId,
      stepLabel,
      formData: formData || {},
      completed: completed || false,
      completedAt: completed ? new Date() : null,
      completedBy: completedBy || null,
      notes: notes || null,
    };

    if (existingStepIndex >= 0) {
      // Actualizar paso existente
      patient.protocolSteps[existingStepIndex] = {
        ...patient.protocolSteps[existingStepIndex].toObject(),
        ...stepData,
        // Mantener completedAt original si ya estaba completado y no se está re-completando
        completedAt: completed
          ? patient.protocolSteps[existingStepIndex].completed
            ? patient.protocolSteps[existingStepIndex].completedAt
            : new Date()
          : null,
      };
    } else {
      // Agregar nuevo paso
      patient.protocolSteps.push(stepData);
    }

    // Guardar cambios
    await patient.save();

    // Obtener el progreso actualizado
    const progress = patient.getProtocolProgress();

    return NextResponse.json(
      {
        success: true,
        message: "Progreso del protocolo guardado exitosamente",
        data: {
          step: patient.protocolSteps.find((s) => s.stepId === stepId),
          progress,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al guardar progreso del protocolo:", error);
    return NextResponse.json(
      {
        error: "Error al guardar progreso del protocolo",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

/**
 * GET /api/patients/[id]/protocol
 * Obtener el progreso completo del protocolo de un paciente
 */
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    // Buscar el paciente
    const patient = await Patient.findById(id);

    if (!patient) {
      return NextResponse.json(
        { error: "Paciente no encontrado" },
        { status: 404 },
      );
    }

    // Obtener el progreso del protocolo
    const progress = patient.getProtocolProgress();

    return NextResponse.json(
      {
        success: true,
        data: {
          patientId: patient._id,
          interventionDate: patient.interventionDate,
          protocolSteps: patient.protocolSteps || [],
          protocolUnlocked: patient.protocolUnlocked || false,
          unlockedBy: patient.unlockedBy,
          unlockedAt: patient.unlockedAt,
          progress,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al obtener progreso del protocolo:", error);
    return NextResponse.json(
      {
        error: "Error al obtener progreso del protocolo",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
