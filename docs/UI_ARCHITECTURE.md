# VIGIAH - UI Architecture Documentation

## Design System

### Color Palette (Clinical HealthTech)

```javascript
Primary: #003366 (Navy Blue) - Trust, professionalism
Secondary: #00AEEF (Cyan) - Hygiene, medical precision
Error: #D32F2F - Critical alerts
Warning: #ED6C02 - Important warnings
Success: #2E7D32 - Positive outcomes
Info: #0288D1 - Informational content
```

### Typography

- **Headings**: Roboto Bold (700)
- **Body**: Roboto Regular (400)
- **Mono**: Roboto Mono (for patient IDs, clinical data)

## Project Structure

```
VIGIAH/
├── app/
│   ├── layout.js              # Root layout with ThemeRegistry + MainLayout
│   ├── page.js                # Home - redirects to /dashboard
│   ├── dashboard/
│   │   └── page.js           # Clinical Dashboard
│   ├── pacientes/
│   │   ├── page.js           # Patient List
│   │   └── [id]/
│   │       └── page.js       # Patient Detail with Protocol Stepper
│   └── api/                  # API routes (existing backend)
│
├── src/
│   ├── theme/
│   │   ├── theme.js          # MUI theme configuration
│   │   └── ThemeRegistry.js  # Theme provider with SSR support
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.js    # Persistent navigation drawer (280px)
│   │   │   ├── TopBar.js     # AppBar with breadcrumbs, notifications, profile
│   │   │   └── MainLayout.js # Layout wrapper
│   │   │
│   │   └── PatientTracking.js # 12-month protocol stepper component
│   │
│   └── data/
│       └── mockData.js       # Clinical mock data for UI testing
│
├── models/                   # Mongoose + Prisma schemas
├── lib/                      # Business logic (risk calculator)
├── utils/                    # Database connections
└── docs/                     # Technical documentation
```

## Components Architecture

### 1. Layout Components

#### **Sidebar.js** (Persistent Navigation)

- Width: 280px fixed
- Navigation items:
  - Dashboard
  - Pacientes (Active route highlighting)
  - Agenda
  - Calculadora de Riesgo
  - Configuración
- Logo area at top
- Active route detection with `usePathname()`

#### **TopBar.js** (Application Bar)

- Dynamic breadcrumbs from pathname
- Notification badge (count: 3)
- User profile menu with avatar
- Responsive design

#### **MainLayout.js** (Wrapper)

- Combines Sidebar + TopBar
- Content area offset by `DRAWER_WIDTH`
- Flex layout for persistent drawer

### 2. Clinical Dashboard (`/dashboard`)

**Key Features:**

- **4 KPI Cards**:

  - Pacientes Activos: 145
  - Control LDL: 68.5%
  - Ecos Mes 5: 76.3%
  - Citas Vencidas: 8

- **Metabolic Control Trend Chart** (AreaChart):

  - 12 months time series
  - Dual gradients: "En Meta" (success) vs "Fuera de Meta" (error)
  - Responsive container

- **Urgent Actions List**:

  - Shows patients with missed appointments (>7 days)
  - Risk level indicators with color coding

- **Control by Parameter** (BarChart):
  - Horizontal bars for LDL, HbA1c, PA, FEVI
  - Percentage-based comparison

### 3. Patient Tracking (`/pacientes/[id]`)

**Core Component: `PatientTracking.js`**

#### Protocol Stepper (12-Month ICP Follow-Up)

**7 Steps Configuration:**

1. **Basal (Egreso)** - Month 0
2. **Mes 1** - Month 1
3. **Mes 3 (Pesquisa Metabólica)** - Month 3
   - **Special**: Glucose + HbA1c mandatory
   - Alert banner: "Pesquisa Metabólica Obligatoria"
4. **Mes 5 (Estructural)** - Month 5
   - **Special**: Ecocardiograma with cyan border highlight
   - LVEF % + Wall Motion mandatory
   - Card with FavoriteIcon indicator
5. **Mes 7** - Month 7
6. **Mes 10** - Month 10
7. **Mes 12 (Cierre)** - Month 12

#### Validation Logic

```javascript
// Critical fields must be completed before advancing
criticalFields: ["weight", "systolicBP", "diastolicBP", "ldl"][
  // Month 3 adds:
  ("glucose", "hba1c")
][
  // Month 5 adds:
  ("lvef", "wallMotion")
];
```

#### Visual Enhancements

