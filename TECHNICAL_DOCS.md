# Documentación Técnica - Clínica Cardiometabolismo

## 📑 Índice de Ubicación de Archivos

### 🎨 Frontend (Next.js 14 + Material UI)

| Archivo             | Ubicación                        | Descripción                                       |
| ------------------- | -------------------------------- | ------------------------------------------------- |
| Dashboard Principal | `app/page.js`                    | Vista principal con KPIs, gráficas y agenda       |
| Layout Global       | `app/layout.js`                  | Layout raíz de la aplicación                      |
| Tema MUI            | `app/theme.js`                   | Configuración de colores y estilos de Material UI |
| Estilos Globales    | `app/globals.css`                | CSS global de la aplicación                       |
| Componente Agenda   | `components/AgendaComponent.js`  | Lista de citas próximas                           |
| Tarjeta de Riesgo   | `components/RiskAnalysisCard.js` | Visualización del análisis de riesgo              |

### 🔧 Backend (API Routes)

| Endpoint                   | Archivo                                 | Métodos          | Descripción                    |
| -------------------------- | --------------------------------------- | ---------------- | ------------------------------ |
| `/api/patients`            | `app/api/patients/route.js`             | GET, POST        | Listar y crear pacientes       |
| `/api/patients/:id`        | `app/api/patients/[id]/route.js`        | GET, PUT, DELETE | CRUD de paciente individual    |
| `/api/patients/:id/visits` | `app/api/patients/[id]/visits/route.js` | GET, POST        | Gestionar visitas del paciente |
| `/api/dashboard/stats`     | `app/api/dashboard/stats/route.js`      | GET              | Estadísticas del dashboard     |
| `/api/users`               | `app/api/users/route.js`                | GET, POST        | Gestión de usuarios            |

### 🗄️ Base de Datos

#### MongoDB (Mongoose)

| Archivo             | Descripción        | Entidades                           |
| ------------------- | ------------------ | ----------------------------------- |
| `lib/db.js`         | Conexión a MongoDB | Configuración de conexión con caché |
| `models/Patient.js` | Modelo de Paciente | Patient, Visits (sub-documento)     |

**Colecciones:**

- `patients` - Expedientes clínicos de pacientes

#### MySQL (Prisma)

| Archivo                | Descripción       | Entidades                       |
| ---------------------- | ----------------- | ------------------------------- |
| `lib/prisma.js`        | Cliente de Prisma | Instancia singleton del cliente |
| `prisma/schema.prisma` | Esquema de BD     | User, Diagnosis, Medication     |

**Tablas:**

- `users` - Usuarios del sistema (ADMIN, MEDICO, RESIDENTE)
- `diagnoses` - Catálogo de diagnósticos
- `medications` - Catálogo de medicamentos

### 🧮 Lógica de Negocio

| Archivo                         | Descripción               | Funciones Principales                                                  |
| ------------------------------- | ------------------------- | ---------------------------------------------------------------------- |
| `lib/riskCalculator.js`         | **Calculadora de Riesgo** | `calculateRisk()`, `isPatientInTarget()`, `calculatePopulationStats()` |
| `lib/utils.js`                  | Utilidades médicas        | Formateo de valores clínicos, cálculo de IMC, edad                     |
| `lib/riskCalculatorExamples.js` | Ejemplos de uso           | Casos prácticos de cálculo de riesgo                                   |

### 🛠️ Scripts y Configuración

| Archivo               | Descripción                               |
| --------------------- | ----------------------------------------- |
| `scripts/seedData.js` | Poblar base de datos con datos de ejemplo |
| `next.config.js`      | Configuración de Next.js                  |
| `package.json`        | Dependencias y scripts npm                |
| `.env`                | Variables de entorno (no versionado)      |
| `.env.example`        | Plantilla de variables de entorno         |
| `.gitignore`          | Archivos ignorados por Git                |

### 📖 Documentación

| Archivo             | Descripción                          |
| ------------------- | ------------------------------------ |
| `README.md`         | Documentación general del proyecto   |
| `GUIDE.md`          | Guía de inicio rápido paso a paso    |
| `TECHNICAL_DOCS.md` | Este archivo - Documentación técnica |

---

## 🔑 Funciones Clave del Sistema

### 1. Calculadora de Riesgo (`lib/riskCalculator.js`)

#### `calculateRisk(patientData)`

Función principal que evalúa el riesgo cardiovascular.

**Parámetros:**

