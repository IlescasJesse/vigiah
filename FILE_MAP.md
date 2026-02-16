# 🗺️ Mapa Visual del Sistema Clínica Cardiometabolismo

## 📍 Ubicación de Archivos por Funcionalidad

### 🎨 Si quieres modificar el DISEÑO VISUAL:

```
📂 app/
   ├── 📄 theme.js          → Colores, fuentes, estilos de MUI
   ├── 📄 globals.css       → Estilos CSS globales
   └── 📄 page.js           → Layout del dashboard

📂 components/
   ├── 📄 AgendaComponent.js       → Diseño de la agenda
   └── 📄 RiskAnalysisCard.js      → Diseño de la tarjeta de riesgo
```

### 🧮 Si quieres modificar la LÓGICA DE RIESGO:

```
📂 lib/
   └── 📄 riskCalculator.js   → ⭐ AQUÍ están las 3 reglas clínicas
```

**Las 3 reglas están en:**

- Línea ~45: Regla 1 - Control de LDL
- Línea ~65: Regla 2 - Control Glicémico
- Línea ~88: Regla 3 - Alerta de IC

### 🗄️ Si quieres modificar los DATOS DEL PACIENTE:

```
📂 models/
   └── 📄 Patient.js          → ⭐ Esquema MongoDB del paciente

📂 prisma/
   └── 📄 schema.prisma       → ⭐ Esquema MySQL de usuarios
```

### 🔌 Si quieres modificar las APIs:

```
📂 app/api/
   ├── 📂 patients/
   │   ├── 📄 route.js                    → GET, POST todos los pacientes
   │   └── 📂 [id]/
   │       ├── 📄 route.js                → GET, PUT, DELETE un paciente
   │       └── 📂 visits/
   │           └── 📄 route.js            → Agregar/ver visitas
   ├── 📂 dashboard/
   │   └── 📂 stats/
   │       └── 📄 route.js                → Estadísticas del dashboard
   └── 📂 users/
       └── 📄 route.js                    → Gestión de usuarios
```

### 🔗 Si quieres modificar las CONEXIONES DE BD:

```
📂 lib/
   ├── 📄 db.js         → Conexión a MongoDB
   └── 📄 prisma.js     → Conexión a MySQL

📄 .env                 → ⚠️ Credenciales de bases de datos
```

---

## 🎯 Flujo de Trabajo Típico

### Escenario 1: "Quiero cambiar cómo se calcula el riesgo"

```
1. Abre: lib/riskCalculator.js
2. Busca la función: calculateRisk()
3. Modifica las reglas (líneas 45, 65, 88)
4. Guarda el archivo
5. El cambio se aplica automáticamente (hot reload)
```

### Escenario 2: "Quiero agregar un campo nuevo al paciente"

```
1. Abre: models/Patient.js
2. Agrega el campo al esquema (ej: bloodType: String)
3. Guarda el archivo
4. El nuevo campo estará disponible en MongoDB
```

### Escenario 3: "Quiero cambiar los colores del dashboard"

```
1. Abre: app/theme.js
2. Modifica palette.primary.main (línea 7)
3. Guarda el archivo
4. Los colores se actualizan automáticamente
```

### Escenario 4: "Quiero crear un nuevo endpoint de API"

```
1. Crea: app/api/nueva-ruta/route.js
2. Exporta funciones: export async function GET() { ... }
3. Accede en: http://localhost:3000/api/nueva-ruta
```

---

## 📊 Flujo de Datos: Agregar una Visita

```
┌──────────────────────────────────────────────────────────────┐
│  1. Usuario en Frontend                                      │
│     (Llena formulario con datos de visita)                  │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  2. POST /api/patients/:id/visits                           │
│     📄 app/api/patients/[id]/visits/route.js                │
│     - Recibe datos de la visita                             │
│     - Valida datos requeridos                               │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  3. Busca Paciente en MongoDB                               │
│     📄 lib/db.js + models/Patient.js                        │
│     - await Patient.findById(id)                            │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  4. Calcula Riesgo                                          │
│     📄 lib/riskCalculator.js                                │
│     - calculateRisk(patientData)                            │
│     - Aplica las 3 reglas clínicas                          │
│     - Retorna: lipidControl, glycemicControl, alerts        │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  5. Agrega Visita al Paciente                               │
│     - patient.visits.push(newVisit)                         │
│     - await patient.save()                                  │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  6. Retorna Respuesta                                       │
│     { success: true, data: { visit, riskAnalysis } }        │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  7. Frontend Actualiza UI                                   │
│     - Muestra datos de la nueva visita                      │
│     - Muestra análisis de riesgo                            │
│     - Actualiza estadísticas si es necesario                │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔍 Dónde Encontrar Cada Cosa

### "¿Dónde está la calculadora de riesgo?"

```
📄 lib/riskCalculator.js
   - Línea 25: función calculateRisk()
   - Línea 140: función isPatientInTarget()
   - Línea 158: función calculatePopulationStats()
