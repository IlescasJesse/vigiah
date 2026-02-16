/**
 * EJEMPLOS DE USO DE LA CALCULADORA DE RIESGO
 *
 * Este archivo contiene ejemplos prácticos de cómo usar las funciones
 * de cálculo de riesgo en diferentes escenarios clínicos.
 */

import {
  calculateRisk,
  isPatientInTarget,
  calculatePopulationStats,
} from "./riskCalculator.js";

console.log("═══════════════════════════════════════════════════════");
console.log("  EJEMPLOS DE USO - CALCULADORA DE RIESGO CLÍNICA CARDIOMETABOLISMO");
console.log("═══════════════════════════════════════════════════════\n");

// ═══════════════════════════════════════════════════════════════
// EJEMPLO 1: Paciente con buen control (RIESGO BAJO)
// ═══════════════════════════════════════════════════════════════
console.log("📊 EJEMPLO 1: Paciente con Buen Control");
console.log("─────────────────────────────────────────");

const paciente1 = {
  baselineLDL: 180, // LDL inicial alto
  currentLDL: 65, // LDL actual < 70 ✅
  isDiabetic: true, // Es diabético
  currentHbA1c: 6.8, // HbA1c < 7.0 ✅
  baselineLVEF: 55, // FEVI basal normal
  currentLVEF: 56, // FEVI estable ✅
  visitNumber: 3,
};

const resultado1 = calculateRisk(paciente1);
console.log("Datos del paciente:", paciente1);
console.log("\n📋 Resultado del análisis:");
console.log(JSON.stringify(resultado1, null, 2));
console.log("\n✅ Paciente en meta:", isPatientInTarget(paciente1));
console.log("\n");

// ═══════════════════════════════════════════════════════════════
// EJEMPLO 2: Paciente con LDL fuera de control (RIESGO MEDIO)
// ═══════════════════════════════════════════════════════════════
console.log("📊 EJEMPLO 2: Paciente con LDL Elevado");
console.log("─────────────────────────────────────────");

const paciente2 = {
  baselineLDL: 180,
  currentLDL: 140, // LDL alto, reducción solo del 22% ❌
  isDiabetic: false,
  currentHbA1c: 5.6,
  baselineLVEF: 58,
  currentLVEF: 58,
  visitNumber: 2,
};

const resultado2 = calculateRisk(paciente2);
console.log("Datos del paciente:", paciente2);
console.log("\n📋 Resultado del análisis:");
console.log(JSON.stringify(resultado2, null, 2));
console.log("\n❌ Paciente en meta:", isPatientInTarget(paciente2));
console.log("\n");

// ═══════════════════════════════════════════════════════════════
// EJEMPLO 3: Diabético con mal control glicémico (RIESGO MEDIO)
// ═══════════════════════════════════════════════════════════════
console.log("📊 EJEMPLO 3: Diabético con HbA1c Elevada");
console.log("─────────────────────────────────────────");

const paciente3 = {
  baselineLDL: 170,
  currentLDL: 68, // LDL bien controlado ✅
  isDiabetic: true,
  currentHbA1c: 8.5, // HbA1c > 7.0 ❌
  baselineLVEF: 52,
  currentLVEF: 53,
  visitNumber: 4,
};

const resultado3 = calculateRisk(paciente3);
console.log("Datos del paciente:", paciente3);
console.log("\n📋 Resultado del análisis:");
console.log(JSON.stringify(resultado3, null, 2));
console.log("\n❌ Paciente en meta:", isPatientInTarget(paciente3));
console.log("\n");

// ═══════════════════════════════════════════════════════════════
// EJEMPLO 4: Alerta de insuficiencia cardíaca en mes 5 (RIESGO ALTO)
// ═══════════════════════════════════════════════════════════════
console.log("📊 EJEMPLO 4: Alerta de Insuficiencia Cardíaca (Mes 5)");
console.log("─────────────────────────────────────────");

