# 📖 Índice de Documentación - Clínica Cardiometabolismo

## 🎯 Comienza Aquí

Si es tu **primera vez** con el proyecto, lee los documentos en este orden:

1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** ⭐ ← **¡EMPIEZA AQUÍ!**

   - Resumen completo del proyecto
   - Qué se ha creado
   - Estructura de archivos
   - Checklist de componentes

2. **[GUIDE.md](GUIDE.md)** 🚀

   - Instalación paso a paso
   - Configuración de bases de datos
   - Primer arranque
   - Solución de problemas

3. **[README.md](README.md)** 📚

   - Documentación general
   - Arquitectura del proyecto
   - Modelos de datos
   - API endpoints
   - Ejemplos de uso

4. **[FILE_MAP.md](FILE_MAP.md)** 🗺️

   - Mapa visual del sistema
   - Dónde encontrar cada cosa
   - Flujos de trabajo típicos
   - Personalización rápida

5. **[TECHNICAL_DOCS.md](TECHNICAL_DOCS.md)** 🔧
   - Documentación técnica detallada
   - Funciones clave
   - Arquitectura de datos
   - Convenciones de código

---

## 📂 Navegación por Tema

### 🎓 Para Aprender

| Tema             | Documento                                | Sección               |
| ---------------- | ---------------------------------------- | --------------------- |
| ¿Qué es el sistema?  | [README.md](README.md)                   | Introducción          |
| ¿Cómo funciona?  | [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Arquitectura          |
| Reglas clínicas  | [README.md](README.md)                   | Lógica de Negocio     |
| Modelos de datos | [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md)   | Arquitectura de Datos |

### 🛠️ Para Instalar y Configurar

| Tarea                 | Documento            | Sección |
| --------------------- | -------------------- | ------- |
| Instalar dependencias | [GUIDE.md](GUIDE.md) | Paso 1  |
| Configurar MySQL      | [GUIDE.md](GUIDE.md) | Paso 2  |
| Configurar MongoDB    | [GUIDE.md](GUIDE.md) | Paso 3  |
| Variables de entorno  | [GUIDE.md](GUIDE.md) | Paso 4  |
| Inicializar Prisma    | [GUIDE.md](GUIDE.md) | Paso 5  |
| Poblar base de datos  | [GUIDE.md](GUIDE.md) | Paso 6  |

### 💻 Para Desarrollar

| Necesito...                        | Documento                  | Sección               |
| ---------------------------------- | -------------------------- | --------------------- |
| Entender la estructura             | [FILE_MAP.md](FILE_MAP.md) | Ubicación de Archivos |
| Modificar la calculadora de riesgo | [FILE_MAP.md](FILE_MAP.md) | Lógica de Riesgo      |
| Crear nuevo endpoint               | [FILE_MAP.md](FILE_MAP.md) | Escenario 4           |
| Agregar campo a paciente           | [FILE_MAP.md](FILE_MAP.md) | Escenario 2           |
| Cambiar colores                    | [FILE_MAP.md](FILE_MAP.md) | Escenario 3           |

### 🔌 Para Usar las APIs

| Endpoint               | Documento                              | Sección        |
| ---------------------- | -------------------------------------- | -------------- |
| Listar pacientes       | [README.md](README.md)                 | API Endpoints  |
| Agregar visita         | [README.md](README.md)                 | Ejemplo de Uso |
| Estadísticas dashboard | [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md) | API Routes     |
| Gestión de usuarios    | [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md) | API Routes     |

### 🧮 Para Entender la Lógica de Riesgo

| Tema                        | Documento                       | Ubicación         |
| --------------------------- | ------------------------------- | ----------------- |
| Explicación de las 3 reglas | [README.md](README.md)          | Lógica de Negocio |
| Código fuente               | `lib/riskCalculator.js`         | Todo el archivo   |
| Ejemplos prácticos          | `lib/riskCalculatorExamples.js` | Todo el archivo   |
| Ejecutar ejemplos           | [GUIDE.md](GUIDE.md)            | Prueba de APIs    |

### 🎨 Para Personalizar el Frontend

| Quiero cambiar... | Archivo                          | Documento Ayuda                        |
| ----------------- | -------------------------------- | -------------------------------------- |
| Colores del tema  | `app/theme.js`                   | [FILE_MAP.md](FILE_MAP.md)             |
| Dashboard         | `app/page.js`                    | [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md) |
| Agenda de citas   | `components/AgendaComponent.js`  | [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md) |
| Tarjeta de riesgo | `components/RiskAnalysisCard.js` | [FILE_MAP.md](FILE_MAP.md)             |
| Estilos globales  | `app/globals.css`                | -                                      |

### 🗄️ Para Trabajar con Datos

| Base de Datos       | Documento              | Archivos Clave                          |
| ------------------- | ---------------------- | --------------------------------------- |
| MongoDB (Pacientes) | [README.md](README.md) | `lib/db.js`, `models/Patient.js`        |
| MySQL (Usuarios)    | [README.md](README.md) | `lib/prisma.js`, `prisma/schema.prisma` |
| Poblar con datos    | [GUIDE.md](GUIDE.md)   | `scripts/seedData.js`                   |

---

## 🔍 Búsqueda Rápida

### "¿Dónde está...?"

<details>
<summary><strong>La calculadora de riesgo</strong></summary>

- **Archivo:** `lib/riskCalculator.js`
- **Documentación:** [README.md - Lógica de Negocio](README.md#-lógica-de-negocio-calculadora-de-riesgo)
- **Ejemplos:** `lib/riskCalculatorExamples.js`
- **Ejecutar ejemplos:** `npm run risk:examples`
</details>

<details>
<summary><strong>Los modelos de datos</strong></summary>

- **MongoDB (Patient):** `models/Patient.js`
- **MySQL (User):** `prisma/schema.prisma`
- **Documentación:** [README.md - Modelos de Datos](README.md#-modelos-de-datos)
</details>

<details>
<summary><strong>Las APIs</strong></summary>

- **Directorio:** `app/api/`
- **Pacientes:** `app/api/patients/`
- **Dashboard:** `app/api/dashboard/`
- **Usuarios:** `app/api/users/`
- **Documentación:** [README.md - API Endpoints](README.md#-api-endpoints)
</details>

<details>
<summary><strong>El dashboard</strong></summary>

- **Archivo principal:** `app/page.js`
- **Componente Agenda:** `components/AgendaComponent.js`
- **Tema/Colores:** `app/theme.js`
- **Documentación:** [TECHNICAL_DOCS.md - Componentes UI](TECHNICAL_DOCS.md#-componentes-ui)
</details>

<details>
<summary><strong>La conexión a bases de datos</strong></summary>

- **MongoDB:** `lib/db.js`
- **MySQL:** `lib/prisma.js`
- **Credenciales:** `.env`
- **Documentación:** [GUIDE.md - Configurar Bases de Datos](GUIDE.md#paso-2-configurar-mysql)
</details>

---

## 🎓 Rutas de Aprendizaje

### 👶 Principiante - "Nunca he usado este stack"

1. Lee: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Para entender qué es VIGIAH
2. Sigue: [GUIDE.md](GUIDE.md) - Instalación paso a paso
3. Ejecuta: `npm run risk:examples` - Ver la calculadora en acción
4. Explora: [FILE_MAP.md](FILE_MAP.md) - Dónde está cada cosa
5. Experimenta: Cambia colores en `app/theme.js`

### 🧑 Intermedio - "Conozco React/Next.js"

1. Revisa: [README.md](README.md) - Arquitectura general
2. Analiza: `lib/riskCalculator.js` - Lógica de negocio
3. Estudia: `app/page.js` - Componente principal
4. Prueba: APIs con Postman
5. Modifica: Agrega un nuevo KPI al dashboard

### 👨‍💻 Avanzado - "Voy a extender el sistema"

1. Estudia: [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md) - Documentación técnica completa
2. Analiza: Flujos de datos
3. Revisa: Modelos de MongoDB y Prisma
4. Planea: Nuevas funcionalidades
5. Implementa: Siguiendo las convenciones del proyecto

---

## 📋 Checklist de Inicio

- [ ] Leer [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- [ ] Instalar dependencias (`npm install`)
- [ ] Configurar bases de datos (MySQL + MongoDB)
- [ ] Configurar `.env`
- [ ] Ejecutar migraciones de Prisma
- [ ] Poblar base de datos (`npm run seed`)
- [ ] Iniciar proyecto (`npm run dev`)
- [ ] Abrir [http://localhost:3000](http://localhost:3000)
- [ ] Probar APIs
- [ ] Ejecutar ejemplos de riesgo (`npm run risk:examples`)
- [ ] Leer [README.md](README.md) completo
- [ ] Explorar código fuente

---

## 🚀 Comandos Esenciales

```powershell
# Desarrollo
npm run dev                # Iniciar servidor de desarrollo

# Base de datos
npm run prisma:generate    # Generar cliente Prisma
npm run prisma:migrate     # Ejecutar migraciones
npm run seed               # Poblar con datos de ejemplo
npx prisma studio          # Abrir editor visual de MySQL

# Testing
npm run risk:examples      # Ejecutar ejemplos de calculadora de riesgo

# Producción
npm run build              # Construir para producción
npm start                  # Iniciar en producción
```

---

## 🆘 Ayuda y Soporte

### Tengo un error de...

| Tipo de Error | Consulta                                                                    |
| ------------- | --------------------------------------------------------------------------- |
| Instalación   | [GUIDE.md - Solución de Problemas](GUIDE.md#-solución-de-problemas-comunes) |
| Base de datos | [GUIDE.md - Configurar BD](GUIDE.md#paso-2-configurar-mysql)                |
| API           | [README.md - API Endpoints](README.md#-api-endpoints)                       |
| Frontend      | [TECHNICAL_DOCS.md - Componentes UI](TECHNICAL_DOCS.md#-componentes-ui)     |

### Necesito entender...

| Concepto             | Consulta                                                                            |
| -------------------- | ----------------------------------------------------------------------------------- |
| La arquitectura      | [PROJECT_SUMMARY.md - Arquitectura](PROJECT_SUMMARY.md#-arquitectura)               |
| Las reglas clínicas  | [README.md - Lógica de Negocio](README.md#-lógica-de-negocio-calculadora-de-riesgo) |
| Los modelos de datos | [TECHNICAL_DOCS.md - Modelos](TECHNICAL_DOCS.md#-arquitectura-de-datos)             |
| El flujo de datos    | [FILE_MAP.md - Flujos](FILE_MAP.md#-flujo-de-datos-agregar-una-visita)              |

---

## 📚 Todos los Documentos

| Documento                                | Descripción                     | Tamaño | Audiencia       |
| ---------------------------------------- | ------------------------------- | ------ | --------------- |
| [INDEX.md](INDEX.md)                     | Este archivo - Índice general   | Corto  | Todos           |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Resumen ejecutivo del proyecto  | Medio  | Todos           |
| [README.md](README.md)                   | Documentación general completa  | Largo  | Desarrolladores |
| [GUIDE.md](GUIDE.md)                     | Guía de instalación paso a paso | Medio  | Principiantes   |
| [FILE_MAP.md](FILE_MAP.md)               | Mapa visual de archivos         | Medio  | Desarrolladores |
| [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md)   | Documentación técnica detallada | Largo  | Avanzados       |

---

## 🎯 Objetivos del Sistema

Clínica Cardiometabolismo es un sistema médico para:

✅ Seguimiento de pacientes cardiovasculares  
✅ Evaluación automática de riesgo clínico  
✅ Control de metas terapéuticas (LDL, HbA1c, FEVI)  
✅ Gestión de agenda de citas  
✅ Dashboard con KPIs y visualizaciones  
✅ Base de datos híbrida (MongoDB + MySQL)

---

## 🏗️ Stack Tecnológico

- **Frontend:** Next.js 14 + Material UI v5 + Recharts
- **Backend:** Next.js API Routes
- **MongoDB:** Expedientes de pacientes (Mongoose)
- **MySQL:** Usuarios y catálogos (Prisma)
- **Lógica:** JavaScript con módulos ES6

---

## 🎊 ¡Bienvenido a Clínica Cardiometabolismo!

Este índice te ayudará a navegar toda la documentación del proyecto.

**Próximos pasos:**

1. Lee el [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. Sigue la [GUIDE.md](GUIDE.md) para instalar
3. Explora el código con [FILE_MAP.md](FILE_MAP.md)

---

_Sistema Clínica Cardiometabolismo - Vigilancia e Indicadores de Gestión en Intervención y Angioplastia-Hemodinámica_  
_© 2026 - Desarrollado con ❤️ como Arquitecto de Software Senior_
