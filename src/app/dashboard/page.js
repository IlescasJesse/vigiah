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
import {
  kpiData,
  metabolicControlTrend,
  urgentPatients,
  controlByParameter,
} from "@/data/mockData";

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
          <Box>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              {title}
            </Typography>
            <Typography variant='h3' sx={{ fontWeight: 700, mb: 0.5 }}>
              {value}
              {suffix && (
                <Typography
                  component='span'
                  variant='h5'
                  sx={{ color: "text.secondary", ml: 0.5 }}
                >
                  {suffix}
                </Typography>
              )}
            </Typography>
            {trend && trendValue && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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
 * Urgent Patient Item Component
 */
function UrgentPatientItem({ patient }) {
  const getRiskColor = () => {
    if (patient.riskLevel === "high") return "error";
    if (patient.riskLevel === "medium") return "warning";
    return "success";
  };

  return (
    <ListItem
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        mb: 1,
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <Avatar sx={{ bgcolor: `${getRiskColor()}.light`, mr: 2 }}>
        <WarningIcon sx={{ color: `${getRiskColor()}.main` }} />
      </Avatar>
      <ListItemText
        primary={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography variant='body1' sx={{ fontWeight: 600 }}>
              {patient.name}
            </Typography>
            <Chip
              label={`${patient.daysLate} días`}
              size='small'
              color={getRiskColor()}
              sx={{ height: 20, fontSize: "0.75rem", fontWeight: 600 }}
            />
          </Box>
        }
        secondary={
          <Box>
            <Typography variant='body2' color='text.secondary'>
              Último control:{" "}
              {new Date(patient.lastAppointment).toLocaleDateString("es-ES")}
            </Typography>
            <Typography variant='body2' sx={{ fontWeight: 500, mt: 0.5 }}>
              Pendiente: {patient.nextStep}
            </Typography>
          </Box>
        }
      />
      <IconButton size='small' sx={{ ml: 1 }}>
        <PhoneIcon fontSize='small' />
      </IconButton>
    </ListItem>
  );
}

/**
 * Main Clinical Dashboard Component
 */
export default function ClinicalDashboard() {
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4' sx={{ fontWeight: 700, mb: 1 }}>
          Panel de Control Clínico
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Sistema de Vigilancia Post-Intervención Coronaria Percutánea
        </Typography>
      </Box>

      {/* KPI Cards Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title='Pacientes Activos'
            value={kpiData.activePatientsCount}
            icon={PeopleIcon}
            status='info'
            trend='up'
            trendValue='+8'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title='Control LDL Global'
            value={kpiData.ldlControlPercentage}
            suffix='%'
            icon={BiotechIcon}
            status={kpiData.ldlControlPercentage >= 70 ? "success" : "error"}
            trend='down'
            trendValue='-2.3%'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title='Ecos Realizados (Mes 5)'
            value={kpiData.echosCompletedMonth5}
            suffix='%'
            icon={FavoriteIcon}
            status={kpiData.echosCompletedMonth5 >= 80 ? "success" : "warning"}
            trend='up'
            trendValue='+4.1%'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title='Citas Vencidas'
            value={kpiData.missedAppointments}
            icon={WarningIcon}
            status='error'
            trend='down'
            trendValue='-2'
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Main Chart - Metabolic Control Trend */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                Tendencia de Control Metabólico
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Evolución mensual de pacientes en meta terapéutica
              </Typography>
            </Box>
            <ResponsiveContainer width='100%' height={350}>
              <AreaChart data={metabolicControlTrend}>
                <defs>
                  <linearGradient id='colorEnMeta' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#2E7D32' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#2E7D32' stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient
                    id='colorFueraMeta'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop offset='5%' stopColor='#D32F2F' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#D32F2F' stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' stroke='#E0E0E0' />
                <XAxis
                  dataKey='month'
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
                <Area
                  type='monotone'
                  dataKey='enMeta'
                  name='En Meta'
                  stroke='#2E7D32'
                  strokeWidth={2}
                  fillOpacity={1}
                  fill='url(#colorEnMeta)'
                />
                <Area
                  type='monotone'
                  dataKey='fueraMeta'
                  name='Fuera de Meta'
                  stroke='#D32F2F'
                  strokeWidth={2}
                  fillOpacity={1}
                  fill='url(#colorFueraMeta)'
                />
              </AreaChart>
            </ResponsiveContainer>
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
                Pacientes con citas vencidas (&gt; 7 días)
              </Typography>
            </Box>
            <List sx={{ maxHeight: 370, overflow: "auto" }}>
              {urgentPatients.map((patient) => (
                <UrgentPatientItem key={patient.id} patient={patient} />
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Control by Parameter Chart */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                Control por Parámetro Clínico
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Distribución de pacientes según metas terapéuticas
              </Typography>
            </Box>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={controlByParameter} layout='vertical'>
                <CartesianGrid strokeDasharray='3 3' stroke='#E0E0E0' />
                <XAxis type='number' tick={{ fontSize: 12 }} stroke='#666666' />
                <YAxis
                  dataKey='parameter'
                  type='category'
                  tick={{ fontSize: 12 }}
                  stroke='#666666'
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E0E0E0",
                    borderRadius: 8,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 14, fontWeight: 600 }} />
                <Bar
                  dataKey='controlled'
                  name='Controlados'
                  fill='#2E7D32'
                  radius={[0, 8, 8, 0]}
                />
                <Bar
                  dataKey='uncontrolled'
                  name='No Controlados'
                  fill='#D32F2F'
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Quick Stats Summary */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                Resumen de Indicadores
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Estado actual del programa de seguimiento
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {controlByParameter.map((param, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>
                      {param.parameter}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: 700,
                        color:
                          param.percentage >= 70
                            ? "success.main"
                            : "error.main",
                      }}
                    >
                      {param.percentage.toFixed(1)}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: 8,
                      bgcolor: "grey.200",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${param.percentage}%`,
                        height: "100%",
                        bgcolor:
                          param.percentage >= 70
                            ? "success.main"
                            : "error.main",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </Box>
                  {index < controlByParameter.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
