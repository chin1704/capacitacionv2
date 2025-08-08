// components/terapias/ocupacional/tabs/GeneralEvaluationTab.js
import React from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const GeneralEvaluationTab = ({ data, onChange }) => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom color="primary">
      Evaluación General
    </Typography>

    <TextField
      fullWidth
      label="Actividades de la vida diaria"
      multiline
      rows={3}
      variant="outlined"
      value={data.actividades_vida_diaria}
      onChange={(e) => onChange('actividades_vida_diaria', e.target.value)}
      sx={{ mb: 2 }}
    />

    <TextField
      fullWidth
      label="Evaluación de motricidad fina"
      multiline
      rows={2}
      variant="outlined"
      value={data.motricidad_fina}
      onChange={(e) => onChange('motricidad_fina', e.target.value)}
      sx={{ mb: 2 }}
    />

    <TextField
      fullWidth
      label="Coordinación visomotora"
      multiline
      rows={2}
      variant="outlined"
      value={data.coordinacion_visomotora}
      onChange={(e) => onChange('coordinacion_visomotora', e.target.value)}
      sx={{ mb: 2 }}
    />

    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Nivel de independencia</InputLabel>
      <Select
        value={data.nivel_independencia}
        label="Nivel de independencia"
        onChange={(e) => onChange('nivel_independencia', e.target.value)}
      >
        <MenuItem value="alto">Alto</MenuItem>
        <MenuItem value="moderado">Moderado</MenuItem>
        <MenuItem value="bajo">Bajo</MenuItem>
        <MenuItem value="dependiente">Dependiente</MenuItem>
      </Select>
    </FormControl>

    <TextField
      fullWidth
      label="Objetivo terapéutico"
      multiline
      rows={2}
      variant="outlined"
      value={data.objetivo_terapeutico}
      onChange={(e) => onChange('objetivo_terapeutico', e.target.value)}
    />
  </Box>
);

export default GeneralEvaluationTab;
