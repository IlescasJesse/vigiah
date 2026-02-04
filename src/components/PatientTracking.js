"use client";

import * as React from "react";
import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
  InputAdornment,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

/**
 * Protocol Steps Configuration
 * Defines the 12-month ICP follow-up protocol
 */
const protocolSteps = [
  {
    id: 0,
    label: "Basal (Egreso)",
    month: 0,
    description: "Evaluación inicial al egreso hospitalario",
    criticalFields: ["weight", "systolicBP", "diastolicBP", "ldl"],
    fields: [
      { name: "weight", label: "Peso", unit: "kg", type: "number" },
      {
        name: "systolicBP",
        label: "PA Sistólica",
        unit: "mmHg",
        type: "number",
      },
      {
        name: "diastolicBP",
        label: "PA Diastólica",
        unit: "mmHg",
        type: "number",
      },
      { name: "ldl", label: "LDL", unit: "mg/dL", type: "number" },
      { name: "baselineLVEF", label: "FEVI Basal", unit: "%", type: "number" },
    ],
  },
  {
    id: 1,
    label: "Mes 1",
    month: 1,
    description: "Control inicial post-intervención",
    criticalFields: ["weight", "systolicBP", "diastolicBP", "ldl"],
    fields: [
      { name: "weight", label: "Peso", unit: "kg", type: "number" },
      {
        name: "systolicBP",
        label: "PA Sistólica",
        unit: "mmHg",
        type: "number",
      },
      {
        name: "diastolicBP",
        label: "PA Diastólica",
        unit: "mmHg",
        type: "number",
      },
      { name: "ldl", label: "LDL", unit: "mg/dL", type: "number" },
      {
        name: "medications",
        label: "Medicamentos",
        type: "text",
        multiline: true,
      },
    ],
  },
  {
    id: 2,
    label: "Mes 3 (Pesquisa)",
    month: 3,
    description: "Evaluación metabólica - Glucosa y HbA1c obligatorios",
    criticalFields: [
      "weight",
      "systolicBP",
      "diastolicBP",
      "ldl",
      "glucose",
      "hba1c",
    ],
    pesquisaMetabolica: true,
    fields: [
      { name: "weight", label: "Peso", unit: "kg", type: "number" },
      {
        name: "systolicBP",
        label: "PA Sistólica",
        unit: "mmHg",
        type: "number",
      },
      {
        name: "diastolicBP",
        label: "PA Diastólica",
        unit: "mmHg",
        type: "number",
      },
      { name: "ldl", label: "LDL", unit: "mg/dL", type: "number" },
      {
        name: "glucose",
        label: "Glucosa",
        unit: "mg/dL",
        type: "number",
        required: true,
        highlight: true,
      },
      {
        name: "hba1c",
        label: "HbA1c",
        unit: "%",
        type: "number",
        required: true,
        highlight: true,
      },
    ],
  },
  {
    id: 3,
    label: "Mes 5 (Estructural)",
    month: 5,
    description: "Evaluación estructural - Ecocardiograma obligatorio",
    criticalFields: [
      "weight",
      "systolicBP",
      "diastolicBP",
      "ldl",
      "lvef",
      "wallMotion",
    ],
    evaluacionEstructural: true,
    fields: [
      { name: "weight", label: "Peso", unit: "kg", type: "number" },
      {
        name: "systolicBP",
        label: "PA Sistólica",
        unit: "mmHg",
        type: "number",
      },
      {
        name: "diastolicBP",
        label: "PA Diastólica",
        unit: "mmHg",
        type: "number",
      },
      { name: "ldl", label: "LDL", unit: "mg/dL", type: "number" },
      {
        name: "lvef",
        label: "FEVI",
        unit: "%",
        type: "number",
        required: true,
        highlight: true,
        echo: true,
      },
      {
        name: "wallMotion",
        label: "Motilidad Parietal",
        type: "select",
        required: true,
        highlight: true,
        echo: true,
        options: [
          "Normal",
          "Hipocinesia Leve",
          "Hipocinesia Moderada",
          "Hipocinesia Severa",
          "Acinesia",
          "Discinesia",
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Mes 7",
    month: 7,
    description: "Control general",
    criticalFields: ["weight", "systolicBP", "diastolicBP", "ldl"],
    fields: [
      { name: "weight", label: "Peso", unit: "kg", type: "number" },
      {
        name: "systolicBP",
        label: "PA Sistólica",
        unit: "mmHg",
        type: "number",
      },
      {
        name: "diastolicBP",
        label: "PA Diastólica",
        unit: "mmHg",
        type: "number",
      },
      { name: "ldl", label: "LDL", unit: "mg/dL", type: "number" },
    ],
  },
  {
    id: 5,
    label: "Mes 10",
    month: 10,
    description: "Control general",
    criticalFields: ["weight", "systolicBP", "diastolicBP", "ldl"],
    fields: [
      { name: "weight", label: "Peso", unit: "kg", type: "number" },
      {
        name: "systolicBP",
        label: "PA Sistólica",
        unit: "mmHg",
        type: "number",
      },
      {
        name: "diastolicBP",
        label: "PA Diastólica",
        unit: "mmHg",
        type: "number",
      },
      { name: "ldl", label: "LDL", unit: "mg/dL", type: "number" },
    ],
  },
  {
    id: 6,
    label: "Mes 12 (Cierre)",
    month: 12,
    description: "Evaluación final del protocolo",
    criticalFields: [
      "weight",
      "systolicBP",
      "diastolicBP",
      "ldl",
      "hba1c",
      "lvef",
    ],
    fields: [
      { name: "weight", label: "Peso", unit: "kg", type: "number" },
      {
        name: "systolicBP",
        label: "PA Sistólica",
        unit: "mmHg",
        type: "number",
      },
      {
        name: "diastolicBP",
        label: "PA Diastólica",
        unit: "mmHg",
        type: "number",
      },
      { name: "ldl", label: "LDL", unit: "mg/dL", type: "number" },
      { name: "hba1c", label: "HbA1c", unit: "%", type: "number" },
      { name: "lvef", label: "FEVI Final", unit: "%", type: "number" },
      {
        name: "outcomes",
        label: "Resultados Finales",
        type: "text",
        multiline: true,
      },
    ],
  },
];

/**
 * Step Icon Component with Status
 * Icons:
 * - CheckCircleIcon (green) for completed steps
 * - PendingIcon (blue) for active step
 * - CancelIcon (grey) for incomplete steps
 */
function StepIcon({ active, completed, icon }) {
  if (completed) {
    return <CheckCircleIcon sx={{ color: "success.main" }} />;
  }
  if (active) {
    return <PendingIcon sx={{ color: "primary.main" }} />;
  }
  return <CancelIcon sx={{ color: "grey.400" }} />;
}

/**
 * Patient Tracking Component
 */
export default function PatientTracking({ patientId }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const [completedSteps, setCompletedSteps] = React.useState({});
  const [patient, setPatient] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Cargar datos del paciente
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/patients/${patientId}`);
        if (!response.ok) {
          throw new Error("Error al cargar paciente");
        }
        const result = await response.json();
        const patientData = result.data;
        setPatient(patientData);

        // Determinar el paso activo basado en las visitas
        const visitCount = patientData.visits?.length || 0;
        setActiveStep(Math.min(visitCount, protocolSteps.length - 1));

        // Cargar datos de la última visita en el formulario
        if (visitCount > 0) {
          const lastVisit = patientData.visits[visitCount - 1];
          setFormData({
            weight: lastVisit.weight || "",
            systolicBP: lastVisit.systolicBP || "",
            diastolicBP: lastVisit.diastolicBP || "",
            ldl: lastVisit.ldl || "",
            hba1c: lastVisit.hba1c || "",
            lvef: lastVisit.lvef || "",
            glucose: lastVisit.glucose || "",
            wallMotion: lastVisit.wallMotion || "",
            medications: lastVisit.medications?.map(m => m.name).join(", ") || "",
            outcomes: lastVisit.outcomes || "",
            baselineLVEF: patientData.baselineLVEF || "",
          });

          // Marcar pasos completados
          const completed = {};
          for (let i = 0; i < visitCount; i++) {
            completed[i] = true;
          }
          setCompletedSteps(completed);
        } else {
          // Primera visita - cargar datos basales del paciente
          setFormData({
            baselineLVEF: patientData.baselineLVEF || "",
            weight: "",
            systolicBP: "",
            diastolicBP: "",
            ldl: patientData.baselineLDL || "",
            hba1c: "",
            lvef: patientData.baselineLVEF || "",
            glucose: "",
            wallMotion: "",
            medications: "",
            outcomes: "",
          });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  const handleNext = async () => {
    // Validate critical fields
    const currentStep = protocolSteps[activeStep];
    const missingFields = currentStep.criticalFields.filter(
      (field) => !formData[field] || formData[field] === ""
    );

    if (missingFields.length > 0) {
      alert(
        `Por favor complete los campos obligatorios: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    try {
      // Guardar la visita en la base de datos
      const visitData = {
        visitNumber: activeStep,
        visitDate: new Date(),
        weight: parseFloat(formData.weight) || null,
        systolicBP: parseFloat(formData.systolicBP) || null,
        diastolicBP: parseFloat(formData.diastolicBP) || null,
        ldl: parseFloat(formData.ldl) || null,
        hba1c: parseFloat(formData.hba1c) || null,
        lvef: parseFloat(formData.lvef) || null,
        glucose: parseFloat(formData.glucose) || null,
        wallMotion: formData.wallMotion || null,
        outcomes: formData.outcomes || null,
        medications: formData.medications
          ? formData.medications.split(",").map((m) => ({ name: m.trim() }))
          : [],
      };

      // Actualizar el paciente con la nueva visita
      const response = await fetch(`/api/patients/${patientId}/visits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar visita");
      }

      // Mark step as completed
      setCompletedSteps({ ...completedSteps, [activeStep]: true });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

      // Limpiar el formulario para la siguiente visita
      setFormData({
        weight: "",
        systolicBP: "",
        diastolicBP: "",
        ldl: "",
        hba1c: "",
        lvef: "",
        glucose: "",
        wallMotion: "",
        medications: "",
        outcomes: "",
      });
    } catch (error) {
      console.error("Error al guardar visita:", error);
      alert("Error al guardar la visita. Por favor intente nuevamente.");
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const isStepComplete = (step) => {
    return completedSteps[step];
  };

  const getStepBorderColor = (step) => {
    if (step.evaluacionEstructural && activeStep === step.id) {
      return "secondary.main"; // Cyan for Month 5
    }
    if (isStepComplete(step.id)) {
      return "success.main";
    }
    if (activeStep === step.id) {
      return "primary.main";
    }
    return "divider";
  };

  // Mostrar loading
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography>Cargando datos del paciente...</Typography>
      </Box>
    );
  }

  if (!patient) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">No se pudo cargar la información del paciente</Alert>
      </Box>
    );
  }

  const fullName = patient.fullName || `${patient.firstName} ${patient.lastName}`;
  const age = patient.age || "N/A";
  const currentMonth = activeStep;
  const status = patient.status || "ACTIVO";

  return (
    <Box>
      {/* Patient Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant='h5' sx={{ fontWeight: 700, mb: 0.5 }}>
              {fullName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              ID: {patient._id?.toString().slice(-8) || "N/A"} • {age} años
              {patient.primaryDiagnosis && ` • ${patient.primaryDiagnosis}`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={`${protocolSteps[currentMonth]?.label || `Mes ${currentMonth}`}`}
              color='primary'
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label={status}
              color={status === "ACTIVO" ? "success" : "default"}
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Vertical Stepper */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' sx={{ fontWeight: 600, mb: 2 }}>
              Protocolo de Seguimiento
            </Typography>
            <Stepper activeStep={activeStep} orientation='vertical'>
              {protocolSteps.map((step, index) => (
                <Step key={step.id} completed={isStepComplete(index)}>
                  <StepLabel
                    StepIconComponent={({ active, completed }) => (
                      <StepIcon
                        active={active}
                        completed={completed}
                        icon={index + 1}
                      />
                    )}
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontWeight: activeStep === index ? 600 : 400,
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        variant='body1'
                        sx={{ fontWeight: activeStep === index ? 600 : 500 }}
                      >
                        {step.label}
                      </Typography>
                      {step.pesquisaMetabolica && (
                        <Chip
                          label='Pesquisa Metabólica'
                          size='small'
                          color='info'
                          sx={{ mt: 0.5, height: 20 }}
                        />
                      )}
                      {step.evaluacionEstructural && (
                        <Chip
                          label='Ecocardiograma'
                          size='small'
                          color='secondary'
                          sx={{ mt: 0.5, height: 20 }}
                        />
                      )}
                    </Box>
                  </StepLabel>
                  <StepContent>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>

        {/* Step Content Form */}
        <Grid item xs={12} lg={8}>
          {protocolSteps.map(
            (step, index) =>
              activeStep === index && (
                <Paper
                  key={step.id}
                  sx={{
                    p: 3,
                    border: 2,
                    borderColor: getStepBorderColor(step),
                  }}
                >
                  {/* Step Header */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant='h5' sx={{ fontWeight: 700, mb: 1 }}>
                      {step.label}
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                      {step.description}
                    </Typography>
                  </Box>

                  {/* Special Alert for Month 3 */}
                  {step.pesquisaMetabolica && (
                    <Alert severity='info' sx={{ mb: 3 }}>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        Pesquisa Metabólica Obligatoria
                      </Typography>
                      <Typography variant='body2'>
                        Los campos de Glucosa y HbA1c son obligatorios para
                        completar esta evaluación.
                      </Typography>
                    </Alert>
                  )}

                  {/* Special Alert for Month 5 */}
                  {step.evaluacionEstructural && (
                    <Card
                      sx={{
                        mb: 3,
                        bgcolor: "secondary.light",
                        borderLeft: 4,
                        borderColor: "secondary.main",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <FavoriteIcon sx={{ color: "secondary.main" }} />
                          <Typography variant='h6' sx={{ fontWeight: 700 }}>
                            Ecocardiograma - Evaluación Estructural
                          </Typography>
                        </Box>
                        <Typography variant='body2'>
                          Ventana crítica para evaluación de función
                          ventricular. FEVI y motilidad parietal son
                          obligatorios.
                        </Typography>
                      </CardContent>
                    </Card>
                  )}

                  {/* Form Fields */}
                  <Grid container spacing={2}>
                    {step.fields.map((field) => (
                      <Grid
                        item
                        xs={12}
                        sm={field.echo ? 12 : 6}
                        key={field.name}
                      >
                        {field.type === "select" ? (
                          <TextField
                            select
                            fullWidth
                            label={field.label}
                            value={formData[field.name] || ""}
                            onChange={(e) =>
                              handleFieldChange(field.name, e.target.value)
                            }
                            required={field.required}
                            SelectProps={{ native: true }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                bgcolor: field.highlight
                                  ? "secondary.light"
                                  : "background.paper",
                              },
                            }}
                          >
                            <option value=''>Seleccionar...</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </TextField>
                        ) : (
                          <TextField
                            fullWidth
                            label={field.label}
                            type={field.type}
                            value={formData[field.name] || ""}
                            onChange={(e) =>
                              handleFieldChange(field.name, e.target.value)
                            }
                            required={field.required}
                            multiline={field.multiline}
                            rows={field.multiline ? 3 : 1}
                            InputProps={
                              field.unit
                                ? {
                                    endAdornment: (
                                      <InputAdornment position='end'>
                                        {field.unit}
                                      </InputAdornment>
                                    ),
                                  }
                                : undefined
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                bgcolor: field.highlight
                                  ? "secondary.light"
                                  : "background.paper",
                              },
                            }}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  {/* Navigation Buttons */}
                  <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      variant='outlined'
                    >
                      Anterior
                    </Button>
                    <Button
                      variant='contained'
                      onClick={handleNext}
                      disabled={
                        activeStep === protocolSteps.length - 1 &&
                        isStepComplete(activeStep)
                      }
                    >
                      {activeStep === protocolSteps.length - 1
                        ? "Finalizar Protocolo"
                        : "Guardar y Continuar"}
                    </Button>
                  </Box>

                  {/* Completion Message */}
                  {activeStep === protocolSteps.length - 1 &&
                    isStepComplete(activeStep) && (
                      <Alert severity='success' sx={{ mt: 3 }}>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                          ¡Protocolo completado exitosamente!
                        </Typography>
                        <Typography variant='body2'>
                          El paciente ha completado el seguimiento de 12 meses
                          post-ICP.
                        </Typography>
                      </Alert>
                    )}
                </Paper>
              )
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
