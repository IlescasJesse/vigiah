# Guía de Inicio Rápido - Clínica Cardiometabolismo

Esta guía te llevará paso a paso desde la instalación hasta tener el sistema completamente funcional.

## 📋 Pre-requisitos

Asegúrate de tener instalado:

1. **Node.js** (v18 o superior) - [Descargar](https://nodejs.org/)
2. **MySQL** (v8 o superior) - [Descargar](https://dev.mysql.com/downloads/)
3. **MongoDB** (v6 o superior) - [Descargar](https://www.mongodb.com/try/download/community)
4. **Git** - [Descargar](https://git-scm.com/)

## 🚀 Instalación Paso a Paso

### Paso 1: Instalar Dependencias

```powershell
cd VIGIAH
npm install
```

Esto instalará todas las dependencias del proyecto:

- Next.js 14
- Material UI v5
- Recharts
- Mongoose
- Prisma
- Y más...

### Paso 2: Configurar MySQL

1. Abre MySQL Workbench o la consola de MySQL
2. Crea la base de datos:

```sql
CREATE DATABASE vigiah CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Crea un usuario (opcional):

```sql
CREATE USER 'vigiah_user'@'localhost' IDENTIFIED BY 'tu_password_seguro';
GRANT ALL PRIVILEGES ON vigiah.* TO 'vigiah_user'@'localhost';
FLUSH PRIVILEGES;
```

### Paso 3: Configurar MongoDB

Si usas MongoDB local:

```powershell
# Verificar que MongoDB está corriendo
mongosh

# Crear la base de datos (se crea automáticamente al insertar datos)
use vigiah
```

Si prefieres usar **MongoDB Atlas** (en la nube):

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén tu connection string

### Paso 4: Configurar Variables de Entorno

1. Copia el archivo de ejemplo:

```powershell
Copy-Item .env.example .env
```

2. Edita el archivo `.env` con tus credenciales reales:

```env
# MySQL (ajusta usuario, password y puerto según tu configuración)
DATABASE_URL="mysql://vigiah_user:tu_password_seguro@localhost:3306/vigiah"

# MongoDB (local o Atlas)
# Local:
MONGODB_URI="mongodb://localhost:27017/vigiah"
# O Atlas:
# MONGODB_URI="mongodb+srv://usuario:password@cluster.mongodb.net/vigiah?retryWrites=true&w=majority"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-un-secreto-aleatorio-aqui"
```

### Paso 5: Inicializar Prisma

```powershell
# Generar el cliente de Prisma
npm run prisma:generate

# Crear las tablas en MySQL
npm run prisma:migrate
```

Cuando te pregunte por el nombre de la migración, escribe algo como: `initial_setup`

### Paso 6: Poblar la Base de Datos (Opcional)

Para tener datos de ejemplo:

```powershell
node scripts/seedData.js
```

Esto creará:

- 5 pacientes con visitas de ejemplo
- 3 usuarios (Admin, Médico, Residente)

### Paso 7: Ejecutar el Proyecto

```powershell
npm run dev
```

Abre tu navegador en: [http://localhost:3000](http://localhost:3000)

## 🎯 Verificación de Instalación

Deberías ver:

✅ Dashboard con KPIs  
✅ Gráfica de barras con datos  
✅ Agenda con próximas citas  
✅ Sin errores en la consola

## 🧪 Prueba de APIs

Puedes probar los endpoints con herramientas como **Postman** o **Thunder Client**:

### Obtener todos los pacientes

```http
GET http://localhost:3000/api/patients
```

### Obtener estadísticas del dashboard

```http
GET http://localhost:3000/api/dashboard/stats
```

### Crear un nuevo paciente

```http
POST http://localhost:3000/api/patients
Content-Type: application/json

{
  "firstName": "Pedro",
  "lastName": "González",
  "dateOfBirth": "1975-06-15",
  "gender": "MASCULINO",
  "email": "pedro.gonzalez@email.com",
  "isDiabetic": true,
  "baselineLDL": 170,
  "baselineLVEF": 55,
  "status": "ACTIVO"
}
```

### Agregar una visita a un paciente

```http
POST http://localhost:3000/api/patients/{id}/visits
Content-Type: application/json

{
  "visitNumber": 1,
  "weight": 75,
  "systolicBP": 130,
  "diastolicBP": 85,
  "ldl": 120,
  "hba1c": 7.2,
  "lvef": 56,
  "notes": "Primera visita de seguimiento",
  "medications": [
    { "name": "Atorvastatina", "dosage": "40mg" }
  ]
}
```

## 📊 Ejemplo de Uso: Calcular Riesgo

```javascript
import { calculateRisk } from "@/lib/riskCalculator";

const patientData = {
  baselineLDL: 180,
  currentLDL: 65, // ✅ < 70, control logrado
  isDiabetic: true,
  currentHbA1c: 6.8, // ✅ < 7.0, control logrado
  baselineLVEF: 55,
  currentLVEF: 54,
  visitNumber: 3,
};

const result = calculateRisk(patientData);

console.log(result);
/*
{
  lipidControl: true,
  glycemicControl: true,
  alerts: [],
  riskLevel: 'BAJO',
  recommendations: [
    'Control de LDL adecuado. Continuar tratamiento actual.',
    'Control glicémico óptimo. Mantener esquema terapéutico.'
  ]
}
*/
```

## 🔧 Comandos Útiles

| Comando                   | Descripción                             |
| ------------------------- | --------------------------------------- |
| `npm run dev`             | Inicia el servidor de desarrollo        |
| `npm run build`           | Construye la aplicación para producción |
| `npm start`               | Ejecuta la versión de producción        |
| `npm run lint`            | Ejecuta el linter                       |
| `npm run prisma:generate` | Genera el cliente de Prisma             |
| `npm run prisma:migrate`  | Crea migraciones de base de datos       |
| `npx prisma studio`       | Abre el editor visual de Prisma         |

## 🗂️ Estructura de Directorios

```
VIGIAH/
├── 📁 app/                    # Páginas y API Routes (Next.js 14)
│   ├── 📁 api/               # Backend endpoints
│   │   ├── patients/         # CRUD de pacientes
│   │   ├── dashboard/        # Estadísticas
│   │   └── users/            # Gestión de usuarios
│   ├── page.js               # Dashboard principal ⭐
│   └── layout.js             # Layout global
├── 📁 components/             # Componentes React reutilizables
│   ├── AgendaComponent.js    # Agenda de citas
│   └── RiskAnalysisCard.js   # Tarjeta de análisis de riesgo
├── 📁 lib/                    # Utilidades y configuraciones
│   ├── db.js                 # Conexión MongoDB ⭐
│   ├── prisma.js             # Cliente Prisma (MySQL) ⭐
│   ├── riskCalculator.js     # Calculadora de riesgo ⭐
│   └── utils.js              # Funciones auxiliares
├── 📁 models/                 # Modelos de datos
│   └── Patient.js            # Modelo Mongoose para pacientes ⭐
├── 📁 prisma/                 # Configuración de Prisma
│   └── schema.prisma         # Esquema de MySQL ⭐
└── 📁 scripts/                # Scripts de utilidad
    └── seedData.js           # Poblar base de datos
```

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"

```powershell
# Reinstalar dependencias
Remove-Item -Recurse -Force node_modules
npm install
```

### Error de conexión a MySQL

1. Verifica que MySQL está corriendo
2. Verifica las credenciales en `.env`
3. Verifica que la base de datos existe

```sql
SHOW DATABASES;
USE vigiah;
```

### Error de conexión a MongoDB

```powershell
# Verificar si MongoDB está corriendo
mongosh

# Si no está corriendo, iniciar el servicio
# En Windows (como administrador):
net start MongoDB
```

### Error en Prisma

```powershell
# Regenerar el cliente
npm run prisma:generate

# Aplicar migraciones
npm run prisma:migrate

# Ver el estado de las migraciones
npx prisma migrate status
```

### Puerto 3000 ya en uso

```powershell
# Detener el proceso que usa el puerto 3000
# Buscar el proceso:
netstat -ano | findstr :3000

# Matar el proceso (reemplaza PID con el número que aparece):
taskkill /PID <PID> /F

# O usa otro puerto:
$env:PORT=3001; npm run dev
```

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Material UI](https://mui.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Recharts](https://recharts.org/)

## 🎓 Próximos Pasos

Una vez que tengas el sistema funcionando:

1. ✅ Explora el dashboard y sus componentes
2. ✅ Prueba las APIs con Postman
3. ✅ Revisa el código de la calculadora de riesgo
4. ✅ Crea páginas adicionales para gestión de pacientes
5. ✅ Implementa autenticación completa
6. ✅ Personaliza los estilos y componentes

## 💡 Consejos de Desarrollo

- Usa `npx prisma studio` para visualizar y editar datos de MySQL
- Usa MongoDB Compass para explorar los documentos de MongoDB
- Los cambios en el código se aplican automáticamente (hot reload)
- Revisa la consola del navegador y terminal para errores
- Usa las DevTools de React para depurar componentes

## 🤝 Soporte

Si encuentras problemas:

1. Revisa esta guía
2. Consulta el README.md
3. Revisa los comentarios en el código
4. Verifica los logs en la terminal y consola del navegador

---

¡Feliz desarrollo! 🎉
