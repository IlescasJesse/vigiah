"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  Paper,
  Alert,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

const steps = [
  {
    label: "Basal (Ingreso Hospitalario)",
    description: "Registro inicial del paciente al ingresar a Urgencias",
  },
  {
    label: "Estudios y Resultados",
    description: "Resultados de laboratorio y estudios complementarios",
  },
];

// Función para calcular la próxima cita (30 días después, día entre semana)
const getNextAppointmentDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 30);
  
  // Ajustar si cae en fin de semana
  const dayOfWeek = futureDate.getDay(); // 0 = Domingo, 6 = Sábado
  
  if (dayOfWeek === 0) {
    // Si es domingo, mover al lunes
    futureDate.setDate(futureDate.getDate() + 1);
  } else if (dayOfWeek === 6) {
    // Si es sábado, mover al lunes
    futureDate.setDate(futureDate.getDate() + 2);
  }
  
  return futureDate;
};

export default function NuevoPatienteDialog({ open, onClose, onSave }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    // Datos Personales
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: "",
    email: "",
    phone: "",
    primaryDiagnosis: "",
    
    // Datos Clínicos Basales
    isDiabetic: false,
    weight: "",
    systolicBP: "",
    diastolicBP: "",
    
    // Estudios y Resultados
    baselineLDL: "",
    ldl: "",
    hba1c: "",
    baselineLVEF: "",
    lvef: "",
    
    // Información Adicional
    medications: "",
    generalNotes: "",
    nextAppointment: dayjs(getNextAppointmentDate()), // Usar dayjs
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (field) => (newValue) => {
    setFormData({ ...formData, [field]: newValue });
  };

  const handleSubmit = async () => {
    try {
      // Preparar datos para enviar - TODO EN MAYÚSCULAS
      const patientData = {
        firstName: formData.firstName.toUpperCase(),
        lastName: formData.lastName.toUpperCase(),
        dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.format('YYYY-MM-DD') : null,
        gender: formData.gender, // Ya viene en mayúsculas del enum
        email: formData.email ? formData.email.toLowerCase() : null, // Email en minúsculas por convención
        phone: formData.phone.toUpperCase(),
        isDiabetic: formData.isDiabetic,
        baselineLDL: formData.baselineLDL ? parseFloat(formData.baselineLDL) : null,
        baselineLVEF: formData.baselineLVEF ? parseFloat(formData.baselineLVEF) : null,
        primaryDiagnosis: formData.primaryDiagnosis.toUpperCase(),
        generalNotes: formData.generalNotes ? formData.generalNotes.toUpperCase() : "",
        nextAppointment: formData.nextAppointment ? formData.nextAppointment.format('YYYY-MM-DD') : null,
        visits: [
          {
            visitDate: new Date(),
            visitNumber: 1,
            weight: formData.weight ? parseFloat(formData.weight) : null,
            systolicBP: formData.systolicBP ? parseFloat(formData.systolicBP) : null,
            diastolicBP: formData.diastolicBP ? parseFloat(formData.diastolicBP) : null,
            ldl: formData.ldl ? parseFloat(formData.ldl) : null,
            hba1c: formData.hba1c ? parseFloat(formData.hba1c) : null,
            lvef: formData.lvef ? parseFloat(formData.lvef) : null,
            notes: `INGRESO HOSPITALARIO - ${formData.generalNotes ? formData.generalNotes.toUpperCase() : ""}`,
            medications: formData.medications
              ? formData.medications.split(",").map((med) => ({
                  name: med.trim().toUpperCase(),
                  dosage: "",
                }))
              : [],
          },
        ],
      };

      if (onSave) {
        await onSave(patientData);
      }

      // Resetear formulario
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        gender: "",
        email: "",
        phone: "",
        primaryDiagnosis: "",
        isDiabetic: false,
        weight: "",
        systolicBP: "",
        diastolicBP: "",
        baselineLDL: "",
        ldl: "",
        hba1c: "",
        baselineLVEF: "",
        lvef: "",
        medications: "",
        generalNotes: "",
        nextAppointment: dayjs(getNextAppointmentDate()), // Resetear con nueva fecha
      });
      setActiveStep(0);
      onClose();
    } catch (error) {
      console.error("Error al guardar paciente:", error);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    onClose();
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            {/* Datos Personales */}
            <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: "grey.50" }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <PersonAddIcon color="primary" />
                Datos Personales
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Nombres"
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Apellidos"
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Fecha de Nacimiento *"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange("dateOfBirth")}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                      },
                    }}
                    maxDate={dayjs()}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Género</InputLabel>
                    <Select
                      value={formData.gender}
                      label="Género"
                      onChange={handleChange("gender")}
                    >
                      <MenuItem value="MASCULINO">Masculino</MenuItem>
                      <MenuItem value="FEMENINO">Femenino</MenuItem>
                      <MenuItem value="OTRO">Otro</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Correo Electrónico (Opcional)"
                    value={formData.email}
                    onChange={handleChange("email")}
                    helperText="Formato: usuario@ejemplo.com"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Teléfono"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    inputProps={{ 
                      pattern: "[0-9]*",
                      maxLength: 15
                    }}
                    helperText="Solo números"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Datos Clínicos Iniciales */}
            <Paper elevation={0} sx={{ p: 3, bgcolor: "grey.50" }}>
              <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                Signos Vitales y Datos Clínicos Iniciales
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Peso (kg)"
                    value={formData.weight}
                    onChange={handleChange("weight")}
                    inputProps={{ 
                      step: "0.1",
                      min: "0",
                      max: "300"
                    }}
                    helperText="Peso en kilogramos"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Presión Sistólica (mmHg)"
                    value={formData.systolicBP}
                    onChange={handleChange("systolicBP")}
                    inputProps={{ 
                      min: "50",
                      max: "300"
                    }}
                    helperText="Rango: 50-300"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="Presión Diastólica (mmHg)"
                    value={formData.diastolicBP}
                    onChange={handleChange("diastolicBP")}
                    inputProps={{ 
                      min: "30",
                      max: "200"
                    }}
                    helperText="Rango: 30-200"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Diagnóstico Principal"
                    value={formData.primaryDiagnosis}
                    onChange={handleChange("primaryDiagnosis")}
                    placeholder="Ej: Síndrome Coronario Agudo, Infarto Agudo al Miocardio"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isDiabetic}
                        onChange={handleChange("isDiabetic")}
                      />
                    }
                    label="Paciente Diabético"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Registre los resultados de estudios de laboratorio y
              gabinete realizados al momento del ingreso
            </Alert>

            {/* Estudios de Laboratorio */}
            <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: "grey.50" }}>
              <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                Estudios de Laboratorio
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="LDL Basal (mg/dL)"
                    value={formData.baselineLDL}
                    onChange={handleChange("baselineLDL")}
                    inputProps={{ 
                      step: "0.1",
                      min: "0",
                      max: "500"
                    }}
                    helperText="Valor de referencia inicial"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="LDL Actual (mg/dL)"
                    value={formData.ldl}
                    onChange={handleChange("ldl")}
                    inputProps={{ 
                      step: "0.1",
                      min: "0",
                      max: "500"
                    }}
                    helperText="Colesterol LDL actual"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    type="number"
                    label="HbA1c (%)"
                    value={formData.hba1c}
                    onChange={handleChange("hba1c")}
                    inputProps={{ 
                      step: "0.1", 
                      min: "0", 
                      max: "20" 
                    }}
                    helperText="Hemoglobina glicosilada (Rango: 0-20%)"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Estudios de Gabinete */}
            <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: "grey.50" }}>
              <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                Estudios de Gabinete
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="LVEF Basal (%) - Opcional"
                    value={formData.baselineLVEF}
                    onChange={handleChange("baselineLVEF")}
                    inputProps={{ 
                      step: "1", 
                      min: "0", 
                      max: "100" 
                    }}
                    helperText="Fracción de eyección ventricular izquierda basal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="LVEF Actual (%) - Opcional"
                    value={formData.lvef}
                    onChange={handleChange("lvef")}
                    inputProps={{ 
                      step: "1", 
                      min: "0", 
                      max: "100" 
                    }}
                    helperText="Fracción de eyección ventricular izquierda actual"
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Medicamentos y Notas */}
            <Paper elevation={0} sx={{ p: 3, bgcolor: "grey.50" }}>
              <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                Información Adicional
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Medicamentos"
                    value={formData.medications}
                    onChange={handleChange("medications")}
                    placeholder="Separar por comas. Ej: Aspirina, Clopidogrel, Atorvastatina"
                    multiline
                    rows={2}
                    helperText="Medicamentos separados por comas"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notas Generales"
                    value={formData.generalNotes}
                    onChange={handleChange("generalNotes")}
                    multiline
                    rows={3}
                    placeholder="Observaciones, alergias, antecedentes relevantes..."
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Próxima Cita (30 días) *"
                    value={formData.nextAppointment}
                    onChange={handleDateChange("nextAppointment")}
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        helperText: "Fecha automática: 30 días (día hábil)",
                      },
                    }}
                    minDate={dayjs()}
                    shouldDisableDate={(date) => {
                      // Deshabilitar fines de semana
                      const day = date.day();
                      return day === 0 || day === 6; // 0 = Domingo, 6 = Sábado
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );

      default:
        return "Paso desconocido";
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: "80vh",
          },
        }}
      >
      <DialogTitle>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Nuevo Paciente
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Clínica de Cardiometabolismo para seguimiento post-ICP
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 2 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {step.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {step.description}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2, mb: 2 }}>{renderStepContent(activeStep)}</Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Box>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            startIcon={<ArrowBackIcon />}
          >
            Anterior
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={<SaveIcon />}
            >
              Guardar Paciente
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForwardIcon />}
            >
              Siguiente
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
    </LocalizationProvider>
  );
}
