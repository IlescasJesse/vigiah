# VIGIAH - Quick Start Guide

## Arquitectura UI Completada

### Componentes Creados

1. **Sistema de Tema** (`src/theme/`)

   - [COMPLETO] theme.js - Configuración MUI con paleta clínica
   - [COMPLETO] ThemeRegistry.js - Provider con soporte SSR

2. **Layout** (`src/components/layout/`)

   - [COMPLETO] Sidebar.js - Navegación persistente (280px)
   - [COMPLETO] TopBar.js - Barra superior con breadcrumbs
   - [COMPLETO] MainLayout.js - Wrapper del layout

3. **Componentes Principales** (`src/components/`)

   - [COMPLETO] PatientTracking.js - Stepper de protocolo 12 meses

4. **Páginas** (`app/`)

   - [COMPLETO] page.js - Home (redirect a dashboard)
   - [COMPLETO] dashboard/page.js - Dashboard clínico
   - [COMPLETO] pacientes/page.js - Lista de pacientes
   - [COMPLETO] pacientes/[id]/page.js - Detalle con stepper

5. **Datos Mock** (`src/data/`)

   - [COMPLETO] mockData.js - Datos clínicos de prueba

6. **Configuración**
   - [COMPLETO] jsconfig.json - Alias de rutas (@/...)
   - [COMPLETO] app/layout.js - Integración ThemeRegistry + MainLayout

## Cómo Ejecutar

### 1. Verificar Dependencias

```powershell
npm install
```

### 2. Configurar Variables de Entorno

Verifica que `.env` existe con:

```
MONGODB_URI=mongodb://localhost:27017/vigiah
MYSQL_URL="mysql://root:password@localhost:3306/vigiah"
```

### 3. Ejecutar en Desarrollo

```powershell
npm run dev
```

### 4. Abrir en Navegador

Navegar a:

- **Dashboard**: http://localhost:3000
- **Pacientes**: http://localhost:3000/pacientes
- **Detalle Paciente**: http://localhost:3000/pacientes/PAC-001

## Características UI Implementadas

### Dashboard Clínico

- 4 KPIs con indicadores visuales
- Gráfica de tendencia metabólica (AreaChart)
- Lista de acciones urgentes
- Control por parámetro (BarChart)
- Indicadores de progreso

### Lista de Pacientes

- Búsqueda en tiempo real
- Tabla con avatares y datos clave
- Chips de estado y riesgo
- Navegación a detalle

### Seguimiento del Paciente

- Stepper vertical de 7 pasos (protocolo 12 meses)
- **Mes 3**: Pesquisa metabólica con Glucosa/HbA1c obligatorios
- **Mes 5**: Ecocardiograma con borde cyan y FEVI/Motilidad obligatorios
- Validación de campos críticos antes de avanzar
- Iconos de estado por paso (completo/activo/pendiente)

### Layout Persistente

- Sidebar fijo con navegación
- TopBar con breadcrumbs dinámicos
- Notificaciones (badge: 3)
- Menú de perfil de usuario

## Datos de Prueba

El archivo `src/data/mockData.js` contiene:

- 145 pacientes activos
- Historial de 12 meses de control metabólico
- 5 pacientes con citas urgentes vencidas
- Distribución de riesgo y parámetros

## Próximos Pasos

### Integración Backend

1. Reemplazar mockData con llamadas a API
2. Conectar formularios a endpoints POST/PUT
3. Implementar autenticación

### Formularios

1. Instalar `react-hook-form`
2. Agregar validaciones de campos clínicos
3. Mensajes de error específicos

### Funcionalidades Adicionales

1. Página de Agenda/Calendario
2. Calculadora de Riesgo standalone
3. Exportación a PDF/Excel
4. Sistema de notificaciones en tiempo real

## Estructura de Archivos Clave

```
VIGIAH/
├── app/
│   ├── layout.js              ← Integra ThemeRegistry + MainLayout
│   ├── page.js                ← Redirect a /dashboard
│   ├── dashboard/page.js      ← Dashboard principal
│   └── pacientes/
│       ├── page.js            ← Lista
│       └── [id]/page.js       ← Detalle con stepper
│
├── src/
│   ├── theme/                 ← Sistema de tema MUI
│   ├── components/
│   │   ├── layout/            ← Sidebar, TopBar, MainLayout
│   │   └── PatientTracking.js ← Stepper de protocolo
│   └── data/mockData.js       ← Datos de prueba
│
├── jsconfig.json              ← Alias @/... configurado
└── docs/UI_ARCHITECTURE.md    ← Documentación completa
```

## Características Destacadas

### Diseño Clínico Profesional

- Paleta Navy (#003366) + Cyan (#00AEEF)
- Colores de estado clínico (Error, Warning, Success)
- Tipografía Roboto optimizada para datos médicos

### Protocolo ICP 12 Meses

- 7 hitos de seguimiento estructurados
- Validación de campos críticos (LDL, PA)
- Ventanas especiales:
  - Mes 3: Pesquisa metabólica
  - Mes 5: Evaluación estructural con eco

### Responsive & Accesible

- Grid de MUI para layouts adaptativos
- Iconos Material para claridad visual
- Chips con estados codificados por color

## Solución de Problemas

### Error: Cannot find module '@/...'

Solución: Verifica que `jsconfig.json` existe y reinicia el servidor dev.

### Error: Module not found

Solución: Ejecuta `npm install` para instalar dependencias faltantes.

### Página en blanco

Solución: Verifica que `app/layout.js` importa correctamente ThemeRegistry y MainLayout.

## Soporte

Consulta la documentación completa en:

- `docs/UI_ARCHITECTURE.md` - Arquitectura UI detallada
- `docs/TECHNICAL.md` - Documentación técnica
- `docs/API.md` - Endpoints disponibles

---

**¡La arquitectura UI está lista para desarrollo!**
