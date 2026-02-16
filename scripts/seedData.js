/**
 * Script para poblar la base de datos con datos de ejemplo
 * Ejecutar con: node scripts/seedData.js
 */

// Cargar variables de entorno manualmente para ES modules
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const envFile = readFileSync(join(__dirname, "..", ".env"), "utf8");
  envFile.split("\n").forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, "");
      process.env[key] = value;
    }
  });
} catch (error) {
  console.error("Error cargando .env:", error.message);
}

import connectDB from "../lib/db.js";
import Patient from "../models/Patient.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const seedPatients = [
  {
    firstName: "Juan",
    lastName: "Pérez García",
    dateOfBirth: new Date("1965-05-15"),
    gender: "MASCULINO",
    email: "juan.perez@email.com",
    phone: "555-0101",
    isDiabetic: true,
    baselineLDL: 180,
    baselineLVEF: 55,
    status: "ACTIVO",
    primaryDiagnosis: "Síndrome Coronario Agudo post-angioplastia",
    nextAppointment: new Date("2026-02-15"),
    visits: [
      {
        visitDate: new Date("2025-09-01"),
        visitNumber: 1,
        weight: 82,
        systolicBP: 140,
        diastolicBP: 90,
        ldl: 180,
        hba1c: 8.2,
        lvef: 55,
        notes: "Visita inicial post-angioplastia",
        medications: [
          { name: "Atorvastatina", dosage: "40mg" },
          { name: "Metformina", dosage: "850mg" },
        ],
      },
      {
        visitDate: new Date("2025-10-01"),
        visitNumber: 2,
        weight: 80,
        systolicBP: 130,
        diastolicBP: 85,
        ldl: 120,
        hba1c: 7.5,
        lvef: 56,
        notes: "Mejora en parámetros",
        medications: [
          { name: "Atorvastatina", dosage: "80mg" },
          { name: "Metformina", dosage: "1000mg" },
        ],
      },
      {
        visitDate: new Date("2025-11-01"),
        visitNumber: 3,
        weight: 78,
        systolicBP: 125,
        diastolicBP: 80,
        ldl: 85,
        hba1c: 7.0,
        lvef: 57,
        notes: "Control satisfactorio",
        medications: [
          { name: "Atorvastatina", dosage: "80mg" },
          { name: "Metformina", dosage: "1000mg" },
        ],
      },
    ],
  },
  {
    firstName: "María",
    lastName: "López Hernández",
    dateOfBirth: new Date("1972-08-22"),
    gender: "FEMENINO",
    email: "maria.lopez@email.com",
    phone: "555-0102",
    isDiabetic: false,
    baselineLDL: 165,
    baselineLVEF: 60,
    status: "ACTIVO",
    primaryDiagnosis: "Angina estable post-stent",
    nextAppointment: new Date("2026-01-25"),
    visits: [
      {
        visitDate: new Date("2025-08-15"),
        visitNumber: 1,
        weight: 68,
        systolicBP: 135,
        diastolicBP: 88,
        ldl: 165,
        hba1c: 5.8,
        lvef: 60,
        notes: "Primera consulta",
        medications: [{ name: "Rosuvastatina", dosage: "20mg" }],
      },
      {
        visitDate: new Date("2025-12-15"),
        visitNumber: 2,
        weight: 66,
        systolicBP: 120,
        diastolicBP: 78,
        ldl: 65,
        hba1c: 5.6,
        lvef: 61,
        notes: "Excelente respuesta al tratamiento",
        medications: [{ name: "Rosuvastatina", dosage: "20mg" }],
      },
    ],
  },
  {
    firstName: "Carlos",
    lastName: "Martínez Ruiz",
    dateOfBirth: new Date("1958-03-10"),
    gender: "MASCULINO",
    email: "carlos.martinez@email.com",
    phone: "555-0103",
    isDiabetic: true,
    baselineLDL: 200,
    baselineLVEF: 50,
    status: "ACTIVO",
    primaryDiagnosis: "Infarto miocárdico con ST elevado",
    nextAppointment: new Date("2026-02-01"),
    visits: [
      {
        visitDate: new Date("2025-07-01"),
        visitNumber: 1,
        weight: 90,
        systolicBP: 150,
        diastolicBP: 95,
        ldl: 200,
        hba1c: 9.1,
        lvef: 50,
        notes: "Primer mes post-infarto",
        medications: [
          { name: "Atorvastatina", dosage: "80mg" },
          { name: "Insulina Glargina", dosage: "20UI" },
        ],
      },
      {
        visitDate: new Date("2025-12-01"),
        visitNumber: 5,
        weight: 85,
        systolicBP: 130,
        diastolicBP: 82,
        ldl: 95,
        hba1c: 7.8,
        lvef: 48,
        notes: "ALERTA: Descenso en FEVI",
        medications: [
          { name: "Atorvastatina", dosage: "80mg" },
          { name: "Insulina Glargina", dosage: "24UI" },
          { name: "Enalapril", dosage: "10mg" },
        ],
      },
    ],
  },
  {
    firstName: "Ana",
    lastName: "Sánchez Torres",
    dateOfBirth: new Date("1980-11-05"),
    gender: "FEMENINO",
    email: "ana.sanchez@email.com",
    phone: "555-0104",
    isDiabetic: false,
    baselineLDL: 155,
    baselineLVEF: 58,
    status: "ACTIVO",
    primaryDiagnosis: "Angina de pecho",
    nextAppointment: new Date("2026-01-28"),
    visits: [
      {
        visitDate: new Date("2025-10-10"),
        visitNumber: 1,
        weight: 72,
        systolicBP: 128,
        diastolicBP: 82,
        ldl: 155,
        hba1c: 5.5,
        lvef: 58,
        notes: "Inicio de tratamiento",
        medications: [{ name: "Atorvastatina", dosage: "40mg" }],
      },
      {
        visitDate: new Date("2026-01-10"),
        visitNumber: 2,
        weight: 70,
        systolicBP: 122,
        diastolicBP: 78,
        ldl: 68,
        hba1c: 5.4,
        lvef: 59,
        notes: "Buena evolución",
        medications: [{ name: "Atorvastatina", dosage: "40mg" }],
      },
    ],
  },
  {
    firstName: "Roberto",
    lastName: "Díaz Flores",
    dateOfBirth: new Date("1968-07-18"),
    gender: "MASCULINO",
    email: "roberto.diaz@email.com",
    phone: "555-0105",
    isDiabetic: true,
    baselineLDL: 175,
    baselineLVEF: 52,
    status: "ACTIVO",
    primaryDiagnosis: "Cardiopatía isquémica",
    nextAppointment: new Date("2026-01-19"),
    visits: [
      {
        visitDate: new Date("2025-09-20"),
        visitNumber: 1,
        weight: 88,
        systolicBP: 145,
        diastolicBP: 92,
        ldl: 175,
        hba1c: 8.5,
        lvef: 52,
        notes: "Consulta inicial",
        medications: [
          { name: "Atorvastatina", dosage: "80mg" },
          { name: "Metformina", dosage: "850mg" },
        ],
      },
    ],
  },
];

