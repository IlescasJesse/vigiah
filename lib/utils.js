/**
 * Utilidades para formateo de datos médicos
 */

/**
 * Formatea valores de LDL con su interpretación
 */
export function formatLDL(ldl) {
  if (!ldl) return "N/A";

  let interpretation = "";
  if (ldl < 70) interpretation = "Óptimo";
  else if (ldl < 100) interpretation = "Casi óptimo";
  else if (ldl < 130) interpretation = "Límite alto";
  else if (ldl < 160) interpretation = "Alto";
  else interpretation = "Muy alto";

  return `${ldl} mg/dL (${interpretation})`;
}

/**
 * Formatea valores de HbA1c con su interpretación
 */
export function formatHbA1c(hba1c) {
  if (!hba1c) return "N/A";

  let interpretation = "";
  if (hba1c < 5.7) interpretation = "Normal";
  else if (hba1c < 6.5) interpretation = "Prediabetes";
  else interpretation = "Diabetes";

  return `${hba1c}% (${interpretation})`;
}

/**
 * Formatea valores de LVEF (Fracción de Eyección)
 */
export function formatLVEF(lvef) {
  if (!lvef) return "N/A";

  let interpretation = "";
  if (lvef >= 55) interpretation = "Normal";
  else if (lvef >= 40) interpretation = "Levemente reducida";
  else if (lvef >= 30) interpretation = "Moderadamente reducida";
  else interpretation = "Severamente reducida";

  return `${lvef}% (${interpretation})`;
}

/**
 * Formatea presión arterial
 */
export function formatBloodPressure(systolic, diastolic) {
  if (!systolic || !diastolic) return "N/A";

  let interpretation = "";
  if (systolic < 120 && diastolic < 80) interpretation = "Normal";
  else if (systolic < 130 && diastolic < 80) interpretation = "Elevada";
  else if (systolic < 140 || diastolic < 90) interpretation = "HTA Grado 1";
  else if (systolic < 180 || diastolic < 120) interpretation = "HTA Grado 2";
  else interpretation = "Crisis hipertensiva";

  return `${systolic}/${diastolic} mmHg (${interpretation})`;
}

/**
 * Calcula el IMC (Índice de Masa Corporal)
 */
export function calculateBMI(weight, heightInCm) {
  if (!weight || !heightInCm) return null;

  const heightInMeters = heightInCm / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let category = "";
  if (bmi < 18.5) category = "Bajo peso";
  else if (bmi < 25) category = "Peso normal";
  else if (bmi < 30) category = "Sobrepeso";
  else if (bmi < 35) category = "Obesidad Grado I";
  else if (bmi < 40) category = "Obesidad Grado II";
  else category = "Obesidad Grado III";

  return {
    value: bmi.toFixed(1),
    category,
  };
}

/**
 * Obtiene el color del chip según el nivel de riesgo
 */
export function getRiskLevelColor(riskLevel) {
  const colors = {
    BAJO: "success",
    MEDIO: "warning",
    ALTO: "error",
  };
  return colors[riskLevel] || "default";
}

/**
 * Formatea una fecha para mostrar de forma legible
 */
export function formatDate(date) {
  if (!date) return "N/A";

  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calcula la edad a partir de la fecha de nacimiento
 */
export function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return null;

  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

/**
 * Genera un resumen del estado del paciente
 */
export function generatePatientSummary(patient) {
  if (!patient) return null;

  const lastVisit =
    patient.visits && patient.visits.length > 0
      ? patient.visits[patient.visits.length - 1]
      : null;

  return {
    fullName: `${patient.firstName} ${patient.lastName}`,
    age: calculateAge(patient.dateOfBirth),
    lastVisitDate: lastVisit ? formatDate(lastVisit.visitDate) : "Sin visitas",
    currentLDL: lastVisit?.ldl || null,
    currentHbA1c: lastVisit?.hba1c || null,
    currentLVEF: lastVisit?.lvef || null,
    totalVisits: patient.visits?.length || 0,
    nextAppointment: patient.nextAppointment
      ? formatDate(patient.nextAppointment)
      : "No programada",
  };
}

/**
 * Valida si un paciente tiene datos completos para análisis de riesgo
 */
export function hasCompleteRiskData(patient) {
  if (!patient) return false;

  const lastVisit =
    patient.visits && patient.visits.length > 0
      ? patient.visits[patient.visits.length - 1]
      : null;

  if (!lastVisit) return false;

  const hasLDLData = patient.baselineLDL != null && lastVisit.ldl != null;
  const hasGlycemicData = !patient.isDiabetic || lastVisit.hba1c != null;
  const hasLVEFData = patient.baselineLVEF != null && lastVisit.lvef != null;

  return hasLDLData && hasGlycemicData && hasLVEFData;
}
