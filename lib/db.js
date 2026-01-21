import mongoose from "mongoose";

// Cargar variables de entorno si no están disponibles
if (!process.env.MONGODB_URI) {
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

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Por favor define la variable de ambiente MONGODB_URI en .env"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB conectado exitosamente");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
