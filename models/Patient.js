import mongoose from "mongoose";

// Sub-esquema para el Progreso del Protocolo
const protocolStepSchema = new mongoose.Schema(
  {
    stepId: {
      type: Number,
      required: true, // 0=Basal, 1=Mes1, 2=Mes3, etc.
    },
    stepLabel: {
      type: String,
      required: true, // "Basal", "Mes 1", "Mes 3", etc.
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    completedBy: {
      type: String, // Email o nombre del usuario que completó
      required: false,
    },
    formData: {
      type: mongoose.Schema.Types.Mixed, // Objeto flexible con todos los datos del formulario
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

// Sub-esquema para Visitas
const visitSchema = new mongoose.Schema(
  {
    visitDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    visitNumber: {
      type: Number,
      required: true,
    },
    // Datos clínicos
    weight: {
      type: Number, // en kg
      required: false,
    },
    systolicBP: {
      type: Number, // presión sistólica
      required: false,
    },
    diastolicBP: {
      type: Number, // presión diastólica
      required: false,
    },
    ldl: {
      type: Number, // LDL colesterol en mg/dL
      required: false,
    },
    hba1c: {
      type: Number, // Hemoglobina glicosilada en %
      required: false,
    },
    lvef: {
      type: Number, // Fracción de eyección del ventrículo izquierdo en %
      required: false,
    },
    glucose: {
      type: Number, // Glucosa en mg/dL
      required: false,
    },
    wallMotion: {
      type: String, // Motilidad parietal
      required: false,
    },
    outcomes: {
      type: String, // Resultados/Notas
      required: false,
    },
    // Información adicional
    notes: {
      type: String,
      required: false,
    },
    medications: [
      {
        name: String,
        dosage: String,
      },
    ],
    // Control de calidad
    lipidControl: {
      type: Boolean,
      default: false,
    },
    glycemicControl: {
      type: Boolean,
      default: false,
    },
    alerts: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Esquema principal de Paciente
const patientSchema = new mongoose.Schema(
  {
    // Datos personales
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MASCULINO", "FEMENINO", "OTRO"],
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },

    // Datos clínicos basales
    isDiabetic: {
      type: Boolean,
      default: false,
    },
    baselineLDL: {
      type: Number,
      required: false,
    },
    baselineLVEF: {
      type: Number,
      required: false,
    },
    interventionDate: {
      type: Date,
      required: false,
    },

    // Progreso del Protocolo (array de pasos completados)
    protocolSteps: [protocolStepSchema],

    // Estado de desbloqueo del protocolo (solo admin)
    protocolUnlocked: {
      type: Boolean,
      default: false,
    },
    unlockedBy: {
      type: String,
      required: false,
    },
    unlockedAt: {
      type: Date,
      required: false,
    },

    // Historial de visitas (array de sub-documentos)
    visits: [visitSchema],

    // Próxima cita
    nextAppointment: {
      type: Date,
      required: false,
    },

    // Estado del paciente
    status: {
      type: String,
      enum: ["ACTIVO", "INACTIVO", "ALTA"],
      default: "ACTIVO",
    },

    // Diagnóstico principal
    primaryDiagnosis: {
      type: String,
      required: false,
    },

    // Notas generales
    generalNotes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

// Métodos virtuales
patientSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

patientSchema.virtual("age").get(function () {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
});

// Método para obtener la última visita
patientSchema.methods.getLastVisit = function () {
  if (this.visits && this.visits.length > 0) {
    return this.visits[this.visits.length - 1];
  }
  return null;
};

// Método para obtener valores actuales
patientSchema.methods.getCurrentValues = function () {
  const lastVisit = this.getLastVisit();
  if (!lastVisit) return null;

  return {
    currentLDL: lastVisit.ldl,
    currentHbA1c: lastVisit.hba1c,
    currentLVEF: lastVisit.lvef,
    visitNumber: lastVisit.visitNumber,
  };
};

// Método para obtener el progreso del protocolo
patientSchema.methods.getProtocolProgress = function () {
  if (!this.protocolSteps || this.protocolSteps.length === 0) {
    return { completed: 0, total: 7, steps: [] };
  }

  const completedSteps = this.protocolSteps.filter((step) => step.completed);

  return {
    completed: completedSteps.length,
    total: 7, // 7 pasos en el protocolo
    steps: this.protocolSteps.sort((a, b) => a.stepId - b.stepId),
    lastCompletedStep:
      completedSteps.length > 0
        ? completedSteps[completedSteps.length - 1]
        : null,
  };
};

// Método para verificar si un paso está completado
patientSchema.methods.isStepCompleted = function (stepId) {
  if (!this.protocolSteps || this.protocolSteps.length === 0) {
    return false;
  }

  const step = this.protocolSteps.find((s) => s.stepId === stepId);
  return step ? step.completed : false;
};

// Método para obtener datos de un paso específico
patientSchema.methods.getStepData = function (stepId) {
  if (!this.protocolSteps || this.protocolSteps.length === 0) {
    return null;
  }

  return this.protocolSteps.find((s) => s.stepId === stepId) || null;
};

// Índices para mejorar búsquedas
patientSchema.index({ firstName: 1, lastName: 1 });
patientSchema.index({ status: 1 });
patientSchema.index({ nextAppointment: 1 });
patientSchema.index({ "visits.visitDate": -1 });

// Configurar toJSON para incluir virtuals
patientSchema.set("toJSON", { virtuals: true });
patientSchema.set("toObject", { virtuals: true });

// Evitar re-compilación del modelo en desarrollo
const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