- **Step Icons**:

  - Completed: CheckCircleIcon (green)
  - Active: PendingIcon (primary blue)
  - Incomplete: CancelIcon (grey)

- **Border Colors**:

  - Month 5 active: Cyan (secondary.main)
  - Completed: Green (success.main)
  - Active: Navy (primary.main)
  - Inactive: Grey (divider)

- **Field Highlighting**:
  - Month 3: Glucose/HbA1c with `secondary.light` background
  - Month 5: LVEF/Wall Motion with cyan highlight

### 4. Patient List (`/pacientes`)

**Features:**

- Search bar with real-time filtering
- Table with columns:

  - Avatar + Name + Last Visit
  - Patient ID (monospace font)
  - Age, Intervention type
  - Current Protocol Month (chip)
  - Risk Level (colored chip with icon)
  - Status (Active/Inactive)
  - Next Appointment date
  - Actions (View icon)

- Empty state message for no results
- "Nuevo Paciente" button in header
- Row hover effect with navigation to detail page

## Technical Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material-UI v5
- **Charts**: Recharts (AreaChart, BarChart)
- **Navigation**: next/navigation (useRouter, usePathname)
- **Styling**: MUI `sx` prop (no makeStyles)

### State Management

- React Hooks (useState, useEffect)
- Local component state
- Form data managed with controlled inputs

### Data Flow

```
mockData.js → Dashboard/Patient Components → MUI Components → Recharts
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Paths (jsconfig.json)

Already configured:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/theme/*": ["./src/theme/*"],
      "@/data/*": ["./src/data/*"]
    }
  }
}
```

### 3. Run Development Server

```bash
npm run dev
```

Navigate to:

- http://localhost:3000 → Redirects to Dashboard
- http://localhost:3000/dashboard → Clinical Dashboard
- http://localhost:3000/pacientes → Patient List
- http://localhost:3000/pacientes/PAC-001 → Patient Detail with Stepper

## Mock Data Structure

### `mockData.js` Exports

1. **kpiData** - Dashboard KPIs
2. **metabolicControlTrend** - 12-month time series
3. **urgentPatients** - Patients with missed appointments
4. **recentPatients** - Patient list with full details
5. **controlByParameter** - Parameter-wise control distribution
6. **echoCompletionData** - Echo completion by month
7. **patientsByMonth** - Patient enrollment distribution
8. **riskDistribution** - Risk stratification
9. **notifications** - Notification center alerts

## Next Steps (Future Enhancements)

### React Hook Form Integration

- [ ] Add `react-hook-form` dependency
- [ ] Implement form validation schemas
- [ ] Field-level validation for clinical data
- [ ] Custom validation rules for LDL, HbA1c, BP ranges

### Backend Integration

- [ ] Replace mockData with API calls
- [ ] Connect Patient Tracking to MongoDB visits
- [ ] Real-time data updates
- [ ] Form submission to API routes

### Additional Pages

- [ ] Agenda/Calendar view
- [ ] Risk Calculator standalone page
- [ ] Settings/Configuration page
- [ ] User management

### Advanced Features

- [ ] PDF report generation for patient protocol
- [ ] Excel export for clinical data
- [ ] Notification system with WebSockets
- [ ] Multi-language support (i18n)

## Coding Standards

### Component Structure

```javascript
"use client"; // For client components

import * as React from "react";
import { Box, Typography } from "@mui/material";

export default function ComponentName({ prop1, prop2 }) {
  const [state, setState] = React.useState(initialValue);

  return <Box>{/* Component JSX */}</Box>;
}
```

### Styling Conventions

- Use `sx` prop for component-level styles
- No inline styles
- Responsive design with MUI Grid system
- Color references via theme palette

### File Naming

- Components: PascalCase (e.g., `PatientTracking.js`)
- Pages: lowercase (e.g., `page.js`, `layout.js`)
- Data: camelCase (e.g., `mockData.js`)

## Security Notes

- All patient data currently uses mock data
- Implement proper authentication before production
- Add input sanitization for form fields
- Validate all data on both client and server side

## Support

For questions or issues with the UI architecture, refer to:

- **Technical Docs**: `/docs/TECHNICAL.md`
- **API Docs**: `/docs/API.md`
- **MUI Documentation**: https://mui.com/

---

**VIGIAH © 2026** - Sistema de Vigilancia e Indicadores de Gestión en Intervención y Angioplastia-Hemodinámica
