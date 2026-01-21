/**
 * Calculadora de Riesgo para pacientes del sistema VIGIAH
 *
 * Esta función evalúa el control de lípidos, control glicémico y
 * detecta alertas de insuficiencia cardíaca según los parámetros clínicos
 *
 * @param {Object} patientData - Datos del paciente
 * @param {number} patientData.baselineLDL - LDL basal del paciente
 * @param {number} patientData.currentLDL - LDL actual del paciente
 * @param {boolean} patientData.isDiabetic - Si el paciente es diabético
 * @param {number} patientData.currentHbA1c - Hemoglobina glicosilada actual
 * @param {number} patientData.baselineLVEF - Fracción de eyección basal
 * @param {number} patientData.currentLVEF - Fracción de eyección actual
 * @param {number} patientData.visitNumber - Número de visita (mes)
 *
 * @returns {Object} Resultado del análisis de riesgo
 */
export function calculateRisk(patientData) {
  const {
    baselineLDL,
    currentLDL,
    isDiabetic,
    currentHbA1c,
    baselineLVEF,
    currentLVEF,
    visitNumber,
  } = patientData;

  const result = {
    lipidControl: false,
    glycemicControl: false,
    alerts: [],
    riskLevel: "BAJO", // BAJO, MEDIO, ALTO
    recommendations: [],
  };

  // ========================================
  // REGLA 1: Control de Lípidos (LDL)
  // ========================================
  // Control logrado si:
  // - LDL actual < 70 mg/dL, O
  // - Reducción >= 30% respecto al LDL basal
  if (currentLDL !== null && currentLDL !== undefined) {
    const ldlReduction =
      baselineLDL && baselineLDL > 0
        ? (baselineLDL - currentLDL) / baselineLDL
        : 0;

    if (currentLDL < 70 || ldlReduction >= 0.3) {
      result.lipidControl = true;
      result.recommendations.push(
        "Control de LDL adecuado. Continuar tratamiento actual."
      );
    } else {
      result.lipidControl = false;
      result.riskLevel = "MEDIO";
      result.recommendations.push(
        `LDL actual: ${currentLDL} mg/dL. Meta: <70 mg/dL o reducción ≥30%. ` +
          `Considerar intensificar terapia hipolipemiante.`
      );
    }
  }

  // ========================================
  // REGLA 2: Control Glicémico (HbA1c)
  // ========================================
  // Para pacientes diabéticos, control logrado si HbA1c < 7.0%
  if (isDiabetic && currentHbA1c !== null && currentHbA1c !== undefined) {
    if (currentHbA1c < 7.0) {
      result.glycemicControl = true;
      result.recommendations.push(
        "Control glicémico óptimo. Mantener esquema terapéutico."
      );
    } else {
      result.glycemicControl = false;
      result.riskLevel = result.riskLevel === "MEDIO" ? "ALTO" : "MEDIO";
      result.recommendations.push(
        `HbA1c actual: ${currentHbA1c}%. Meta: <7.0%. ` +
          `Evaluar adherencia y ajustar tratamiento antidiabético.`
      );
    }
  }

  // ========================================
  // REGLA 3: Alerta de Insuficiencia Cardíaca
  // ========================================
  // Si es el mes 5 y LVEF actual < LVEF basal
  if (visitNumber === 5) {
    if (
      currentLVEF !== null &&
      currentLVEF !== undefined &&
      baselineLVEF !== null &&
      baselineLVEF !== undefined
    ) {
      if (currentLVEF < baselineLVEF) {
        const lvefDrop = baselineLVEF - currentLVEF;
        result.alerts.push("⚠️ Posible Insuficiencia Cardiaca");
        result.riskLevel = "ALTO";
        result.recommendations.push(
          `ALERTA: FEVI disminuyó de ${baselineLVEF}% a ${currentLVEF}% (${lvefDrop.toFixed(
            1
          )}% de reducción). ` +
            `Evaluar signos de insuficiencia cardíaca. Considerar ecocardiograma de control y ` +
            `optimización de terapia para IC.`
        );
      } else {
        result.recommendations.push(
          `FEVI estable o mejorada: ${currentLVEF}% (basal: ${baselineLVEF}%).`
        );
      }
    }
  }

  // ========================================
  // Evaluación adicional del nivel de riesgo
  // ========================================
  if (
    !result.lipidControl &&
    !result.glycemicControl &&
    result.alerts.length > 0
  ) {
    result.riskLevel = "ALTO";
  } else if (!result.lipidControl || !result.glycemicControl) {
    if (result.riskLevel !== "ALTO") {
      result.riskLevel = "MEDIO";
    }
  } else if (
    result.lipidControl &&
    result.glycemicControl &&
    result.alerts.length === 0
  ) {
    result.riskLevel = "BAJO";
  }

  return result;
}

/**
 * Función auxiliar para evaluar si un paciente está en meta terapéutica
 *
 * @param {Object} patientData - Datos del paciente (igual que calculateRisk)
 * @returns {boolean} true si el paciente cumple con las metas terapéuticas
 */
export function isPatientInTarget(patientData) {
  const risk = calculateRisk(patientData);

  // Paciente en meta si tiene control de lípidos y glicémico (si aplica)
  // y no tiene alertas de alto riesgo
  const hasLipidControl = risk.lipidControl;
  const hasGlycemicControl = patientData.isDiabetic
    ? risk.glycemicControl
    : true;
  const hasNoHighAlerts = risk.riskLevel !== "ALTO";

  return hasLipidControl && hasGlycemicControl && hasNoHighAlerts;
}

/**
 * Función para calcular estadísticas de una población de pacientes
 *
 * @param {Array} patients - Array de objetos con datos de pacientes
 * @returns {Object} Estadísticas agregadas
 */
export function calculatePopulationStats(patients) {
  if (!patients || patients.length === 0) {
    return {
      total: 0,
      inTarget: 0,
      outOfTarget: 0,
      percentageInTarget: 0,
      ldlControlRate: 0,
      glycemicControlRate: 0,
      highRiskCount: 0,
    };
  }

  let inTargetCount = 0;
  let ldlControlCount = 0;
  let glycemicControlCount = 0;
  let diabeticCount = 0;
  let highRiskCount = 0;

  patients.forEach((patient) => {
    const risk = calculateRisk(patient);

    if (isPatientInTarget(patient)) {
      inTargetCount++;
    }

    if (risk.lipidControl) {
      ldlControlCount++;
    }

    if (patient.isDiabetic) {
      diabeticCount++;
      if (risk.glycemicControl) {
        glycemicControlCount++;
      }
    }

    if (risk.riskLevel === "ALTO") {
      highRiskCount++;
    }
  });

  return {
    total: patients.length,
    inTarget: inTargetCount,
    outOfTarget: patients.length - inTargetCount,
    percentageInTarget:
      patients.length > 0
        ? ((inTargetCount / patients.length) * 100).toFixed(1)
        : 0,
    ldlControlRate:
      patients.length > 0
        ? ((ldlControlCount / patients.length) * 100).toFixed(1)
        : 0,
    glycemicControlRate:
      diabeticCount > 0
        ? ((glycemicControlCount / diabeticCount) * 100).toFixed(1)
        : 0,
    highRiskCount,
  };
}
