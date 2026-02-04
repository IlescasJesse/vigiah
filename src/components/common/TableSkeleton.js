"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Box,
} from "@mui/material";

/**
 * TableSkeleton - Skeleton loader para tablas
 *
 * @param {number} rows - Número de filas a mostrar
 * @param {number} columns - Número de columnas
 * @param {boolean} withHeader - Mostrar encabezado
 */
export default function TableSkeleton({
  rows = 5,
  columns = 4,
  withHeader = true,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        {withHeader && (
          <TableHead>
            <TableRow>
              {Array.from({ length: columns }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton variant='text' width='80%' height={24} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant='text' width='90%' height={20} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * CardSkeleton - Skeleton loader para cards
 */
export function CardSkeleton({ height = 200 }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Skeleton variant='text' width='60%' height={32} sx={{ mb: 2 }} />
      <Skeleton variant='rectangular' width='100%' height={height} />
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Skeleton variant='rectangular' width={100} height={36} />
        <Skeleton variant='rectangular' width={100} height={36} />
      </Box>
    </Paper>
  );
}

/**
 * FormSkeleton - Skeleton loader para formularios
 */
export function FormSkeleton({ fields = 4 }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {Array.from({ length: fields }).map((_, index) => (
        <Box key={index}>
          <Skeleton variant='text' width='30%' height={20} sx={{ mb: 1 }} />
          <Skeleton variant='rectangular' width='100%' height={56} />
        </Box>
      ))}
    </Box>
  );
}
