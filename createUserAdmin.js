import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// Configuración de conexión (Ajusta con tus datos)
const dbConfig = {
  host: "localhost",
  user: "root", // Tu usuario de MySQL
  password: "", // Tu contraseña de MySQL
  database: "vigiah_core",
};

async function createAdminUser() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    // Datos del Usuario Solicitado
    const userName = "ILESCAS";
    const rawPassword = "Ilescas3010";
    const userEmail = "ilescas@hraeo.gob.mx"; // Correo ejemplo
    const userRole = "ADMIN"; // Le damos permisos totales para desarrollo

    console.log(`🔐 Encriptando contraseña para ${userName}...`);

    // 1. Hashear la contraseña (Salt de 10 rondas)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    console.log(`🔑 Hash generado: ${hashedPassword.substring(0, 15)}...`);

    // 2. Insertar en MySQL
    const [rows] = await connection.execute(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      [userName, userEmail, hashedPassword, userRole]
    );

    console.log(
      `✅ Usuario ${userName} creado con éxito. ID: ${rows.insertId}`
    );
    console.log(
      `👉 Ya puedes iniciar sesión con la contraseña: ${rawPassword}`
    );

    await connection.end();
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
  }
}

createAdminUser();