```javascript
{
  baselineLDL: Number,      // LDL basal
  currentLDL: Number,       // LDL actual
  isDiabetic: Boolean,      // ¿Es diabético?
  currentHbA1c: Number,     // HbA1c actual
  baselineLVEF: Number,     // FEVI basal
  currentLVEF: Number,      // FEVI actual
  visitNumber: Number       // Número de visita (mes)
}
```

**Retorno:**

```javascript
{
  lipidControl: Boolean,           // Control de LDL
  glycemicControl: Boolean,        // Control glicémico
  alerts: Array<String>,           // Alertas clínicas
  riskLevel: String,               // 'BAJO', 'MEDIO', 'ALTO'
  recommendations: Array<String>   // Recomendaciones clínicas
}
```

**Reglas de Negocio:**

1. **Control de LDL:** `currentLDL < 70 || (baselineLDL - currentLDL) / baselineLDL >= 0.3`
2. **Control Glicémico:** `isDiabetic && currentHbA1c < 7.0`
3. **Alerta IC:** `visitNumber === 5 && currentLVEF < baselineLVEF`

#### `isPatientInTarget(patientData)`

Verifica si un paciente cumple todas las metas terapéuticas.

**Retorno:** `Boolean`

#### `calculatePopulationStats(patients)`

Calcula estadísticas agregadas de una población.

**Retorno:**

```javascript
{
  total: Number,
  inTarget: Number,
  outOfTarget: Number,
  percentageInTarget: String,
  ldlControlRate: String,
  glycemicControlRate: String,
  highRiskCount: Number
}
```

---

## 🏗️ Arquitectura de Datos

### Modelo Patient (MongoDB)

```javascript
{
  // Datos personales
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: Enum ['MASCULINO', 'FEMENINO', 'OTRO'],
  email: String,
  phone: String,

  // Datos clínicos basales
  isDiabetic: Boolean,
  baselineLDL: Number,
  baselineLVEF: Number,

  // Visitas (array de sub-documentos)
  visits: [{
    visitDate: Date,
    visitNumber: Number,
    weight: Number,           // kg
    systolicBP: Number,       // mmHg
    diastolicBP: Number,      // mmHg
    ldl: Number,              // mg/dL
    hba1c: Number,            // %
    lvef: Number,             // %
    notes: String,
    medications: [{ name, dosage }],
    lipidControl: Boolean,
    glycemicControl: Boolean,
    alerts: [String]
  }],

  // Programación
  nextAppointment: Date,
  status: Enum ['ACTIVO', 'INACTIVO', 'ALTA'],
  primaryDiagnosis: String,
  generalNotes: String,

  // Metadata
  createdAt: Date,
  updatedAt: Date
}
```

**Métodos del Modelo:**

- `getLastVisit()` - Obtiene la última visita
- `getCurrentValues()` - Obtiene valores actuales del paciente
- Virtual: `fullName` - Nombre completo
- Virtual: `age` - Edad calculada

**Índices:**

- `{ firstName: 1, lastName: 1 }`
- `{ status: 1 }`
- `{ nextAppointment: 1 }`
- `{ 'visits.visitDate': -1 }`

### Modelo User (MySQL)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // Hash bcrypt
  name      String?
  role      Role     @default(RESIDENTE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN      // Administrador del sistema
  MEDICO     // Médico tratante
  RESIDENTE  // Médico residente
}
```

---

## 🔄 Flujo de Datos

### Agregar una Visita con Cálculo de Riesgo

```
1. Cliente → POST /api/patients/:id/visits
   ↓
2. API recibe datos de la visita
   ↓
3. Busca paciente en MongoDB
   ↓
4. Crea objeto de nueva visita
   ↓
5. Llama a calculateRisk() con datos del paciente
   ↓
6. Agrega resultados del riesgo a la visita
   ↓
7. Push de la visita al array patient.visits
   ↓
8. Guarda el documento actualizado
   ↓
9. Retorna visita + análisis de riesgo al cliente
```

### Dashboard: Obtener Estadísticas

```
1. Cliente → GET /api/dashboard/stats
   ↓
2. Query pacientes activos de MongoDB
   ↓
3. Para cada paciente:
   - Extrae última visita
   - Prepara datos para calculateRisk()
   ↓
4. Llama a calculatePopulationStats()
   ↓
5. Cuenta próximas citas (7 días)
   ↓
6. Genera datos para gráfica
   ↓
