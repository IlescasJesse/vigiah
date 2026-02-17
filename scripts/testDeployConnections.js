import mysql from "mysql2/promise";
import mongoose from "mongoose";

function mask(value) {
  if (!value) return "(vacío)";
  return `${value.slice(0, 6)}***${value.slice(-4)}`;
}

async function testMySQL() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("Falta DATABASE_URL");
  }

  const connection = await mysql.createConnection(databaseUrl);
  const [rows] = await connection.query(
    "SELECT DATABASE() AS db, NOW() AS now",
  );
  await connection.end();
  return rows?.[0] || {};
}

async function testMongo() {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error("Falta MONGODB_URI");
  }

  const conn = await mongoose.connect(mongodbUri, {
    serverSelectionTimeoutMS: 10000,
  });

  const dbName = conn.connection?.db?.databaseName;
  await mongoose.disconnect();
  return { dbName };
}

async function main() {
  console.log("Iniciando pruebas de conexión...");
  console.log("DATABASE_URL:", mask(process.env.DATABASE_URL));
  console.log("MONGODB_URI:", mask(process.env.MONGODB_URI));

  const results = {
    mysql: { ok: false, info: null, error: null },
    mongo: { ok: false, info: null, error: null },
  };

  try {
    const info = await testMySQL();
    results.mysql.ok = true;
    results.mysql.info = info;
  } catch (error) {
    results.mysql.error = error.message;
  }

  try {
    const info = await testMongo();
    results.mongo.ok = true;
    results.mongo.info = info;
  } catch (error) {
    results.mongo.error = error.message;
  }

  console.log("\nResultado MySQL:", results.mysql);
  console.log("Resultado Mongo:", results.mongo);

  if (!results.mysql.ok || !results.mongo.ok) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error inesperado:", error.message);
  process.exit(1);
});
