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
import NuevoPatienteDialog from "../../components/NuevoPatienteDialog";
import TableSkeleton from "@/src/components/common/TableSkeleton";
import useNotification from "@/src/hooks/useNotification";

export default function PatientsListPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [patients, setPatients] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { showSuccess, showError, NotificationComponent } = useNotification();

  // Función para calcular edad desde fecha de nacimiento
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Cargar pacientes desde la API
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/patients");
      if (!response.ok) {
        throw new Error("Error al cargar pacientes");
      }
      const result = await response.json();
      setPatients(result.data || []);
    } catch (error) {
      console.error("Error:", error);
      showError("Error al cargar la lista de pacientes");
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar pacientes al montar el componente
  React.useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    const patientFirstName = patient.firstName?.toLowerCase() || "";
    const patientLastName = patient.lastName?.toLowerCase() || "";
    const fullName = `${patientFirstName} ${patientLastName}`.toLowerCase();
    const patientId = patient._id?.toString().toLowerCase() || "";

    return (
      fullName.includes(searchLower) ||
      patientFirstName.includes(searchLower) ||
      patientLastName.includes(searchLower) ||
      patientId.includes(searchLower)
    );
  });

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
    switch (status) {
      case "ACTIVO":
      case "Activo":
        return "success";
      case "INACTIVO":
      case "Inactivo":
        return "default";
      case "ALTA":
      case "Alta":
        return "info";
      default:
        return "default";
    }
  };

  const handleViewPatient = (patientId) => {
    router.push(`/pacientes/${patientId}`);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSavePatient = async (patientData) => {
    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el paciente");
      }

      const result = await response.json();

      showSuccess("Paciente registrado exitosamente");

      // Recargar la lista de pacientes
      fetchPatients();
    } catch (error) {
      console.error("Error creating patient:", error);
      showError("Error al registrar el paciente. Intente nuevamente.");
    }
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
          onClick={handleOpenDialog}
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
      {loading ? (
        <TableSkeleton rows={5} columns={7} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ fontWeight: 600 }}>Paciente</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Edad</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Género</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Diagnóstico</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Próxima Cita</TableCell>
                <TableCell align='center' sx={{ fontWeight: 600 }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => {
                const patientId = patient._id?.toString() || patient.id;
                const fullName =
                  patient.fullName ||
                  `${patient.firstName} ${patient.lastName}`;
                const initials = `${patient.firstName?.[0] || ""}${patient.lastName?.[0] || ""}`;
                const lastVisit = patient.visits?.[patient.visits.length - 1];
                const nextAppointment = patient.nextAppointment
                  ? new Date(patient.nextAppointment).toLocaleDateString(
                      "es-MX",
                    )
                  : "Sin cita";

                return (
                  <TableRow
                    key={patientId}
                    hover
                    sx={{
                      "&:hover": {
                        bgcolor: "action.hover",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleViewPatient(patientId)}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            width: 36,
                            height: 36,
                          }}
                        >
                          {initials}
                        </Avatar>
                        <Box>
                          <Typography variant='body1' sx={{ fontWeight: 600 }}>
                            {fullName}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {patient.email || patient.phone || "Sin contacto"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {patient.age ||
                        calculateAge(patient.dateOfBirth) ||
                        "N/A"}{" "}
                      años
                    </TableCell>
                    <TableCell>{patient.gender || "N/A"}</TableCell>
                    <TableCell>
                      <Typography variant='body2' noWrap sx={{ maxWidth: 200 }}>
                        {patient.primaryDiagnosis || "Sin diagnóstico"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={patient.status || "ACTIVO"}
                        size='small'
                        color={getStatusColor(patient.status || "ACTIVO")}
                        variant='filled'
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>{nextAppointment}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        color='primary'
                        size='small'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewPatient(patientId);
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Empty State */}
      {!loading && filteredPatients.length === 0 && (
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

      {/* Nuevo Paciente Dialog */}
      <NuevoPatienteDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSavePatient}
      />

      {/* Notificaciones */}
      {NotificationComponent}
    </Box>
  );
}
