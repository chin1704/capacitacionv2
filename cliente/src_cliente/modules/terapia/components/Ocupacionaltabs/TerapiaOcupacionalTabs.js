import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  DialogContent,
  Paper,
  Typography,
  Grid,
  Button
} from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NoteIcon from '@mui/icons-material/Note';
import MedicationIcon from '@mui/icons-material/Medication';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Importar el componente que muestra los datos ocupacionales
import OcupacionalStepper from './OcupacionalStepper';


const TerapiaOcupacionalTabs = ({ datosOcupacional, terapia, API_IMAGE_URL }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2 }}
        >
          <Tab label="Información General" icon={<DescriptionIcon />} iconPosition="start" />
          <Tab label="Evaluación Ocupacional" icon={<AssignmentTurnedInIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        {activeTab === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Información general */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                    <NoteIcon sx={{ mr: 1 }} /> Notas de Evolución
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {terapia.notas_evolucion || 'Sin notas'}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                    <MedicationIcon sx={{ mr: 1 }} /> Farmacoterapia e Indicaciones
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {terapia.farmacoterapia_indicaciones || 'No especificado'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Archivos Adjuntos */}
            {terapia.url_adjunto && (
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                  <AttachFileIcon sx={{ mr: 1 }} /> Archivo Adjunto
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AttachFileIcon />}
                    href={`${API_IMAGE_URL}${terapia.url_adjunto}`}
                    target="_blank"
                  >
                    Ver Adjunto
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {/* Usar el componente separado para mostrar los datos ocupacionales */}
            <OcupacionalStepper datosOcupacional={datosOcupacional} />
          </Box>
        )}
      </DialogContent>
    </>
  );
};

export default TerapiaOcupacionalTabs;