"use client";

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import { Person as PersonIcon, Event as EventIcon } from "@mui/icons-material";
import {
  format,
  isToday,
  isTomorrow,
  isPast,
  differenceInDays,
} from "date-fns";
import { es } from "date-fns/locale";

// Datos simulados de pacientes con próximas citas
const mockAppointments = [
  {
    id: 1,
    patientName: "Juan Pérez García",
    nextAppointment: new Date(2026, 0, 21), // Hoy
    visitNumber: 3,
    status: "ACTIVO",
  },
  {
    id: 2,
    patientName: "María López Hernández",
    nextAppointment: new Date(2026, 0, 22), // Mañana
    visitNumber: 5,
    status: "ACTIVO",
  },
  {
    id: 3,
    patientName: "Carlos Martínez Ruiz",
    nextAppointment: new Date(2026, 0, 23),
    visitNumber: 2,
    status: "ACTIVO",
  },
  {
    id: 4,
    patientName: "Ana Sánchez Torres",
    nextAppointment: new Date(2026, 0, 24),
    visitNumber: 4,
    status: "ACTIVO",
  },
  {
    id: 5,
    patientName: "Roberto Díaz Flores",
    nextAppointment: new Date(2026, 0, 19), // Pasada
    visitNumber: 3,
    status: "ACTIVO",
  },
];

export default function AgendaComponent() {
  // Función para determinar el color del chip según la proximidad de la cita
  const getAppointmentChipColor = (date) => {
    if (isPast(date) && !isToday(date)) {
      return "error";
    } else if (isToday(date)) {
      return "warning";
    } else if (isTomorrow(date)) {
      return "info";
    } else {
      return "success";
    }
  };

  // Función para obtener el texto del chip
  const getAppointmentLabel = (date) => {
    if (isPast(date) && !isToday(date)) {
      const daysAgo = Math.abs(differenceInDays(date, new Date()));
      return `Vencida (${daysAgo}d)`;
    } else if (isToday(date)) {
      return "Hoy";
    } else if (isTomorrow(date)) {
      return "Mañana";
    } else {
      const daysUntil = differenceInDays(date, new Date());
      return `En ${daysUntil} días`;
    }
  };

  // Ordenar citas: vencidas primero, luego más cercanas
  const sortedAppointments = [...mockAppointments].sort((a, b) => {
    const aIsPast = isPast(a.nextAppointment) && !isToday(a.nextAppointment);
    const bIsPast = isPast(b.nextAppointment) && !isToday(b.nextAppointment);

    if (aIsPast && !bIsPast) return -1;
    if (!aIsPast && bIsPast) return 1;

    return a.nextAppointment - b.nextAppointment;
  });

  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <EventIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant='h6'>Próximas Citas</Typography>
      </Box>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
        Pacientes programados
      </Typography>

      <List sx={{ maxHeight: 400, overflow: "auto" }}>
        {sortedAppointments.map((appointment, index) => (
          <Box key={appointment.id}>
            <ListItem alignItems='flex-start' sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant='body1' sx={{ fontWeight: 500 }}>
                    {appointment.patientName}
                  </Typography>
                }
                secondary={
                  <Box sx={{ mt: 0.5 }}>
                    <Typography variant='body2' color='text.secondary'>
                      {format(
                        appointment.nextAppointment,
                        "d 'de' MMMM, yyyy",
                        { locale: es }
                      )}
                    </Typography>
                    <Box
                      sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}
                    >
                      <Chip
                        label={getAppointmentLabel(appointment.nextAppointment)}
                        size='small'
                        color={getAppointmentChipColor(
                          appointment.nextAppointment
                        )}
                      />
                      <Chip
                        label={`Visita ${appointment.visitNumber}`}
                        size='small'
                        variant='outlined'
                      />
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            {index < sortedAppointments.length - 1 && (
              <Divider variant='inset' component='li' />
            )}
          </Box>
        ))}
      </List>

      {sortedAppointments.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant='body2' color='text.secondary'>
            No hay citas programadas
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
