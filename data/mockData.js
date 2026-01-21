/**
 * Mock Data for VIGIAH Dashboard
 * Clinical data simulation for immediate visual testing
 */

// KPI Data
export const kpiData = {
  activePatientsCount: 145,
  ldlControlPercentage: 68.5, // Red if <70%
  echosCompletedMonth5: 76.3, // Yellow if <80%
  upcomingAppointments: 23,
  missedAppointments: 8,
  highRiskPatients: 12,
};

// Monthly metabolic control trend (last 12 months)
export const metabolicControlTrend = [
  { month: "Feb 2025", enMeta: 87, fueraMeta: 58, total: 145 },
  { month: "Mar 2025", enMeta: 92, fueraMeta: 53, total: 145 },
  { month: "Abr 2025", enMeta: 95, fueraMeta: 50, total: 145 },
  { month: "May 2025", enMeta: 98, fueraMeta: 47, total: 145 },
  { month: "Jun 2025", enMeta: 102, fueraMeta: 43, total: 145 },
  { month: "Jul 2025", enMeta: 99, fueraMeta: 46, total: 145 },
  { month: "Ago 2025", enMeta: 105, fueraMeta: 40, total: 145 },
  { month: "Sep 2025", enMeta: 108, fueraMeta: 37, total: 145 },
  { month: "Oct 2025", enMeta: 103, fueraMeta: 42, total: 145 },
  { month: "Nov 2025", enMeta: 107, fueraMeta: 38, total: 145 },
  { month: "Dic 2025", enMeta: 110, fueraMeta: 35, total: 145 },
  { month: "Ene 2026", enMeta: 99, fueraMeta: 46, total: 145 },
];

// Urgent action list - Patients with missed appointments
export const urgentPatients = [
  {
    id: 1,
    name: "Juan Pérez García",
    lastAppointment: "2026-01-10",
    daysLate: 11,
    nextStep: "Mes 5 - Ecocardiograma",
    riskLevel: "high",
    phone: "555-0101",
  },
  {
    id: 2,
    name: "María López Hernández",
    lastAppointment: "2026-01-12",
    daysLate: 9,
    nextStep: "Mes 3 - Laboratorios",
    riskLevel: "medium",
    phone: "555-0102",
  },
  {
    id: 3,
    name: "Carlos Martínez Ruiz",
    lastAppointment: "2026-01-08",
    daysLate: 13,
    nextStep: "Mes 7 - Control General",
    riskLevel: "high",
    phone: "555-0103",
  },
  {
    id: 4,
    name: "Ana Sánchez Torres",
    lastAppointment: "2026-01-14",
    daysLate: 7,
    nextStep: "Mes 12 - Cierre",
    riskLevel: "low",
    phone: "555-0104",
  },
  {
    id: 5,
    name: "Roberto Díaz Flores",
    lastAppointment: "2026-01-11",
    daysLate: 10,
    nextStep: "Mes 5 - Ecocardiograma",
    riskLevel: "medium",
    phone: "555-0105",
  },
];

// Recent patients list for dashboard
export const recentPatients = [
  {
    id: 1,
    name: "Juan Pérez García",
    age: 58,
    interventionDate: "2025-09-15",
    currentMonth: 5,
    ldlControl: false,
    echoCompleted: false,
    nextAppointment: "2026-01-25",
  },
  {
    id: 2,
    name: "María López Hernández",
    age: 64,
    interventionDate: "2025-10-20",
    currentMonth: 3,
    ldlControl: true,
    echoCompleted: null, // Not yet required
    nextAppointment: "2026-01-28",
  },
  {
    id: 3,
    name: "Carlos Martínez Ruiz",
    age: 71,
    interventionDate: "2025-08-10",
    currentMonth: 5,
    ldlControl: true,
    echoCompleted: true,
    nextAppointment: "2026-02-05",
  },
  {
    id: 4,
    name: "Ana Sánchez Torres",
    age: 52,
    interventionDate: "2025-06-15",
    currentMonth: 7,
    ldlControl: true,
    echoCompleted: true,
    nextAppointment: "2026-02-10",
  },
  {
    id: 5,
    name: "Roberto Díaz Flores",
    age: 66,
    interventionDate: "2025-09-20",
    currentMonth: 4,
    ldlControl: false,
    echoCompleted: null,
    nextAppointment: "2026-01-30",
  },
];