const seedUsers = [
  {
    email: "ivan@vigiah.com",
    name: "Dr. Ivan Ilescas Martinez",
    password: "ILESCAS3010!",
    role: "ADMIN",
  },
  {
    email: "dr.cardio@vigiah.com",
    name: "Dr. Fernando Cardiólogo",
    password: "Medico123!",
    role: "MEDICO",
  },
  {
    email: "residente@vigiah.com",
    name: "Dra. Laura Residente",
    password: "Residente123!",
    role: "RESIDENTE",
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Iniciando población de base de datos...\n");

    // Conectar a MongoDB
    await connectDB();
    console.log("✅ Conectado a MongoDB");

    // Limpiar colección de pacientes
    await Patient.deleteMany({});
    console.log(" Colección de pacientes limpiada");

    // Insertar pacientes
    const patients = await Patient.insertMany(seedPatients);
    console.log(`✅ ${patients.length} pacientes insertados en MongoDB\n`);

    // Limpiar tabla de usuarios en MySQL
    await prisma.user.deleteMany({});
    console.log("🧹 Tabla de usuarios limpiada");

    // Insertar usuarios
    for (const userData of seedUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    }
    console.log(`✅ ${seedUsers.length} usuarios insertados en MySQL\n`);

    console.log("🎉 ¡Base de datos poblada exitosamente!\n");
    console.log("📋 Credenciales de prueba:");
    console.log("   Admin:      admin@vigiah.com / Admin123!");
    console.log("   Médico:     dr.cardio@vigiah.com / Medico123!");
    console.log("   Residente:  residente@vigiah.com / Residente123!\n");
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

// Ejecutar el seed
seedDatabase();
