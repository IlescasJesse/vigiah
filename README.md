# VIGIAH - Sistema de Vigilancia Médica

**Sistema de Vigilancia e Indicadores de Gestión en Intervención y Angioplastia-Hemodinámica**

Sistema médico completo construido con el stack MERN y Next.js 14, diseñado para el seguimiento y control de pacientes con riesgo cardiovascular.

> 📚 **¿Primera vez aquí?** Comienza con el [INDEX.md](INDEX.md) para una guía completa de toda la documentación.

## 🏗️ Arquitectura del Proyecto

```
VIGIAH/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes
│   │   ├── patients/            # Endpoints de pacientes
│   │   │   ├── route.js         # GET, POST /api/patients
│   │   │   └── [id]/
│   │   │       ├── route.js     # GET, PUT, DELETE /api/patients/:id
│   │   │       └── visits/
│   │   │           └── route.js # POST, GET /api/patients/:id/visits
│   │   ├── dashboard/
│   │   │   └── stats/
│   │   │       └── route.js     # GET /api/dashboard/stats
│   │   └── users/
│   │       └── route.js         # GET, POST /api/users
│   ├── page.js                  # Dashboard principal
│   ├── layout.js                # Layout raíz
│   ├── globals.css              # Estilos globales
│   └── theme.js                 # Configuración de tema MUI
├── components/
│   └── AgendaComponent.js       # Componente de agenda de citas
├── lib/
│   ├── db.js                    # Conexión a MongoDB (Mongoose)
│   ├── prisma.js                # Cliente de Prisma (MySQL)
│   └── riskCalculator.js        # Lógica de negocio - Calculadora de Riesgo
├── models/
│   └── Patient.js               # Modelo Mongoose para pacientes
├── prisma/
│   └── schema.prisma            # Esquema de base de datos MySQL
├── .env                         # Variables de entorno (NO subir a Git)
├── .env.example                 # Plantilla de variables de entorno
├── .gitignore                   # Archivos ignorados por Git
├── next.config.js               # Configuración de Next.js
└── package.json                 # Dependencias del proyecto
```

## 🚀 Tecnologías Utilizadas

### Frontend

- **Next.js 14** (App Router) - Framework React con SSR
- **Material UI (MUI v5)** - Biblioteca de componentes UI
- **Recharts** - Gráficas y visualizaciones
- **date-fns** - Manejo de fechas

### Backend

- **API Routes de Next.js** - Backend serverless
- **Mongoose** - ODM para MongoDB
- **Prisma ORM** - ORM para MySQL

### Base de Datos Híbrida

- **MongoDB** - Expedientes de pacientes (datos clínicos)
- **MySQL** - Usuarios y catálogos

## 📦 Instalación

### 1. Clonar el repositorio e instalar dependencias

```powershell
cd VIGIAH
npm install
```

### 2. Configurar las bases de datos

#### MySQL

Asegúrate de tener MySQL instalado y crea la base de datos:

```sql
CREATE DATABASE vigiah;
```

#### MongoDB

Instala MongoDB localmente o usa MongoDB Atlas.

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y configura tus credenciales:

```bash
# MySQL (Prisma)
DATABASE_URL="mysql://usuario:password@localhost:3306/vigiah"

# MongoDB (Mongoose)
MONGODB_URI="mongodb://localhost:27017/vigiah"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secreto-seguro-aqui"
```

### 4. Inicializar Prisma

```powershell
# Generar el cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate
```

### 5. Ejecutar el proyecto

