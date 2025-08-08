import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  TextField,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import {
  Edit as EditIcon,
  AccessTime as AccessTimeIcon,
  Note as NoteIcon,
  Medication as MedicationIcon,
  AttachFile as AttachFileIcon,
  LocalHospital as LocalHospitalIcon,
  FitnessCenter as FitnessCenterIcon,
  ColorLens as ColorLensIcon,
  Abc as AbcIcon
} from '@mui/icons-material';

// Importaciones de componentes con rutas correctas
import TerapiaOcupacionalTabs from './Ocupacionaltabs/TerapiaOcupacionalTabs';
import TerapiaOcupacionalForm from './Ocupacionaltabs/TerapiaOcupacionalForm';

const TerapiaDetailsDialog = ({ open, onClose, terapia, editMode, onEdit, onSave, onInputChange, tiposTerapia, API_IMAGE_URL }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [datosOcupacionalState, setDatosOcupacionalState] = useState({});
  
  // Mover la lógica condicional aquí para evitar early returns antes de hooks
  useEffect(() => {
    if (terapia) {
      const datosOcupacional = terapia.datos_ocupacional ?? {
        alimentacion: terapia.alimentacion || '',
        descanso: terapia.descanso || '',
        aseo: terapia.aseo || '',
        vestimenta: terapia.vestimenta || '',
        juego: terapia.juego || '',
        conducta: terapia.conducta || '',
      };
      setDatosOcupacionalState(datosOcupacional);
    }
  }, [terapia]);

  if (!terapia) return null;

  const tipoTerapia = tiposTerapia.find(t => t.id === terapia.id_tipo_terapia);
  const esTerapiaOcupacional = tipoTerapia?.name === 'Terapia Ocupacional' || terapia.id_tipo_terapia === 3;

  const handleInputChange = (name, value) => {
    // Manejamos los cambios en los campos generales
    onInputChange(name, value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getTerapiaIcon = (tipoId) => {
    switch (tipoId) {
      case 1: return <AbcIcon fontSize="large" />;
      case 2: return <FitnessCenterIcon fontSize="large" />;
      case 3: return <ColorLensIcon fontSize="large" />;
      default: return <LocalHospitalIcon fontSize="large" />;
    }
  };

  const handleSave = () => {
    // Crear una copia profunda de la terapia para asegurarnos de que no se pierdan datos
    const terapiaActualizada = {
      ...terapia
    };
    
    // Si es terapia ocupacional, asegurarnos de que los datos estén correctamente integrados
    if (esTerapiaOcupacional) {
      // Asegurarnos de que todos los campos individuales estén también actualizados
      // por compatibilidad con código existente que pueda usar estos campos directamente
      terapiaActualizada.alimentacion = datosOcupacionalState.alimentacion || '';
      terapiaActualizada.descanso = datosOcupacionalState.descanso || '';
      terapiaActualizada.aseo = datosOcupacionalState.aseo || '';
      terapiaActualizada.vestimenta = datosOcupacionalState.vestimenta || '';
      terapiaActualizada.juego = datosOcupacionalState.juego || '';
      terapiaActualizada.conducta = datosOcupacionalState.conducta || '';
      
      // Guardar también en el objeto estructurado
      terapiaActualizada.datos_ocupacional = { ...datosOcupacionalState };
      
      // Registro de depuración para verificar que los datos se están enviando correctamente
      console.log('Guardando datos ocupacionales:', terapiaActualizada.datos_ocupacional);
    }
    
    // Llamar a la función de guardado del componente padre
    onSave(terapiaActualizada);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {getTerapiaIcon(terapia.id_tipo_terapia)}
          </Box>
          <Box>
            <Typography variant="h6">
              {tipoTerapia?.name || 'Detalle de Terapia'}
            </Typography>
            <Typography variant="caption">
              {dayjs(terapia.fecha_hora || new Date()).format('DD/MM/YYYY HH:mm')}
            </Typography>
          </Box>
        </Box>
        {!editMode && (
          <Button startIcon={<EditIcon />} onClick={() => onEdit(terapia)} variant="contained" color="secondary">
            Editar
          </Button>
        )}
      </DialogTitle>

      {/* Renderizado condicional para Terapia Ocupacional */}
      {esTerapiaOcupacional && !editMode ? (
        <TerapiaOcupacionalTabs
          datosOcupacional={datosOcupacionalState}
          terapia={terapia}
          API_IMAGE_URL={API_IMAGE_URL}
        />
      ) : (
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Contenido existente... */}
            
            {/* Fecha y Tipo de Terapia */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ mr: 1 }} /> Fecha y Hora
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {dayjs(terapia.fecha_hora || new Date()).format('DD/MM/YYYY HH:mm')}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <LocalHospitalIcon sx={{ mr: 1 }} /> Tipo de Terapia
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {tipoTerapia?.name || 'Desconocido'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Notas de Evolución */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                <NoteIcon sx={{ mr: 1 }} /> Notas de Evolución
              </Typography>
              {editMode ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={terapia.notas_evolucion || ''}
                  onChange={(e) => handleInputChange('notas_evolucion', e.target.value)}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
                  {terapia.notas_evolucion || 'Sin notas'}
                </Typography>
              )}
            </Paper>

            {/* Farmacoterapia e Indicaciones */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                <MedicationIcon sx={{ mr: 1 }} /> Farmacoterapia e Indicaciones
              </Typography>
              {editMode ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={terapia.farmacoterapia_indicaciones || ''}
                  onChange={(e) => handleInputChange('farmacoterapia_indicaciones', e.target.value)}
                />
              ) : (
                <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-line' }}>
                  {terapia.farmacoterapia_indicaciones || 'No especificado'}
                </Typography>
              )}
            </Paper>

            {/* Archivos Adjuntos */}
            {terapia.url_adjunto && (
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                  <AttachFileIcon sx={{ mr: 1 }} /> Adjunto
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AttachFileIcon />}
                  href={`${API_IMAGE_URL}${terapia.url_adjunto}`}
                  target="_blank"
                  sx={{ mt: 2 }}
                >
                  Ver Adjunto
                </Button>
              </Paper>
            )}

            {/* Componente de formulario para Terapia Ocupacional en modo edición */}
            {esTerapiaOcupacional && editMode && (
              <TerapiaOcupacionalForm
                datosOcupacional={datosOcupacionalState}
                setDatosOcupacional={setDatosOcupacionalState}
              />
            )}
          </Box>
        </DialogContent>
      )}

      <Divider />
      <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
        {editMode ? (
          <>
            <Button onClick={onClose} variant="outlined">Cancelar</Button>
            <Button onClick={handleSave} variant="contained" color="primary">Guardar</Button>
          </>
        ) : (
          <Button onClick={onClose} variant="contained">Cerrar</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TerapiaDetailsDialog;