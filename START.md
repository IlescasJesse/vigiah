# 🚀 Clínica Cardiometabolismo - Guía de Inicio Rápido

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** v18+
- **MongoDB** corriendo en localhost:27017
- **MySQL** corriendo en localhost:3306
- **Git**

## Instalación en 3 Pasos

### 1. Clonar e Instalar Dependencias

```bash
git clone https://github.com/IlescasJesse/vigiah.git
cd vigiah
npm install
```

### 2. Configurar Variables de Entorno

El archivo `.env` ya está configurado con valores por defecto:

```env
# MySQL (Prisma)
DATABASE_URL="mysql://root:@localhost:3306/vigiah"

# MongoDB (Mongoose)
MONGODB_URI="mongodb://localhost:27017/vigiah"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="vigiah-secret-key-2026"
```

**Nota**: Si tu MySQL tiene contraseña, actualiza `DATABASE_URL` con tu contraseña:

```
DATABASE_URL="mysql://root:TU_PASSWORD@localhost:3306/vigiah"
```

### 3. Configurar Base de Datos

Ejecuta un solo comando que hará todo:

```bash
npm run setup
```

Este comando ejecuta automáticamente:

1. Crea la base de datos MySQL `vigiah`
2. Ejecuta las migraciones de Prisma (crea tablas)
3. Puebla las bases de datos con datos de ejemplo

**O ejecuta paso a paso:**

```bash
# Crear base de datos MySQL
npm run db:create

# Ejecutar migraciones de Prisma
npm run prisma:migrate -- --name init

# Poblar con datos de ejemplo
npm run seed
```

## 🎉 Ejecutar la Aplicación

```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

## 📊 Datos de Prueba

Después del seed, puedes usar estas credenciales:

| Usuario   | Email                | Contraseña    | Rol       |
| --------- | -------------------- | ------------- | --------- |
| Admin     | admin@vigiah.com     | Admin123!     | ADMIN     |
| Médico    | dr.cardio@vigiah.com | Medico123!    | MEDICO    |
| Residente | residente@vigiah.com | Residente123! | RESIDENTE |

**Pacientes de Ejemplo:**

- 5 pacientes con datos clínicos completos
- Visitas de seguimiento a 1, 3, 5, 7, 10 y 12 meses
- Datos de LDL, HbA1c, FEVI, presión arterial

## 🗂️ Estructura del Proyecto

```
vigiah/
├── app/                      # Next.js 14 App Router
│   ├── api/                 # API Routes (Backend)
│   │   ├── patients/        # Endpoints de pacientes
│   │   └── users/           # Endpoints de usuarios
│   ├── dashboard/           # Dashboard clínico
│   ├── pacientes/           # Lista y detalle de pacientes
│   └── layout.js            # Layout principal con tema
│
├── src/
│   ├── components/          # Componentes React
│   │   ├── layout/          # Sidebar, TopBar, MainLayout
│   │   └── PatientTracking.js  # Stepper de protocolo 12 meses
│   ├── data/                # Mock data para UI
│   └── theme/               # Tema MUI personalizado
│
├── lib/                     # Utilidades
│   ├── db.js               # Conexión MongoDB
│   ├── prisma.js           # Cliente Prisma
│   └── riskCalculator.js   # Calculadora de riesgo
│
├── models/                  # Modelos Mongoose
│   └── Patient.js          # Modelo de paciente
│
├── prisma/                  # Schema de Prisma
│   └── schema.prisma       # Definición de tablas MySQL
│
└── scripts/                 # Scripts de utilidad
    ├── createDatabase.js   # Crear BD MySQL
    └── seedData.js         # Poblar datos de ejemplo
```

## 📋 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo
npm run build            # Construir para producción
npm run start            # Iniciar servidor de producción

# Base de Datos
npm run db:create        # Crear base de datos MySQL
npm run prisma:migrate   # Ejecutar migraciones
npm run prisma:generate  # Generar cliente Prisma
npm run seed             # Poblar con datos de ejemplo
npm run setup            # Configuración completa (todo lo anterior)

# Utilidades
npm run lint             # Ejecutar linter
npm run risk:examples    # Ver ejemplos del calculador de riesgo
```

## 🎨 Características Implementadas

### Frontend

- Dashboard clínico con 4 KPIs
- Gráficas de tendencias metabólicas (Recharts)
- Lista de pacientes con búsqueda
- Seguimiento de protocolo con stepper vertical (7 pasos: Basal, Mes 1, 3, 5, 7, 10, 12)
- Tema personalizado MUI (Navy #003366 + Cyan #00AEEF)
- Layout persistente con Sidebar y TopBar
- Diseño responsive

### Backend

- API REST completa para pacientes y usuarios
- Base de datos híbrida:
  - **MongoDB**: Datos clínicos (pacientes, visitas)
  - **MySQL**: Usuarios, autenticación, catálogos
- Calculadora de riesgo cardiovascular con 3 reglas:
  1. Control de LDL (< 70 mg/dL)
  2. Control glicémico HbA1c (< 7%)
  3. Función ventricular FEVI (≥ 40%)

## 🔧 Solución de Problemas

### Error: MongoDB no conecta

```bash
# Verifica que MongoDB esté corriendo
# Windows:
net start MongoDB

# Linux/Mac:
sudo systemctl start mongod
```

### Error: MySQL authentication failed

Actualiza el archivo `.env` con tus credenciales correctas:

```env
DATABASE_URL="mysql://root:TU_PASSWORD@localhost:3306/vigiah"
```

### Error: Cannot find module

```bash
# Reinstala dependencias
rm -rf node_modules
npm install
```

### Error: Prisma Client not generated

```bash
npm run prisma:generate
```

## 📖 Documentación Adicional

- **UI Architecture**: `docs/UI_ARCHITECTURE.md` - Arquitectura UI completa
- **API Documentation**: `docs/API.md` - Endpoints disponibles
- **Technical Docs**: `docs/TECHNICAL.md` - Documentación técnica detallada
- **Quick Start UI**: `QUICKSTART_UI.md` - Guía de componentes UI

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👤 Autor

**IlescasJesse**

---

**Clínica Cardiometabolismo** - Sistema de Vigilancia e Indicadores de Gestión en Intervención y Angioplastia-Hemodinámica © 2026