```powershell
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📊 Modelos de Datos

### Patient (MongoDB - Mongoose)

```javascript
{
  firstName: String,           // Nombre
  lastName: String,            // Apellido
  dateOfBirth: Date,           // Fecha de nacimiento
  gender: String,              // MASCULINO, FEMENINO, OTRO
  email: String,
  phone: String,
  isDiabetic: Boolean,         // ¿Es diabético?
  baselineLDL: Number,         // LDL basal
  baselineLVEF: Number,        // FEVI basal
  visits: [                    // Array de visitas
    {
      visitDate: Date,
      visitNumber: Number,
      weight: Number,          // Peso (kg)
      systolicBP: Number,      // Presión sistólica
      diastolicBP: Number,     // Presión diastólica
      ldl: Number,             // LDL (mg/dL)
      hba1c: Number,           // Hemoglobina glicosilada (%)
      lvef: Number,            // Fracción de eyección (%)
      notes: String,
      medications: Array,
      lipidControl: Boolean,
      glycemicControl: Boolean,
      alerts: Array
    }
  ],
  nextAppointment: Date,
  status: String,              // ACTIVO, INACTIVO, ALTA
  primaryDiagnosis: String
}
```

### User (MySQL - Prisma)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(RESIDENTE)  // ADMIN, MEDICO, RESIDENTE
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🧮 Lógica de Negocio: Calculadora de Riesgo

Ubicación: `lib/riskCalculator.js`

### Función Principal: `calculateRisk(patientData)`

Evalúa el riesgo cardiovascular de un paciente según 3 reglas:

#### ✅ REGLA 1: Control de Lípidos (LDL)

Control logrado si:

- LDL actual < 70 mg/dL, **O**
- Reducción ≥ 30% respecto al LDL basal

```javascript
if (currentLDL < 70 || (baselineLDL - currentLDL) / baselineLDL >= 0.3) {
  lipidControl = true;
}
```

#### ✅ REGLA 2: Control Glicémico (HbA1c)

Para pacientes diabéticos, control logrado si:

- HbA1c < 7.0%

```javascript
if (isDiabetic && currentHbA1c < 7.0) {
  glycemicControl = true;
}
```

#### ⚠️ REGLA 3: Alerta de Insuficiencia Cardíaca

En el mes 5, si:

- LVEF actual < LVEF basal

```javascript
if (visitNumber === 5 && currentLVEF < baselineLVEF) {
  alerts.push("⚠️ Posible Insuficiencia Cardiaca");
  riskLevel = "ALTO";
}
```

### Funciones Auxiliares

- `isPatientInTarget(patientData)` - Verifica si el paciente cumple todas las metas
- `calculatePopulationStats(patients)` - Calcula estadísticas poblacionales

## 🎨 Componentes del Dashboard

### 1. KPIs (Indicadores Clave)

- **Pacientes Activos** - Total de pacientes en seguimiento
- **% Control LDL** - Porcentaje con LDL controlado
- **Próximas Citas** - Citas programadas en la semana
- **Alto Riesgo** - Pacientes que requieren atención inmediata

### 2. Gráfica de Control (Recharts)

Visualización de:

- Pacientes en Meta vs Fuera de Meta
- Control por parámetro (LDL, HbA1c, FEVI)
- Distribución global

### 3. Agenda de Citas (AgendaComponent)

Lista de pacientes con próximas citas:

- Ordenadas por urgencia
- Indicadores de citas vencidas
- Información de visita

## 🔌 API Endpoints

### Pacientes

```
GET    /api/patients              # Listar pacientes
POST   /api/patients              # Crear paciente
GET    /api/patients/:id          # Obtener paciente
PUT    /api/patients/:id          # Actualizar paciente
DELETE /api/patients/:id          # Eliminar paciente (soft delete)
```

### Visitas

```
GET    /api/patients/:id/visits   # Listar visitas del paciente
POST   /api/patients/:id/visits   # Agregar visita y calcular riesgo
```

### Dashboard

```
GET    /api/dashboard/stats       # Obtener estadísticas del dashboard
```

### Usuarios

```
GET    /api/users                 # Listar usuarios
POST   /api/users                 # Crear usuario
```

## 📋 Ejemplo de Uso: Agregar Visita con Cálculo de Riesgo

```javascript
// POST /api/patients/:id/visits
const response = await fetch(`/api/patients/${patientId}/visits`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    visitNumber: 5,
    weight: 75.5,
    systolicBP: 130,
    diastolicBP: 85,
    ldl: 65, // LDL controlado
    hba1c: 6.8, // HbA1c controlado
    lvef: 55, // FEVI estable
    notes: "Paciente en buen estado general",
    medications: [
      { name: "Atorvastatina", dosage: "40mg" },
      { name: "Metformina", dosage: "850mg" },
    ],
  }),
});

// Respuesta incluye análisis de riesgo automático
const result = await response.json();
console.log(result.data.riskAnalysis);
/*
{
  lipidControl: true,
  glycemicControl: true,
  alerts: [],
  riskLevel: 'BAJO',
  recommendations: [...]
}
*/
```

## 🛠️ Scripts Disponibles

```powershell
npm run dev              # Ejecutar en desarrollo
npm run build            # Construir para producción
npm start                # Ejecutar en producción
npm run lint             # Ejecutar linter
npm run prisma:generate  # Generar cliente de Prisma
npm run prisma:migrate   # Ejecutar migraciones de Prisma
```

## 📝 Guía de Ubicación de Archivos

| Tipo de Archivo | Ubicación              | Propósito                               |
| --------------- | ---------------------- | --------------------------------------- |
| Páginas/Vistas  | `app/`                 | Componentes de página usando App Router |
| API Routes      | `app/api/`             | Endpoints del backend                   |
| Componentes     | `components/`          | Componentes reutilizables de React      |
| Modelos MongoDB | `models/`              | Esquemas de Mongoose                    |
| Modelos MySQL   | `prisma/schema.prisma` | Esquemas de Prisma                      |
| Utilidades      | `lib/`                 | Funciones auxiliares y configuraciones  |
| Estilos         | `app/globals.css`      | CSS global                              |
| Configuración   | Raíz del proyecto      | next.config.js, .env, etc.              |

## 🔐 Seguridad

- Las contraseñas se hashean con **bcrypt**
- Variables sensibles en `.env` (no versionado)
- Validación de datos en API routes
- Roles de usuario (ADMIN, MEDICO, RESIDENTE)

## 📈 Próximos Pasos

1. Implementar autenticación completa (NextAuth.js)
2. Agregar páginas de gestión de pacientes (CRUD completo)
3. Implementar sistema de notificaciones
4. Agregar exportación de reportes (PDF, Excel)
5. Implementar gráficas de tendencias por paciente
6. Agregar búsqueda avanzada y filtros
7. Implementar sistema de backup automático

## 👨‍💻 Desarrollo

Este proyecto utiliza:

- **ESLint** para linting
- **Prettier** (recomendado) para formateo de código
- **Git** para control de versiones

## 📄 Licencia

ISC

---

**Desarrollado como Arquitecto de Software Senior**  
Stack MERN + Next.js 14 (App Router)  
© 2026 VIGIAH