const paciente4 = {
  baselineLDL: 200,
  currentLDL: 95, // LDL no óptimo pero con reducción del 52.5% ✅
  isDiabetic: true,
  currentHbA1c: 7.8, // HbA1c elevada ❌
  baselineLVEF: 50, // FEVI basal límite
  currentLVEF: 45, // FEVI descendió 5 puntos ⚠️
  visitNumber: 5, // Mes crítico para evaluación
};

const resultado4 = calculateRisk(paciente4);
console.log("Datos del paciente:", paciente4);
console.log("\n📋 Resultado del análisis:");
console.log(JSON.stringify(resultado4, null, 2));
console.log("\n⚠️  Paciente en meta:", isPatientInTarget(paciente4));
console.log("\n");

// ═══════════════════════════════════════════════════════════════
// EJEMPLO 5: Paciente logra reducción exacta del 30% (UMBRAL)
// ═══════════════════════════════════════════════════════════════
console.log("📊 EJEMPLO 5: Paciente en el Umbral del 30% de Reducción");
console.log("─────────────────────────────────────────");

const paciente5 = {
  baselineLDL: 150,
  currentLDL: 105, // Reducción exacta del 30% ✅
  isDiabetic: false,
  currentHbA1c: 5.5,
  baselineLVEF: 60,
  currentLVEF: 61,
  visitNumber: 3,
};

const resultado5 = calculateRisk(paciente5);
const reduccionPorcentaje = (((150 - 105) / 150) * 100).toFixed(1);
console.log("Datos del paciente:", paciente5);
console.log(`Reducción de LDL: ${reduccionPorcentaje}%`);
console.log("\n📋 Resultado del análisis:");
console.log(JSON.stringify(resultado5, null, 2));
console.log("\n✅ Paciente en meta:", isPatientInTarget(paciente5));
console.log("\n");

// ═══════════════════════════════════════════════════════════════
// EJEMPLO 6: Estadísticas Poblacionales
// ═══════════════════════════════════════════════════════════════
console.log("📊 EJEMPLO 6: Análisis Poblacional de 5 Pacientes");
console.log("─────────────────────────────────────────");

const poblacion = [paciente1, paciente2, paciente3, paciente4, paciente5];

const stats = calculatePopulationStats(poblacion);
console.log("Población analizada: 5 pacientes");
console.log("\n📊 Estadísticas:");
console.log(JSON.stringify(stats, null, 2));
console.log("\n");

// ═══════════════════════════════════════════════════════════════
// INTERPRETACIÓN DE RESULTADOS
// ═══════════════════════════════════════════════════════════════
console.log("═══════════════════════════════════════════════════════");
console.log("  INTERPRETACIÓN DE RESULTADOS");
console.log("═══════════════════════════════════════════════════════\n");

console.log("🟢 RIESGO BAJO:");
console.log("   - Control de LDL adecuado");
console.log("   - Control glicémico adecuado (si aplica)");
console.log("   - Sin alertas de FEVI");
console.log("   → Continuar con el plan terapéutico actual\n");

console.log("🟡 RIESGO MEDIO:");
console.log("   - LDL fuera de meta O HbA1c elevada");
console.log("   - Sin alertas críticas de FEVI");
console.log("   → Considerar ajuste de tratamiento\n");

console.log("🔴 RIESGO ALTO:");
console.log("   - Múltiples parámetros fuera de control");
console.log("   - Alerta de descenso en FEVI (mes 5)");
console.log("   → Requiere atención médica urgente\n");

console.log("═══════════════════════════════════════════════════════");
console.log("  CRITERIOS DE CONTROL");
console.log("═══════════════════════════════════════════════════════\n");

console.log("📌 Control de Lípidos (LDL):");
console.log("   ✅ LDL < 70 mg/dL, O");
console.log("   ✅ Reducción ≥ 30% vs basal\n");

console.log("📌 Control Glicémico (solo diabéticos):");
console.log("   ✅ HbA1c < 7.0%\n");

console.log("📌 Alerta de Insuficiencia Cardíaca:");
console.log("   ⚠️  Si en mes 5, FEVI actual < FEVI basal\n");

console.log("═══════════════════════════════════════════════════════\n");
