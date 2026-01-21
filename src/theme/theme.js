"use client";

import { createTheme } from "@mui/material/styles";

/**
 * VIGIAH Medical Theme
 * Color palette optimized for clinical environments
 * Based on healthcare industry standards for trust and readability
 */
const theme = createTheme({
  palette: {
    mode: "light",

    // Primary - Deep Navy Blue (Trust, Authority, Medical Professionalism)
    primary: {
      main: "#003366",
      light: "#004d99",
      dark: "#002244",
      contrastText: "#FFFFFF",
    },

    // Secondary - Cyan (Technology, Hygiene, Innovation)
    secondary: {
      main: "#00AEEF",
      light: "#33BFFF",
      dark: "#0088CC",
      contrastText: "#FFFFFF",
    },

    // Background - Optimized for reduced eye strain
    background: {
      default: "#F4F6F8",
      paper: "#FFFFFF",
    },

    // Status Colors - Clinical Alerts and States
    error: {
      main: "#D32F2F", // Critical: LDL > 70, LVEF Drop
      light: "#EF5350",
      dark: "#C62828",
      contrastText: "#FFFFFF",
    },

    warning: {
      main: "#ED6C02", // Attention: Pending Labs/Echo
      light: "#FF9800",
      dark: "#E65100",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#2E7D32", // Goals Met, Treatment Adherence
      light: "#4CAF50",
      dark: "#1B5E20",
      contrastText: "#FFFFFF",
    },

    info: {
      main: "#0288D1",
      light: "#03A9F4",
      dark: "#01579B",
      contrastText: "#FFFFFF",
    },

    // Text colors
    text: {
      primary: "#212121",
      secondary: "#666666",
      disabled: "#9E9E9E",
    },

    // Divider
    divider: "#E0E0E0",

    // Custom status colors for medical states
    custom: {
      critical: "#D32F2F",
      urgent: "#ED6C02",
      stable: "#2E7D32",
      pending: "#0288D1",
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    // Headers
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.6,
    },

    // Body text optimized for medical data reading
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      letterSpacing: "0.01071em",
    },

    // Medical data display
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
      letterSpacing: "0.03333em",
    },

    // Button text
    button: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "none", // Medical interfaces prefer sentence case
    },
  },

  shape: {
    borderRadius: 8, // Soft corners for modern medical UI
  },

  spacing: 8, // Base spacing unit

  shadows: [
    "none",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.08)",
    "0px 8px 16px rgba(0, 0, 0, 0.10)",
    "0px 12px 24px rgba(0, 0, 0, 0.12)",
    "0px 16px 32px rgba(0, 0, 0, 0.14)",
    "0px 20px 40px rgba(0, 0, 0, 0.16)",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.08)",
    "0px 8px 16px rgba(0, 0, 0, 0.10)",
    "0px 12px 24px rgba(0, 0, 0, 0.12)",
    "0px 16px 32px rgba(0, 0, 0, 0.14)",
    "0px 20px 40px rgba(0, 0, 0, 0.16)",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.08)",
    "0px 8px 16px rgba(0, 0, 0, 0.10)",
    "0px 12px 24px rgba(0, 0, 0, 0.12)",
    "0px 16px 32px rgba(0, 0, 0, 0.14)",
    "0px 20px 40px rgba(0, 0, 0, 0.16)",
    "0px 2px 4px rgba(0, 0, 0, 0.05)",
    "0px 4px 8px rgba(0, 0, 0, 0.08)",
    "0px 8px 16px rgba(0, 0, 0, 0.10)",
    "0px 12px 24px rgba(0, 0, 0, 0.12)",
    "0px 16px 32px rgba(0, 0, 0, 0.14)",
    "0px 20px 40px rgba(0, 0, 0, 0.16)",
  ],

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
          borderRadius: 12,
          border: "1px solid #E0E0E0",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
          padding: "10px 24px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #E0E0E0",
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.08)",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #E0E0E0",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "#F4F6F8",
        },
      },
    },

    MuiStepper: {
      styleOverrides: {
        root: {
          padding: "24px 0",
        },
      },
    },

    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: 500,
          "&.Mui-active": {
            fontWeight: 600,
          },
          "&.Mui-completed": {
            fontWeight: 500,
          },
        },
      },
    },
  },
});

export default theme;
