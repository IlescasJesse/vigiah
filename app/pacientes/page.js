"use client";

import * as React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Avatar,
} from "@mui/material";
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  PersonAdd as PersonAddIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { recentPatients } from "../../src/data/mockData";

export default function PatientsListPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredPatients = recentPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Muy Alto":
        return "error";
      case "Alto":
        return "warning";
      case "Moderado":
        return "info";
      default:
        return "success";
    }
  };

  const getStatusColor = (status) => {
    return status === "Activo" ? "success" : "default";
  };

  const handleViewPatient = (patientId) => {
    router.push(`/pacientes/${patientId}`);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant='h4' sx={{ fontWeight: 700 }}>
          Pacientes
        </Typography>
        <Button
          variant='contained'
          startIcon={<PersonAddIcon />}
          onClick={() => router.push("/pacientes/nuevo")}
        >
          Nuevo Paciente
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder='Buscar por nombre o ID...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Patients Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600 }}>Paciente</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Edad</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Intervención</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Mes Protocolo</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Riesgo</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Próxima Cita</TableCell>
              <TableCell align='center' sx={{ fontWeight: 600 }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow
                key={patient.id}
                hover
                sx={{
                  "&:hover": {
                    bgcolor: "action.hover",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleViewPatient(patient.id)}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 36, height: 36 }}
                    >
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </Avatar>
                    <Box>
                      <Typography variant='body1' sx={{ fontWeight: 600 }}>
                        {patient.name}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {patient.lastVisit}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' sx={{ fontFamily: "monospace" }}>
                    {patient.id}
                  </Typography>
                </TableCell>
                <TableCell>{patient.age} años</TableCell>
                <TableCell>{patient.intervention}</TableCell>
                <TableCell>
                  <Chip
                    label={patient.currentMonth}
                    size='small'
                    color='primary'
                    variant='outlined'
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={patient.risk}
                    size='small'
                    color={getRiskColor(patient.risk)}
                    icon={
                      patient.risk === "Muy Alto" ? (
                        <WarningIcon />
                      ) : (
                        <CheckCircleIcon />
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={patient.status}
                    size='small'
                    color={getStatusColor(patient.status)}
                    variant='filled'
                  />
                </TableCell>
                <TableCell>
                  <Typography variant='body2'>
                    {patient.nextAppointment}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <IconButton
                    color='primary'
                    size='small'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewPatient(patient.id);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <Box
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "grey.50",
            borderRadius: 1,
            mt: 2,
          }}
        >
          <Typography variant='body1' color='text.secondary'>
            No se encontraron pacientes con el término de búsqueda "{searchTerm}
            "
          </Typography>
        </Box>
      )}
    </Box>
  );
}
