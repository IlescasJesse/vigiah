"use client";

import * as React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Biotech as BiotechIcon,
  Favorite as FavoriteIcon,
  Warning as WarningIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useRouter } from "next/navigation";

/**
 * KPI Card Component
 */
function KPICard({
  title,
  value,
  suffix,
  trend,
  trendValue,
  status,
  icon: Icon,
}) {
  const getStatusColor = () => {
    if (status === "success") return "success.main";
    if (status === "warning") return "warning.main";
    if (status === "error") return "error.main";
    return "info.main";
  };

  const getBackgroundColor = () => {
    if (status === "success") return "success.light";
    if (status === "warning") return "warning.light";
    if (status === "error") return "error.light";
    return "info.light";
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 0.5,
                mb: 0.5,
              }}
            >
              <Typography variant='h3' sx={{ fontWeight: 700 }}>
                {value}
              </Typography>
              {suffix && (
                <Typography variant='h5' sx={{ color: "text.secondary" }}>
                  {suffix}
                </Typography>
              )}
            </Box>
            {trend && trendValue && (
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}
              >
                {trend === "up" ? (
                  <TrendingUpIcon
                    sx={{ fontSize: 20, color: getStatusColor() }}
                  />
                ) : (
                  <TrendingDownIcon
                    sx={{ fontSize: 20, color: getStatusColor() }}
                  />
                )}
                <Typography
                  variant='body2'
                  sx={{ color: getStatusColor(), fontWeight: 600 }}
                >
                  {trendValue}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  vs mes anterior
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: getBackgroundColor(),
              opacity: 0.2,
            }}
          >
            <Icon sx={{ fontSize: 32, color: getStatusColor() }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

/**
 * Main Clinical Dashboard Component
 */
export default function ClinicalDashboard() {
  const router = useRouter();
  const [stats, setStats] = React.useState(null);
  const [patients, setPatients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Cargar estadísticas del dashboard
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Obtener estadísticas
      const statsResponse = await fetch("/api/dashboard/stats");
      if (!statsResponse.ok) {
        throw new Error("Error al cargar estadísticas");
      }
      const statsResult = await statsResponse.json();
      setStats(statsResult.data);

      // Obtener pacientes activos
      const patientsResponse = await fetch("/api/patients?status=ACTIVO");
      if (!patientsResponse.ok) {
        throw new Error("Error al cargar pacientes");
      }
      const patientsResult = await patientsResponse.json();
      setPatients(patientsResult.data || []);

    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  // Calcular pacientes que requieren atención
  const getUrgentPatients = () => {
    const today = new Date();
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    return patients
      .filter((patient) => {
        if (!patient.nextAppointment) return false;
        const appointmentDate = new Date(patient.nextAppointment);
        // Citas vencidas hace más de 2 días
        return appointmentDate < twoDaysAgo;
      })
      .slice(0, 5); // Mostrar solo las 5 más urgentes
  };

  const urgentPatientsList = getUrgentPatients();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error al cargar el dashboard: {error}
        </Alert>
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          No hay datos disponibles para mostrar estadísticas.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4' sx={{ fontWeight: 700, mb: 1 }}>
          Panel de Control Clínico
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Clínica de Cardiometabolismo - Seguimiento post-ICP
        </Typography>
      </Box>

      {/* KPI Cards Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title='Pacientes Activos'
            value={stats.activePatients || 0}
            icon={PeopleIcon}
            status='info'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title='Control LDL Global'
            value={stats.ldlControlPercentage ? stats.ldlControlPercentage.toFixed(1) : "0"}
            suffix='%'
            icon={BiotechIcon}
            status={stats.ldlControlPercentage >= 70 ? "success" : stats.ldlControlPercentage >= 50 ? "warning" : "error"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title='Próximas Citas (7 días)'
            value={stats.upcomingAppointments || 0}
            icon={CalendarIcon}
            status={stats.upcomingAppointments > 0 ? "info" : "success"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title='Citas Vencidas'
            value={urgentPatientsList.length}
            icon={WarningIcon}
            status={urgentPatientsList.length > 0 ? "error" : "success"}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Control por Parámetro */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                Control por Parámetro Clínico
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Distribución de pacientes según metas terapéuticas
              </Typography>
            </Box>
            {stats.chartData && stats.chartData.length > 0 ? (
              <ResponsiveContainer width='100%' height={350}>
                <BarChart data={stats.chartData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#E0E0E0' />
                  <XAxis
                    dataKey='name'
                    tick={{ fontSize: 12 }}
                    stroke='#666666'
                  />
                  <YAxis tick={{ fontSize: 12 }} stroke='#666666' />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E0E0E0",
                      borderRadius: 8,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 14, fontWeight: 600 }} />
                  <Bar
                    dataKey='En Meta'
                    fill='#2E7D32'
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey='Fuera de Meta'
                    fill='#D32F2F'
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 350 }}>
                <Typography variant="body2" color="text.secondary">
                  No hay suficientes datos para mostrar gráficas
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        {/* Urgent Action List */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                Acciones Urgentes
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Pacientes con citas vencidas
              </Typography>
            </Box>
            {urgentPatientsList.length > 0 ? (
              <List sx={{ maxHeight: 370, overflow: "auto" }}>
                {urgentPatientsList.map((patient) => {
                  const patientId = patient._id?.toString() || patient.id;
                  const fullName = patient.fullName || `${patient.firstName} ${patient.lastName}`;
                  const appointmentDate = new Date(patient.nextAppointment);
                  const today = new Date();
                  const daysLate = Math.floor((today - appointmentDate) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <ListItem
                      key={patientId}
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        mb: 1,
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                      onClick={() => router.push(`/pacientes/${patientId}`)}
                    >
                      <Avatar sx={{ bgcolor: "error.light", mr: 2 }}>
                        <WarningIcon sx={{ color: "error.main" }} />
                      </Avatar>
                      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant='body1' sx={{ fontWeight: 600 }}>
                            {fullName}
                          </Typography>
                          <Chip
                            label={`${daysLate} días`}
                            size='small'
                            color="error"
                            sx={{ height: 20, fontSize: "0.75rem", fontWeight: 600 }}
                          />
                        </Box>
                        <Typography variant='body2' color='text.secondary'>
                          Cita programada: {appointmentDate.toLocaleDateString("es-MX")}
                        </Typography>
                        <Typography variant='body2' sx={{ fontWeight: 500 }}>
                          {patient.primaryDiagnosis || "Sin diagnóstico"}
                        </Typography>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 370, gap: 2 }}>
                <CheckCircleIcon sx={{ fontSize: 48, color: "success.main" }} />
                <Typography variant='body2' color='text.secondary' textAlign="center">
                  No hay pacientes con citas vencidas
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Resumen Estadístico */}
      {stats.populationStats && (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                  Resumen Estadístico del Programa
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Indicadores clave de control metabólico
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant='h4' sx={{ fontWeight: 700, color: "primary.main" }}>
                      {stats.populationStats.inTarget || 0}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Pacientes en Meta Global
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant='h4' sx={{ fontWeight: 700, color: (Number(stats.populationStats.ldlControlRate) || 0) >= 70 ? "success.main" : "error.main" }}>
                      {Number(stats.populationStats.ldlControlRate || 0).toFixed(1)}%
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Control de LDL
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant='h4' sx={{ fontWeight: 700, color: (Number(stats.populationStats.glycemicControlRate) || 0) >= 70 ? "success.main" : "error.main" }}>
                      {Number(stats.populationStats.glycemicControlRate || 0).toFixed(1)}%
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Control Glicémico (Diabéticos)
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant='h4' sx={{ fontWeight: 700, color: "info.main" }}>
                      {patients.length}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Total Pacientes en Seguimiento
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
