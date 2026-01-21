/**
 * Script para crear la base de datos MySQL
 * Ejecutar con: node scripts/createDatabase.js
 */

// Cargar variables de entorno
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mysql from "mysql2/promise";

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

async function createDatabase() {
  try {
    console.log("📦 Creando base de datos MySQL...\n");

    // Conectar sin especificar base de datos
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    // Crear base de datos si no existe
    await connection.query("CREATE DATABASE IF NOT EXISTS vigiah");
    console.log('✅ Base de datos "vigiah" creada o ya existe\n');

    await connection.end();

    console.log("🎉 ¡Listo! Ahora ejecuta:");
    console.log("   npm run prisma:migrate -- --name init");
    console.log("   npm run seed\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createDatabase();
