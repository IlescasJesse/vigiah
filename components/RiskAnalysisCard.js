"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { getRiskLevelColor } from "@/lib/utils";

/**
 * Componente que muestra el resultado del análisis de riesgo
 * @param {Object} riskAnalysis - Resultado de calculateRisk()
 */
export default function RiskAnalysisCard({ riskAnalysis }) {
  if (!riskAnalysis) {
    return (
      <Card>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            No hay datos de análisis de riesgo disponibles
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const { lipidControl, glycemicControl, alerts, riskLevel, recommendations } =
    riskAnalysis;

  return (
    <Card>
      <CardContent>
        {/* Header con nivel de riesgo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant='h6' component='div'>
            Análisis de Riesgo
          </Typography>
          <Chip
            label={`Riesgo ${riskLevel}`}
            color={getRiskLevelColor(riskLevel)}
            icon={riskLevel === "ALTO" ? <WarningIcon /> : undefined}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Controles */}
        <Box sx={{ mb: 2 }}>
          <Typography variant='subtitle2' gutterBottom>
            Estado de Controles:
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              icon={lipidControl ? <CheckIcon /> : <CancelIcon />}
              label='Control de LDL'
              color={lipidControl ? "success" : "error"}
              variant='outlined'
              size='small'
            />
            <Chip
              icon={glycemicControl ? <CheckIcon /> : <CancelIcon />}
              label='Control Glicémico'
              color={glycemicControl ? "success" : "error"}
              variant='outlined'
              size='small'
            />
          </Box>
        </Box>

        {/* Alertas */}
        {alerts && alerts.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {alerts.map((alert, index) => (
              <Alert severity='error' key={index} sx={{ mb: 1 }}>
                {alert}
              </Alert>
            ))}
          </Box>
        )}

        {/* Recomendaciones */}
        {recommendations && recommendations.length > 0 && (
          <Box>
            <Typography variant='subtitle2' gutterBottom>
              Recomendaciones Clínicas:
            </Typography>
            <List dense>
              {recommendations.map((rec, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText
                    primary={rec}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Mensaje positivo si todo está bien */}
        {riskLevel === "BAJO" && alerts.length === 0 && (
          <Alert severity='success' sx={{ mt: 2 }}>
            El paciente presenta buen control de sus parámetros clínicos.
            Continuar con el plan terapéutico actual.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