```

### "¿Dónde se definen los campos del paciente?"

```
📄 models/Patient.js
   - Línea 55: patientSchema (esquema principal)
   - Línea 5: visitSchema (sub-documento de visitas)
```

### "¿Dónde está el dashboard visual?"

```
📄 app/page.js
   - Línea 47: Componente Dashboard
   - Línea 68: KPIs (4 tarjetas)
   - Línea 189: Gráfica de Recharts
   - Línea 235: Componente de Agenda
```

### "¿Dónde están los colores y estilos?"

```
📄 app/theme.js
   - Línea 6: palette (colores)
   - Línea 29: typography (fuentes)
   - Línea 38: components (estilos de componentes)
```

### "¿Dónde se conecta a las bases de datos?"

```
📄 lib/db.js         → MongoDB (línea 17: conectDB())
📄 lib/prisma.js     → MySQL (línea 5: PrismaClient)
📄 .env              → Credenciales
```

---

## 🎨 Personalización Rápida

### Cambiar Color Principal del Sistema

```javascript
// 📄 app/theme.js - Línea 7
primary: {
  main: '#1976d2',  // ← Cambia este color
}
```

### Cambiar Metas Clínicas

```javascript
// 📄 lib/riskCalculator.js

// Meta de LDL (Línea 54)
if (currentLDL < 70 || ldlReduction >= 0.3) {
  // Cambia 70 o 0.3 según nueva meta

// Meta de HbA1c (Línea 75)
if (currentHbA1c < 7.0) {
  // Cambia 7.0 según nueva meta
```

### Agregar Nuevo KPI al Dashboard

```javascript
// 📄 app/page.js - Después de la línea 180

<Grid item xs={12} sm={6} md={3}>
  <Card>
    <CardContent>
      <Typography variant='body2'>Nuevo KPI</Typography>
      <Typography variant='h4'>{nuevoValor}</Typography>
    </CardContent>
  </Card>
</Grid>
```

---

## 🧪 Cómo Probar Cambios

### 1. Modificar Código

```
Abre el archivo → Modifica → Guarda (Ctrl+S)
```

### 2. Ver Cambios

```
El navegador se recarga automáticamente (hot reload)
Si no, presiona F5 para refrescar
```

### 3. Ver Errores

```
🖥️ Terminal (PowerShell): Errores de backend
🌐 Consola del Navegador (F12): Errores de frontend
```

---

## 📚 Cheat Sheet de Archivos

| Quiero...                | Archivo                  | Línea Aprox |
| ------------------------ | ------------------------ | ----------- |
| Cambiar regla de LDL     | `lib/riskCalculator.js`  | ~54         |
| Cambiar regla de HbA1c   | `lib/riskCalculator.js`  | ~75         |
| Cambiar alerta de IC     | `lib/riskCalculator.js`  | ~100        |
| Agregar campo a paciente | `models/Patient.js`      | ~55         |
| Cambiar color principal  | `app/theme.js`           | ~7          |
| Modificar dashboard      | `app/page.js`            | ~47         |
| Agregar API endpoint     | `app/api/nueva/route.js` | Nueva       |
| Cambiar conexión BD      | `.env`                   | Toda        |
| Agregar dependencia      | `package.json`           | ~20         |

---

## 🚀 Comandos Más Usados

```powershell
# Iniciar desarrollo (más usado)
npm run dev

# Ver ejemplos de riesgo
npm run risk:examples

# Poblar base de datos
npm run seed

# Regenerar Prisma
npm run prisma:generate

# Ver base de datos MySQL
npx prisma studio
```

---

## ⚠️ Archivos que NO debes subir a Git

```
❌ .env                 (credenciales sensibles)
❌ node_modules/        (librerías - se instalan con npm)
❌ .next/               (build de Next.js)
```

**Estos archivos están en `.gitignore`** ✅

---

## 💡 Tips de Desarrollo

### Atajo 1: Buscar en todos los archivos

```
Ctrl + Shift + F (VS Code)
Busca "calculateRisk" para ver dónde se usa
```

### Atajo 2: Ir a definición

```
Ctrl + Click en una función
Te lleva al archivo donde está definida
```

### Atajo 3: Ver estructura

```
Ctrl + Shift + E (VS Code)
Muestra el explorador de archivos
```

### Atajo 4: Terminal integrada

```
Ctrl + ` (VS Code)
Abre/cierra la terminal
```

---

**🗺️ ¡Usa este mapa para navegar el proyecto fácilmente! 🗺️**

_Última actualización: 21 de enero de 2026_
