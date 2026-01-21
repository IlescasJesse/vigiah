import { PrismaClient } from "@prisma/client";

// Cargar variables de entorno si no están disponibles
if (!process.env.DATABASE_URL) {
  try {
    const { readFileSync } = await import("fs");
    const { fileURLToPath } = await import("url");
    const { dirname, join } = await import("path");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

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
    console.error("Error cargando variables de entorno:", error.message);
  }
}

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