7. Retorna objeto con todas las estadísticas
```

---

## 🔐 Seguridad

### Autenticación

- Contraseñas hasheadas con **bcrypt** (10 rounds)
- Tokens almacenados en variables de entorno

### Base de Datos

- Conexiones con credenciales en `.env` (no versionado)
- Validación de datos en API routes
- Uso de Prisma ORM (previene SQL injection)
- Mongoose con esquemas validados

### API Routes

- Validación de campos requeridos
- Manejo de errores con try-catch
- Códigos HTTP apropiados (200, 201, 400, 404, 500)

---

## 🧪 Testing

### Probar Calculadora de Riesgo

```powershell
# Ejecutar ejemplos
npm run risk:examples
```

### Probar APIs

```powershell
# Iniciar servidor
npm run dev

# En otra terminal o con Postman:
# GET http://localhost:3000/api/patients
# POST http://localhost:3000/api/patients
# etc.
```

---

## 📊 KPIs del Dashboard

| KPI               | Fuente    | Cálculo                                             |
| ----------------- | --------- | --------------------------------------------------- |
| Pacientes Activos | MongoDB   | `Patient.countDocuments({ status: 'ACTIVO' })`      |
| % Control LDL     | Calculado | `(ptes con lipidControl / total) * 100`             |
| Próximas Citas    | MongoDB   | `pacientes con nextAppointment entre hoy y +7 días` |
| Alto Riesgo       | Calculado | `pacientes con riskLevel === 'ALTO'`                |

---

## 🎨 Componentes UI

### Dashboard (app/page.js)

**Componentes MUI usados:**

- `Container` - Contenedor principal
- `Grid` - Sistema de grid responsive
- `Card` / `CardContent` - Tarjetas para KPIs
- `Paper` - Contenedor elevado para gráfica
- `Typography` - Textos
- `Chip` - Etiquetas de estado
- `Box` - Contenedor flexible

**Componentes Recharts:**

- `ResponsiveContainer` - Contenedor responsive
- `BarChart` - Gráfica de barras
- `Bar` - Barras de datos
- `XAxis` / `YAxis` - Ejes
- `CartesianGrid` - Grid de la gráfica
- `Tooltip` - Tooltip interactivo
- `Legend` - Leyenda

### AgendaComponent (components/AgendaComponent.js)

**Funcionalidades:**

- Muestra citas próximas
- Ordena por urgencia (vencidas primero)
- Chips de colores según estado
- Usa `date-fns` para manejo de fechas

**Estados de citas:**

- 🔴 Vencida (error)
- 🟠 Hoy (warning)
- 🔵 Mañana (info)
- 🟢 Próxima (success)

---

## 🚀 Deploy y Producción

### Variables de Entorno Requeridas

```env
# MySQL
DATABASE_URL="mysql://user:pass@host:3306/vigiah"

# MongoDB
MONGODB_URI="mongodb://host:27017/vigiah"
# O MongoDB Atlas:
# MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/vigiah"

# Next.js
NEXTAUTH_URL="https://tu-dominio.com"
NEXTAUTH_SECRET="secreto-produccion-seguro"
```

### Build para Producción

```powershell
# Build
npm run build

# Iniciar
npm start
```

### Consideraciones

1. Asegúrate de ejecutar migraciones de Prisma en producción
2. Configura índices en MongoDB para mejor performance
3. Implementa rate limiting en APIs
4. Agrega monitoreo y logs
5. Configura backups automáticos

---

## 📈 Extensiones Futuras

### Próximas Funcionalidades

1. **Autenticación Completa**

   - NextAuth.js con roles
   - Protección de rutas
   - Sesiones persistentes

2. **Gestión de Pacientes**

   - CRUD completo con UI
   - Búsqueda y filtros avanzados
   - Paginación de resultados

3. **Notificaciones**

   - Email/SMS para citas
   - Alertas de alto riesgo
   - Recordatorios de medicación

4. **Reportes**

   - Exportación a PDF
   - Gráficas de tendencias por paciente
   - Informes poblacionales

5. **Análisis Avanzado**
   - Predicción de riesgo con ML
   - Análisis de tendencias
   - Benchmarking

---

## 🤝 Contribución

### Buenas Prácticas

- Seguir el patrón de carpetas establecido
- Comentar funciones complejas
- Validar datos en API routes
- Manejar errores apropiadamente
- Usar nombres descriptivos de variables
- Mantener componentes pequeños y reutilizables

### Convenciones de Código

- Usar `camelCase` para variables y funciones
- Usar `PascalCase` para componentes React
- Usar `UPPER_SNAKE_CASE` para constantes
- Indentar con 2 espacios
- Usar comillas simples para strings

---

**Última actualización:** 21 de enero de 2026  
**Versión:** 1.0.0  
**Licencia:** ISC
