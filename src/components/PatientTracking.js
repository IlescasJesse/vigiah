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
  InputAdornment,
  Autocomplete,
  StepButton,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Favorite as FavoriteIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
} from "@mui/icons-material";
import ConfirmDialog from "@/src/components/common/ConfirmDialog";
import LoadingSpinner from "@/src/components/common/LoadingSpinner";
import useNotification from "@/src/hooks/useNotification";

/**
 * Protocol Steps Configuration
 * Defines the 12-month ICP follow-up protocol
 */
const protocolSteps = [
  {
    id: 0,
    label: "Basal (Ingreso)",
    month: 0,
    description: "Evaluación inicial al ingreso hospitalario",
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
  const [savedSteps, setSavedSteps] = React.useState({}); // Pasos guardados en BD
  const [protocolUnlocked, setProtocolUnlocked] = React.useState(false); // Desbloqueo global del protocolo
  const [patient, setPatient] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [confirmDialog, setConfirmDialog] = React.useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // Hook de notificaciones
  const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    NotificationComponent,
  } = useNotification();

  // Verificar que el componente está montado en el cliente
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cargar datos del usuario desde localStorage
  React.useEffect(() => {
    if (!isMounted) return;
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, [isMounted]);

  // Función para verificar si un paso está bloqueado por fecha
  const isStepLockedByDate = (stepIndex) => {
    // Si no hay fecha de intervención, no está bloqueado
    if (!patient?.interventionDate) return false;

    // Si el protocolo está desbloqueado globalmente por admin, no está bloqueado
    if (protocolUnlocked) return false;

    const interventionDate = new Date(patient.interventionDate);
    const today = new Date();
    const monthsSinceIntervention =
      (today.getFullYear() - interventionDate.getFullYear()) * 12 +
      (today.getMonth() - interventionDate.getMonth());

    const step = protocolSteps[stepIndex];
    // El paso está bloqueado si aún no han pasado los meses requeridos
    return monthsSinceIntervention < step.month;
  };

  // Función para verificar si un paso está disponible (secuencial + temporal)
  const isStepAvailable = (stepIndex) => {
    // Si el protocolo está desbloqueado, todos los pasos están disponibles
    if (protocolUnlocked) return true;

    // Si está bloqueado por fecha, no está disponible
    if (isStepLockedByDate(stepIndex)) return false;

    // El paso 0 (Basal) siempre está disponible si no está bloqueado por fecha
    if (stepIndex === 0) return true;

    // Para otros pasos, el anterior debe estar completado
    return completedSteps[stepIndex - 1] === true;
  }; // Función para verificar si el usuario es administrador
  const isAdmin = () => {
    return userData?.role === "ADMIN";
  };

  // Función para desbloquear todo el protocolo (solo administradores)
  const handleUnlockProtocol = async () => {
    if (!isAdmin()) return;

    try {
      // Persistir el desbloqueo en BD
      const response = await fetch(`/api/patients/${patientId}/protocol`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          protocolUnlocked: true,
          unlockedBy: userData?.email || userData?.name,
          unlockedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setProtocolUnlocked(true);
        showSuccess(
          "Protocolo desbloqueado. Todos los pasos están disponibles.",
        );
      }
    } catch (error) {
      console.error("Error al desbloquear protocolo:", error);
      showError("Error al desbloquear el protocolo");
    }
  };

  // Función para bloquear el protocolo
  const handleLockProtocol = async () => {
    if (!isAdmin()) return;

    try {
      // Persistir el bloqueo en BD
      const response = await fetch(`/api/patients/${patientId}/protocol`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          protocolUnlocked: false,
          lockedBy: userData?.email || userData?.name,
          lockedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setProtocolUnlocked(false);
        showInfo("Protocolo bloqueado. Se requiere completar pasos en orden.");
      }
    } catch (error) {
      console.error("Error al bloquear protocolo:", error);
      showError("Error al bloquear el protocolo");
    }
  };

  // Cargar datos del paciente y progreso del protocolo
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);

        // Cargar datos del paciente
        const response = await fetch(`/api/patients/${patientId}`);
        if (!response.ok) {
          throw new Error("Error al cargar paciente");
        }
        const result = await response.json();
        const patientData = result.data;
        setPatient(patientData);

        // Cargar progreso del protocolo desde BD
        const protocolResponse = await fetch(
          `/api/patients/${patientId}/protocol`,
        );
        if (protocolResponse.ok) {
          const protocolResult = await protocolResponse.json();
          const savedProtocolSteps = protocolResult.data.protocolSteps || [];

          // Cargar estado de desbloqueo del protocolo
          if (protocolResult.data.protocolUnlocked !== undefined) {
            setProtocolUnlocked(protocolResult.data.protocolUnlocked);
          }

          // Construir objeto de pasos completados y guardados
          const completed = {};
          const saved = {};
          let lastCompletedStep = -1;

          savedProtocolSteps.forEach((step) => {
            saved[step.stepId] = true;
            if (step.completed) {
              completed[step.stepId] = true;
              lastCompletedStep = Math.max(lastCompletedStep, step.stepId);
            }
          });

          setCompletedSteps(completed);
          setSavedSteps(saved);

          // Establecer el paso activo: el siguiente al último completado, o Basal (0) si no hay pasos
          const nextStep = lastCompletedStep + 1;
          // protocolSteps aquí es el array de configuración global, no el de la BD
          const totalSteps = 7; // Basal, Mes1, Mes3, Mes5, Mes7, Mes10, Mes12
          setActiveStep(Math.min(nextStep, totalSteps - 1));

          // Si hay un paso en progreso, cargar sus datos
          const currentStepData = savedProtocolSteps.find(
            (s) => s.stepId === nextStep,
          );
          if (currentStepData?.formData) {
            setFormData(currentStepData.formData);
          } else {
            // Cargar datos basales del paciente
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

  // Función para cambiar de paso (clickeable)
  const handleStepClick = async (stepIndex) => {
    const isAvailable = isStepAvailable(stepIndex);
    const isSaved = savedSteps[stepIndex];
    const isCompleted = completedSteps[stepIndex];

    // Permitir clic si: el paso está disponible, guardado, completado, o es el paso activo
    const canAccess =
      isAvailable || isSaved || isCompleted || stepIndex === activeStep;

    if (!canAccess) {
      if (isStepLockedByDate(stepIndex)) {
        showWarning(
          "Este paso está bloqueado por fecha. Contacte a un administrador.",
        );
      } else {
        showInfo("Debe completar el paso anterior primero.");
      }
      return;
    }

    // Advertir si hay cambios sin guardar
    if (hasUnsavedChanges) {
      setConfirmDialog({
        open: true,
        title: "Cambios sin guardar",
        message:
          "Tiene cambios sin guardar en el paso actual. ¿Desea continuar sin guardar?",
        type: "warning",
        onConfirm: () => {
          setActiveStep(stepIndex);
          setHasUnsavedChanges(false);
          loadStepData(stepIndex);
        },
      });
      return;
    }

    setActiveStep(stepIndex);
    await loadStepData(stepIndex);
  };

  // Función para cargar datos de un paso
  const loadStepData = async (stepIndex) => {
    try {
      const protocolResponse = await fetch(
        `/api/patients/${patientId}/protocol`,
      );
      if (protocolResponse.ok) {
        const protocolResult = await protocolResponse.json();
        const stepData = protocolResult.data.protocolSteps.find(
          (s) => s.stepId === stepIndex,
        );

        if (stepData?.formData) {
          setFormData(stepData.formData);
        } else {
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
        }
      }
    } catch (error) {
      console.error("Error al cargar datos del paso:", error);
      showError("Error al cargar datos del paso");
    }
  };

  const handleNext = async () => {
    // Validar que el paso actual esté guardado
    if (!savedSteps[activeStep]) {
      showWarning(
        "Debe guardar el paso actual antes de continuar al siguiente paso.",
      );
      return;
    }

    // Validar que el paso actual esté completado (a menos que el protocolo esté desbloqueado)
    if (!completedSteps[activeStep] && !protocolUnlocked) {
      showWarning("Debe completar y guardar el paso actual antes de avanzar.");
      return;
    }

    // Avanzar al siguiente paso
    const nextStep = activeStep + 1;
    if (nextStep < protocolSteps.length) {
      setActiveStep(nextStep);
      setHasUnsavedChanges(false);

      // Cargar datos guardados del siguiente paso si existen
      try {
        const protocolResponse = await fetch(
          `/api/patients/${patientId}/protocol`,
        );
        if (protocolResponse.ok) {
          const protocolResult = await protocolResponse.json();
          const stepData = protocolResult.data.protocolSteps.find(
            (s) => s.stepId === nextStep,
          );

          if (stepData?.formData) {
            setFormData(stepData.formData);
          } else {
            // Limpiar formulario para nuevo paso
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
          }
        }
      } catch (error) {
        console.error("Error al cargar datos del paso:", error);
      }
    }
  };

  // Nueva función para guardar el progreso (sin completar)
  const handleSave = async () => {
    try {
      setSaving(true);

      const currentStep = protocolSteps[activeStep];

      const protocolData = {
        stepId: activeStep,
        stepLabel: currentStep.label,
        formData: formData,
        completed: false,
        completedBy: userData?.email || userData?.name || null,
        notes: null,
      };

      const response = await fetch(`/api/patients/${patientId}/protocol`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(protocolData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar progreso");
      }

      // Marcar como guardado
      setSavedSteps({ ...savedSteps, [activeStep]: true });
      setHasUnsavedChanges(false);

      showSuccess("Progreso guardado exitosamente");
    } catch (error) {
      console.error("Error al guardar progreso:", error);
      showError("Error al guardar el progreso. Por favor intente nuevamente.");
    } finally {
      setSaving(false);
    }
  }; // Nueva función para completar y guardar el paso
  const handleComplete = async () => {
    // Validate critical fields
    const currentStep = protocolSteps[activeStep];
    const missingFields = currentStep.criticalFields.filter(
      (field) => !formData[field] || formData[field] === "",
    );

    if (missingFields.length > 0) {
      showWarning(
        `Por favor complete los campos obligatorios: ${missingFields.join(", ")}`,
      );
      return;
    }

    // Mostrar diálogo de confirmación
    setConfirmDialog({
      open: true,
      title: "Completar paso del protocolo",
      message: `¿Está seguro de marcar como completado el paso "${currentStep.label}"? Esta acción quedará registrada en el expediente del paciente.`,
      type: "info",
      onConfirm: async () => {
        try {
          setSaving(true);

          const protocolData = {
            stepId: activeStep,
            stepLabel: currentStep.label,
            formData: formData,
            completed: true,
            completedBy: userData?.email || userData?.name || null,
            notes: null,
          };

          const response = await fetch(`/api/patients/${patientId}/protocol`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(protocolData),
          });

          if (!response.ok) {
            throw new Error("Error al completar paso");
          }

          // Marcar como completado y guardado
          setCompletedSteps({ ...completedSteps, [activeStep]: true });
          setSavedSteps({ ...savedSteps, [activeStep]: true });
          setHasUnsavedChanges(false);

          showSuccess(`Paso "${currentStep.label}" completado exitosamente`);
        } catch (error) {
          console.error("Error al completar paso:", error);
          showError(
            "Error al completar el paso. Por favor intente nuevamente.",
          );
        } finally {
          setSaving(false);
        }
      },
    });
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
    setHasUnsavedChanges(true);
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
  if (loading || !isMounted) {
    return (
      <LoadingSpinner message='Cargando datos del paciente...' size='large' />
    );
  }

  if (!patient) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity='error'>
          No se pudo cargar la información del paciente
        </Alert>
      </Box>
    );
  }

  const fullName =
    patient.fullName || `${patient.firstName} ${patient.lastName}`;
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
            flexWrap: "wrap",
            gap: 2,
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
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={protocolSteps[activeStep]?.label || `Mes ${activeStep}`}
              color='primary'
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label={patient.status || "ACTIVO"}
              color={patient.status === "ACTIVO" ? "success" : "default"}
              sx={{ fontWeight: 600 }}
            />

            {/* Botón de desbloqueo global para administradores */}
            {isAdmin() &&
              (protocolUnlocked ? (
                <Chip
                  icon={<LockOpenIcon />}
                  label='Bloqueado'
                  onClick={handleLockProtocol}
                  color='default'
                  variant='outlined'
                  sx={{
                    height: 32,
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                />
              ) : (
                <Chip
                  icon={<LockIcon />}
                  label='Desbloqueado'
                  onClick={handleUnlockProtocol}
                  color='warning'
                  variant='outlined'
                  sx={{
                    height: 32,
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "warning.light",
                      color: "warning.contrastText",
                    },
                  }}
                />
              ))}
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
            <Stepper activeStep={activeStep} orientation='vertical' nonLinear>
              {protocolSteps.map((step, index) => {
                const isLocked = isStepLockedByDate(index);
                const isCompleted = isStepComplete(index);
                const isSaved = savedSteps[index];
                const isAvailable = isStepAvailable(index);
                // Permitir clic en: pasos disponibles, guardados, completados, o el paso activo
                const canClick =
                  isAvailable || isSaved || isCompleted || index === activeStep;

                // Tooltip message
                let tooltipMessage = "";
                if (isLocked && !protocolUnlocked) {
                  const interventionDate = patient?.interventionDate
                    ? new Date(patient.interventionDate).toLocaleDateString(
                        "es-MX",
                      )
                    : "N/A";
                  tooltipMessage = `🔒 Bloqueado - Disponible en Mes ${step.month}\nFecha de intervención: ${interventionDate}`;
                } else if (!canClick) {
                  tooltipMessage = "Debe completar el paso anterior";
                }

                return (
                  <Step key={step.id} completed={isCompleted}>
                    <Tooltip
                      title={tooltipMessage}
                      placement='right'
                      arrow
                      enterDelay={300}
                    >
                      <Box>
                        <StepButton
                          onClick={() => canClick && handleStepClick(index)}
                          disabled={!canClick}
                          sx={{
                            cursor: canClick ? "pointer" : "default",
                            "&:hover": {
                              backgroundColor: canClick
                                ? "action.hover"
                                : "transparent",
                            },
                          }}
                        >
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
                                cursor: canClick ? "pointer" : "default",
                              },
                            }}
                          >
                            <Box>
                              <Typography
                                variant='body1'
                                sx={{
                                  fontWeight: activeStep === index ? 600 : 500,
                                }}
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
                        </StepButton>
                      </Box>
                    </Tooltip>
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
                );
              })}
            </Stepper>
          </Paper>
        </Grid>

        {/* Step Content Form */}
        <Grid item xs={12} lg={8}>
          {activeStep !== null &&
            protocolSteps[activeStep] &&
            (() => {
              const step = protocolSteps[activeStep];
              return (
                <Paper
                  key={`step-${activeStep}-${protocolUnlocked ? "unlocked" : "locked"}`}
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

                  {/* Formulario del paso */}
                  <Box>
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
                            <FavoriteIcon sx={{ color: "white" }} />
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
                            <Autocomplete
                              fullWidth
                              options={field.options || []}
                              value={formData[field.name] || null}
                              onChange={(event, newValue) =>
                                handleFieldChange(field.name, newValue || "")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={field.label}
                                  required={field.required}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      bgcolor: field.highlight
                                        ? "rgba(156, 39, 176, 0.08)"
                                        : "background.paper",
                                      "&:hover": {
                                        bgcolor: field.highlight
                                          ? "rgba(156, 39, 176, 0.12)"
                                          : "background.paper",
                                      },
                                      "&.Mui-focused": {
                                        bgcolor: field.highlight
                                          ? "rgba(156, 39, 176, 0.12)"
                                          : "background.paper",
                                      },
                                    },
                                    "& .MuiInputLabel-root": {
                                      color: field.highlight
                                        ? "secondary.main"
                                        : "text.secondary",
                                      fontWeight: field.highlight ? 600 : 400,
                                      "&.Mui-focused": {
                                        color: "secondary.main",
                                      },
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: field.highlight
                                        ? "secondary.main"
                                        : "divider",
                                      borderWidth: field.highlight ? 2 : 1,
                                    },
                                  }}
                                />
                              )}
                              sx={{
                                "& .MuiAutocomplete-input": {
                                  color: "text.primary",
                                  fontWeight: field.highlight ? 500 : 400,
                                },
                              }}
                            />
                          ) : (
                            <TextField
                              fullWidth
                              label={field.label}
                              type={field.type}
                              value={formData[field.name] || ""}
                              onChange={(e) => {
                                const value =
                                  field.type === "text" || field.multiline
                                    ? e.target.value.toUpperCase()
                                    : e.target.value;
                                handleFieldChange(field.name, value);
                              }}
                              required={field.required}
                              multiline={field.multiline}
                              rows={field.multiline ? 3 : 1}
                              inputProps={{
                                style: {
                                  textTransform:
                                    field.type === "text" || field.multiline
                                      ? "uppercase"
                                      : "none",
                                },
                              }}
                              InputProps={
                                field.unit
                                  ? {
                                      endAdornment: (
                                        <InputAdornment position='end'>
                                          <Typography
                                            variant='body2'
                                            sx={{
                                              color: field.highlight
                                                ? "secondary.main"
                                                : "text.secondary",
                                              fontWeight: field.highlight
                                                ? 600
                                                : 400,
                                            }}
                                          >
                                            {field.unit}
                                          </Typography>
                                        </InputAdornment>
                                      ),
                                    }
                                  : undefined
                              }
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  bgcolor: field.highlight
                                    ? "rgba(156, 39, 176, 0.08)"
                                    : "background.paper",
                                  "&:hover": {
                                    bgcolor: field.highlight
                                      ? "rgba(156, 39, 176, 0.12)"
                                      : "background.paper",
                                  },
                                  "&.Mui-focused": {
                                    bgcolor: field.highlight
                                      ? "rgba(156, 39, 176, 0.12)"
                                      : "background.paper",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: field.highlight
                                    ? "secondary.main"
                                    : "text.secondary",
                                  fontWeight: field.highlight ? 600 : 400,
                                  "&.Mui-focused": {
                                    color: "secondary.main",
                                  },
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: field.highlight
                                    ? "secondary.main"
                                    : "divider",
                                  borderWidth: field.highlight ? 2 : 1,
                                },
                                "& .MuiOutlinedInput-input": {
                                  color: "text.primary",
                                  fontWeight: field.highlight ? 500 : 400,
                                },
                                // Estilizar las flechas de input number
                                "& input[type=number]": {
                                  MozAppearance: "textfield",
                                },
                                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                                  {
                                    WebkitAppearance: "none",
                                    margin: 0,
                                  },
                              }}
                            />
                          )}
                        </Grid>
                      ))}
                    </Grid>

                    {/* Navigation Buttons */}
                    <Box sx={{ mt: 3 }}>
                      {/* Alerta de cambios sin guardar */}
                      {hasUnsavedChanges && (
                        <Alert severity='info' sx={{ mb: 2 }}>
                          <Typography variant='body2' sx={{ fontWeight: 600 }}>
                            Tienes cambios sin guardar
                          </Typography>
                          <Typography variant='body2'>
                            Guarda el progreso antes de cambiar de paso.
                          </Typography>
                        </Alert>
                      )}

                      {/* Indicador de estado del paso */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mb: 2,
                          alignItems: "center",
                        }}
                      >
                        {savedSteps[activeStep] &&
                          !completedSteps[activeStep] && (
                            <Chip
                              icon={<PendingIcon />}
                              label='Guardado - En Progreso'
                              color='info'
                              size='small'
                            />
                          )}
                        {completedSteps[activeStep] && (
                          <Chip
                            icon={<CheckCircleIcon />}
                            label='Paso Completado'
                            color='success'
                            size='small'
                          />
                        )}
                      </Box>

                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          variant='outlined'
                        >
                          ← Anterior
                        </Button>

                        {!completedSteps[activeStep] && (
                          <>
                            <Button
                              variant='outlined'
                              onClick={handleSave}
                              disabled={saving || !hasUnsavedChanges}
                              color='info'
                            >
                              {saving ? "Guardando..." : "💾 Guardar Progreso"}
                            </Button>

                            <Button
                              variant='contained'
                              onClick={handleComplete}
                              disabled={saving}
                              color='success'
                            >
                              {saving ? "Procesando..." : "✓ Completar Paso"}
                            </Button>
                          </>
                        )}

                        <Button
                          variant='contained'
                          onClick={handleNext}
                          disabled={
                            (!completedSteps[activeStep] &&
                              !protocolUnlocked) ||
                            activeStep === protocolSteps.length - 1
                          }
                        >
                          Siguiente →
                        </Button>
                      </Box>
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
                  </Box>
                </Paper>
              );
            })()}
        </Grid>
      </Grid>

      {/* Dialog de Confirmación */}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
      />

      {/* Notificaciones */}
      {NotificationComponent}
    </Box>
  );
}
