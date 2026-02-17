import mysql from "mysql2/promise";

const sourceUrl = process.env.RAILWAY_MYSQL_URL || process.env.DATABASE_URL;
const targetDb = process.env.TARGET_DB || "vigiah_core";

if (!sourceUrl) {
  console.error("Falta RAILWAY_MYSQL_URL o DATABASE_URL");
  process.exit(1);
}

function buildAdminUrl(url) {
  const parsed = new URL(url);
  parsed.pathname = "/";
  return parsed.toString();
}

function buildTargetUrl(url, dbName) {
  const parsed = new URL(url);
  parsed.pathname = `/${dbName}`;
  return parsed.toString();
}

function mask(url) {
  const parsed = new URL(url);
  if (parsed.password) parsed.password = "***";
  return parsed.toString();
}

async function main() {
  const adminUrl = buildAdminUrl(sourceUrl);
  const targetUrl = buildTargetUrl(sourceUrl, targetDb);

  const conn = await mysql.createConnection(adminUrl);
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${targetDb}\``);
  await conn.end();

  console.log("Base creada/verificada:", targetDb);
  console.log("DATABASE_URL para Vercel:");
  console.log(mask(targetUrl));
}

main().catch((error) => {
  console.error("No se pudo preparar MySQL:", error.message);
  process.exit(1);
});
