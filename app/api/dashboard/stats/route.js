import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";
import { calculatePopulationStats } from "@/lib/riskCalculator";

/**
 * GET /api/dashboard/stats
 * Obtiene las estadísticas del dashboard
 */
export async function GET() {
  try {
    await connectDB();

    // Obtener pacientes activos
    const activePatients = await Patient.find({ status: "ACTIVO" }).lean();

    // Contar pacientes activos
    const activeCount = activePatients.length;

    // Preparar datos para el cálculo de estadísticas
    const patientsWithData = activePatients
      .map((patient) => {
        const lastVisit =
          patient.visits && patient.visits.length > 0
            ? patient.visits[patient.visits.length - 1]
            : null;

        if (!lastVisit) return null;

        return {
          baselineLDL: patient.baselineLDL,
          currentLDL: lastVisit.ldl,
          isDiabetic: patient.isDiabetic,
          currentHbA1c: lastVisit.hba1c,
          baselineLVEF: patient.baselineLVEF,
          currentLVEF: lastVisit.lvef,
          visitNumber: lastVisit.visitNumber,
        };
      })
      .filter((p) => p !== null);

    // Calcular estadísticas poblacionales
    const stats = calculatePopulationStats(patientsWithData);

    // Contar próximas citas (próximos 7 días)
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcomingAppointments = activePatients.filter((patient) => {
      if (!patient.nextAppointment) return false;
      const appointmentDate = new Date(patient.nextAppointment);
      return appointmentDate >= today && appointmentDate <= nextWeek;
    }).length;

    // Datos para gráfica de control
    const chartData = [
      {
        name: "LDL",
        "En Meta": Math.round((stats.ldlControlRate / 100) * activeCount),
        "Fuera de Meta":
          activeCount - Math.round((stats.ldlControlRate / 100) * activeCount),
      },
      {
        name: "HbA1c",
        "En Meta": Math.round(
          (stats.glycemicControlRate / 100) *
            patientsWithData.filter((p) => p.isDiabetic).length
        ),
        "Fuera de Meta":
          patientsWithData.filter((p) => p.isDiabetic).length -
          Math.round(
            (stats.glycemicControlRate / 100) *
              patientsWithData.filter((p) => p.isDiabetic).length
          ),
      },
      {
        name: "Global",
        "En Meta": stats.inTarget,
        "Fuera de Meta": stats.outOfTarget,
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        activePatients: activeCount,
        ldlControlPercentage: parseFloat(stats.ldlControlRate),
        upcomingAppointments,
        highRiskPatients: stats.highRiskCount,
        chartData,
        populationStats: stats,
      },
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener estadísticas del dashboard" },
      { status: 500 }
    );
  }
}