// Control statistics by parameter
export const controlByParameter = [
  {
    parameter: "LDL < 70",
    controlled: 99,
    uncontrolled: 46,
    percentage: 68.3,
  },
  {
    parameter: "HbA1c < 7%",
    controlled: 72,
    uncontrolled: 35,
    percentage: 67.3,
  },
  {
    parameter: "PA < 140/90",
    controlled: 115,
    uncontrolled: 30,
    percentage: 79.3,
  },
  {
    parameter: "FEVI Estable",
    controlled: 120,
    uncontrolled: 25,
    percentage: 82.8,
  },
];

// Monthly echo completion rate (for Month 5 patients)
export const echoCompletionData = [
  { month: "Feb 2025", completed: 18, pending: 5, rate: 78.3 },
  { month: "Mar 2025", completed: 20, pending: 4, rate: 83.3 },
  { month: "Abr 2025", completed: 19, pending: 6, rate: 76.0 },
  { month: "May 2025", completed: 22, pending: 3, rate: 88.0 },
  { month: "Jun 2025", completed: 21, pending: 4, rate: 84.0 },
  { month: "Jul 2025", completed: 17, pending: 6, rate: 73.9 },
  { month: "Ago 2025", completed: 23, pending: 2, rate: 92.0 },
  { month: "Sep 2025", completed: 20, pending: 5, rate: 80.0 },
  { month: "Oct 2025", completed: 19, pending: 5, rate: 79.2 },
  { month: "Nov 2025", completed: 21, pending: 4, rate: 84.0 },
  { month: "Dic 2025", completed: 18, pending: 7, rate: 72.0 },
  { month: "Ene 2026", completed: 19, pending: 6, rate: 76.0 },
];

// Patient distribution by protocol month
export const patientsByMonth = [
  { month: "Basal", count: 8, color: "#003366" },
  { month: "Mes 1", count: 15, color: "#004d99" },
  { month: "Mes 3", count: 22, color: "#0066cc" },
  { month: "Mes 5", count: 25, color: "#00AEEF" },
  { month: "Mes 7", count: 28, color: "#33BFFF" },
  { month: "Mes 10", count: 20, color: "#66D1FF" },
  { month: "Mes 12", count: 27, color: "#99E0FF" },
];

// Risk stratification
export const riskDistribution = [
  { level: "Bajo", count: 87, percentage: 60.0, color: "#2E7D32" },
  { level: "Medio", count: 46, percentage: 31.7, color: "#ED6C02" },
  { level: "Alto", count: 12, percentage: 8.3, color: "#D32F2F" },
];

// Notifications data
export const notifications = [
  {
    id: 1,
    type: "urgent",
    title: "3 pacientes con citas vencidas",
    message: "Requieren reprogramación inmediata",
    time: "2 horas atrás",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "5 ecocardiogramas pendientes (Mes 5)",
    message: "Pacientes en ventana crítica de evaluación",
    time: "5 horas atrás",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Control LDL bajo 70% en el último mes",
    message: "Considerar ajuste de estrategias terapéuticas",
    time: "Ayer",
    read: true,
  },
  {
    id: 4,
    type: "success",
    title: "Meta de adherencia alcanzada",
    message: "92% de pacientes con control en Mes 12",
    time: "2 días atrás",
    read: true,
  },
];

export default {
  kpiData,
  metabolicControlTrend,
  urgentPatients,
  recentPatients,
  controlByParameter,
  echoCompletionData,
  patientsByMonth,
  riskDistribution,
  notifications,
};
