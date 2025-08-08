import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AbcIcon from '@mui/icons-material/Abc';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate, useParams } from 'react-router-dom';
import { getPaciente } from '../../../services/pacientesServices';
import { createTerapia, getTerapiaByPaciente, getLastTerapia } from '../../../services/terapia';
import { getHistoria, getHistoriaFile } from '../../../services/historiaServices';
import OcupacionalForm from '../components/OcupacionalForm'; // ajusta el path si es necesario
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PsychologyIcon from '@mui/icons-material/Psychology';
import NotesIcon from '@mui/icons-material/Notes';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';



const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  fontSize: '4rem',
  marginBottom: theme.spacing(2),
}));

const AnimatedBox = motion(Box);

const therapyOptions = [
  { id: 'fisica', name: 'Terapia Física', icon: FitnessCenterIcon },
  { id: 'ocupacional', name: 'Terapia Ocupacional', icon: ColorLensIcon },
  { id: 'de lenguaje', name: 'Terapia de Lenguaje', icon: AbcIcon },
];

const PatientCard = ({ paciente, historia, lastTerapia }) => (
  <Paper elevation={3} sx={{ p: 2, backgroundColor: 'background.paper' }}>
    <Typography variant="h6" gutterBottom color="primary">
      Perfil de Paciente
    </Typography>
    <List dense>
      {[
        { icon: PersonIcon, primary: "Nombre", secondary: paciente ? `${paciente.nombre_paciente || 'Nombre'} ${paciente.apellidos_paciente || 'del paciente'}` : 'Nombre del paciente' },
        { icon: CalendarTodayIcon, primary: "Edad", secondary: paciente ? `${paciente.edad_paciente} años` : 'Edad del paciente' },
        { icon: LocalHospitalIcon, primary: "Diagnóstico", secondary: historia ? historia.motivo_consulta_historia : 'Diagnóstico no disponible' },
        { icon: CalendarTodayIcon, primary: "Última visita", secondary: lastTerapia ? new Date(lastTerapia.fecha_hora).toLocaleDateString() : 'No hay visitas registradas' },
      ].map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <item.icon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2" color="textSecondary">{item.primary}</Typography>}
            secondary={<Typography variant="body1">{item.secondary}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

const TherapySelection = ({ onSelect, selectedTherapy }) => (
  <Grid container spacing={3}>
    {therapyOptions.map((therapy) => (
      <Grid item xs={12} sm={6} key={therapy.id}>
        <StyledCard
          onClick={() => onSelect(therapy.id)}
          sx={{
            border: selectedTherapy === therapy.id ? '2px solid #1976d2' : 'none',
            backgroundColor: selectedTherapy === therapy.id ? 'action.selected' : 'background.paper',
          }}
        >
          <CardContent>
            <IconWrapper>
              <therapy.icon fontSize="inherit" color="primary" />
            </IconWrapper>
            <Typography variant="h6" align="center">
              {therapy.name}
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>
    ))}
  </Grid>
);

const TreatmentHistoryItem = ({ terapia, onFileDownload }) => (
  <Box sx={{ mb: 2, p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
    <Typography variant="subtitle1" gutterBottom>
      Fecha: {new Date(terapia.fecha_hora).toLocaleString()}
    </Typography>
    <Typography variant="body2" gutterBottom>
      <strong>Notas:</strong> {terapia.notas_evolucion}
    </Typography>
    <Typography variant="body2" gutterBottom>
      <strong>Prescripciones:</strong> {terapia.farmacoterapia_indicaciones}
    </Typography>
    {terapia.archivo_adjunto && (
      <Button
        startIcon={<AttachFileIcon />}
        onClick={() => onFileDownload(terapia.archivo_adjunto)}
        size="small"
      >
        Ver archivo adjunto
      </Button>
    )}
  </Box>
);

const TreatmentHistory = ({ pacienteId }) => {
  const [terapias, setTerapias] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTerapias = async () => {
      try {
        const data = await getTerapiaByPaciente(pacienteId);
        setTerapias(data);
      } catch (error) {
        console.error('Error fetching terapias:', error);
      }
    };

    if (pacienteId) {
      fetchTerapias();
    }
  }, [pacienteId]);

  const handleFileDownload = async (fileName) => {
    try {
      const fileBlob = await getHistoriaFile(fileName);
      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const displayedTerapias = showAll ? terapias : terapias.slice(0, 10);

  return (
    <Box
      sx={{
        height: '415px',
        overflowY: 'auto',
        mb: 2,
        p: 1,
        backgroundColor: 'action.hover',
        borderRadius: 1
      }}
    >
      {displayedTerapias.length > 0 ? (
        displayedTerapias.map((terapia, index) => (
          <React.Fragment key={terapia.id}>
            <TreatmentHistoryItem terapia={terapia} onFileDownload={handleFileDownload} />
            {index < displayedTerapias.length - 1 && <Divider />}
          </React.Fragment>
        ))
      ) : (
        <Typography variant="body2">No hay historial de tratamientos previos.</Typography>
      )}
      {terapias.length > 10 && (
        <Button
          fullWidth
          onClick={() => setShowAll(!showAll)}
          sx={{ mt: 2 }}
        >
          {showAll ? 'Mostrar menos' : 'Mostrar todas'}
        </Button>
      )}
    </Box>
  );
};

const TreatmentNotes = ({
  notasTratamiento,
  setNotasTratamiento,
  medicacion,
  setMedicacion,
  pacienteId,
  setFile
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              Notas de Tratamiento
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={notasTratamiento}
              onChange={(e) => setNotasTratamiento(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" gutterBottom color="primary">
              Medicación
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={medicacion}
              onChange={(e) => setMedicacion(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box>
              <input
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AttachFileIcon />}
                >
                  Adjuntar Archivo
                </Button>
              </label>
              {fileName && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Archivo seleccionado: {fileName}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              Historia de Tratamiento
            </Typography>
            <TreatmentHistory pacienteId={pacienteId} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const fieldLabels = {
  alimentacion: 'Alimentación',
  descanso: 'Descanso',
  aseo: 'Aseo Personal',
  vestimenta: 'Vestimenta',
  juego: 'Juego',
  conducta: 'Conducta',
  observaciones: 'Observaciones',
};

const fieldIcons = {
  alimentacion: <RestaurantIcon />,
  descanso: <HotelIcon />,
  aseo: <ShowerIcon />,
  vestimenta: <CheckroomIcon />,
  juego: <SportsEsportsIcon />,
  conducta: <PsychologyIcon />,
  observaciones: <NotesIcon />,
};

const TreatmentSummary = ({
  selectedTherapy,
  notasTratamiento,
  medicacion,
  ocupacionalData,
  onSubmit,
  onBack,
}) => {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (key) => {
    setExpandedCards((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Resumen de la Terapia
        </Typography>

        {/* Información básica */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          {[{
            label: 'Fecha de la terapia',
            content: new Date().toLocaleDateString('es-ES'),
          },
          {
            label: 'Tipo de terapia',
            content:
              selectedTherapy === 'fisica'
                ? 'Terapia Física'
                : selectedTherapy === 'ocupacional'
                  ? 'Terapia Ocupacional'
                  : 'Terapia de Lenguaje',
          },
          {
            label: 'Notas de tratamiento',
            content: notasTratamiento || 'Sin notas registradas',
          },
          {
            label: 'Farmacoterapia o Indicaciones',
            content: medicacion || 'Sin indicaciones registradas',
          }].map(({ label, content }) => (
            <Box key={label}>
              <Typography variant="subtitle2" color="text.secondary">{label}:</Typography>
              <Typography variant="body1">{content}</Typography>
            </Box>
          ))}
        </Box>

        {selectedTherapy === 'ocupacional' && ocupacionalData && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Detalles de Terapia Ocupacional
            </Typography>

            <Grid container spacing={3}>
              {Object.entries(fieldLabels).map(([key, label]) => {
                const value = ocupacionalData[key];
                if (!value) return null;

                const isExpanded = expandedCards[key] ?? false;

                return (
                  <Grid item xs={12} key={key}>
                    <Paper
                      elevation={4}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 1,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              bgcolor: 'primary.light',
                              borderRadius: '50%',
                              width: 40,
                              height: 40,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                            }}
                          >
                            {fieldIcons[key]}
                          </Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {label}
                          </Typography>
                        </Box>

                        <IconButton onClick={() => toggleExpand(key)}>
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Box>

                      <Collapse in={isExpanded}>
                        <Box sx={{ pl: 1, pt: 1 }}>{renderValue(value)}</Box>
                      </Collapse>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </CardContent>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBack}>
          Volver
        </Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Confirmar y Guardar
        </Button>
      </Box>
    </Card>
  );
};


const renderValue = (value, level = 0) => {
  const indent = level * 2;

  // Mostrar datos nulos
  if (value == null || value === '') {
    return (
      <Typography variant="body2" color="text.disabled" sx={{ pl: indent }}>
        Sin datos
      </Typography>
    );
  }

  // Mostrar strings, números o booleanos simples
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return (
      <Typography variant="body2" color="text.primary" sx={{ pl: indent }}>
        {value === true ? '✅ Sí' : value === false ? '❌ No' : value}
      </Typography>
    );
  }

  // Mostrar arrays
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <Typography variant="body2" color="text.disabled" sx={{ pl: indent }}>
          Sin registros
        </Typography>
      );
    }

    return (
      <Box sx={{ pl: indent }}>
        {value.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mb: 2,
              p: 2,
              backgroundColor: 'grey.100',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            {typeof item === 'object'
              ? renderValue(item, level + 1)
              : (
                <Typography variant="body2" color="text.primary">
                  {item}
                </Typography>
              )}
          </Box>
        ))}
      </Box>
    );
  }

  // Mostrar objetos como pares clave: valor de forma horizontal
  if (typeof value === 'object') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          pl: indent
        }}
      >
        {Object.entries(value).map(([key, val]) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 2,
              flexWrap: 'wrap',
              borderBottom: '1px dashed #ddd',
              //lineas entrecortadas
              borderColor: 'Black',
              pb: 1,
              mb: 1
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                minWidth: '200px',
                textTransform: 'capitalize',
              }}
            >
              {key.replace(/_/g, ' ')}:
            </Typography>

            <Box sx={{ flex: 1 }}>{renderValue(val, level + 1)}</Box>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Typography variant="body2" color="text.primary" sx={{ pl: indent }}>
      {String(value)}
    </Typography>
  );
};




const SistemaTerapias = () => {
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [file, setFile] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [historia, setHistoria] = useState(null);
  const [lastTerapia, setLastTerapia] = useState(null);
  const [notasTratamiento, setNotasTratamiento] = useState('');
  const [medicacion, setMedicacion] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getPaciente(id)
        .then((data) => setPaciente(data))
        .catch((error) => console.error('Error getting patient:', error));

      getHistoria(id)
        .then((data) => setHistoria(data))
        .catch((error) => console.error('Error getting historia:', error));

      getLastTerapia(id)
        .then((data) => setLastTerapia(data))
        .catch((error) => console.error('Error getting last terapia:', error));
    }
  }, [id]);

  const handleTherapySelection = (therapyId) => {
    setSelectedTherapy(therapyId);
    setStep(1);
  };
  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('notas_evolucion', notasTratamiento);
    formData.append('id_tipo_terapia', selectedTherapy === 'fisica' ? 2 : selectedTherapy === 'ocupacional' ? 3 : 1);
    formData.append('id_personalsalud', 1); // Temporary value as mentioned
    formData.append('id_historia', id);
    formData.append('fecha_hora', new Date().toISOString());
    formData.append('farmacoterapia_indicaciones', medicacion);

    if (file) {
      formData.append('archivo_terapia', file);
    }

    //añadido para Terapia Ocupacional
    if (selectedTherapy === 'ocupacional' && ocupacionalData) {
      formData.append('datos_ocupacional', JSON.stringify(ocupacionalData));
      /*formData.append('alimentacion', JSON.stringify(ocupacionalData.alimentacion));
      formData.append('descanso', JSON.stringify(ocupacionalData.descanso));
      formData.append('aseo', JSON.stringify(ocupacionalData.aseo));
      formData.append('vestimenta', JSON.stringify(ocupacionalData.vestimenta));
      formData.append('juego', JSON.stringify(ocupacionalData.juego));
      formData.append('conducta', JSON.stringify(ocupacionalData.conducta));*/
    }

    try {
      await createTerapia(formData);
      console.log('Terapia guardada exitosamente');
      navigate('/Fcc-terapias');
    } catch (error) {
      console.error('Error al guardar la terapia:', error);
      // Here you might want to show an error message to the user
    }
  };

  //añadido para Terapia Ocupacional
  const [ocupacionalData, setOcupacionalData] = useState(null);

  //añadido para Terapia Ocupacional
  const handleOcupacionalData = (data) => {
    setOcupacionalData(data);
  };


  const handleCancel = () => {
    navigate('/Fcc-terapias');
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  };

  const handleOcupacionalFieldChange = (sectionPath, field, value) => {
    setOcupacionalData(prev => {
      const updated = { ...prev };
      let target = updated;

      if (sectionPath) {
        const keys = sectionPath.split('.');
        for (const key of keys) {
          target = target[key];
        }
      }

      target[field] = value;
      return { ...updated };
    });
  };

  const handleOcupacionalArrayChange = (sectionPath, index, field, value) => {
    setOcupacionalData(prev => {
      const updated = { ...prev };
      const keys = sectionPath.split('.');
      let target = updated;

      for (const key of keys) {
        target = target[key];
      }

      const updatedArray = [...target];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value,
      };

      let writeTarget = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        writeTarget = writeTarget[keys[i]];
      }

      writeTarget[keys[keys.length - 1]] = updatedArray;
      return { ...updated };
    });
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Sistema de Terapias</Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Acceso: {getCurrentDateTime()}
          </Typography>
          <IconButton color="inherit" onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flex: 1, mb: 4 }}>
          {!isMobile && (
            <AnimatedBox
              style={{
                flexShrink: 0,
                width: 300,
                marginRight: theme.spacing(4),
              }}
            >
              <PatientCard paciente={paciente} historia={historia} lastTerapia={lastTerapia} />
            </AnimatedBox>
          )}
          <AnimatedBox
            style={{
              flex: 1,
              display: 'flex',
              overflowY: 'hidden'
            }}
          >
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="therapyOptions"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
                >
                  <TherapySelection onSelect={handleTherapySelection} selectedTherapy={selectedTherapy} />
                </motion.div>
              )}
              {step === 1 && (
                <motion.div
                  key="treatmentNotes"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
                >
                  {selectedTherapy === 'ocupacional' ? (
                    <OcupacionalForm
                      notasTratamiento={notasTratamiento}
                      setNotasTratamiento={setNotasTratamiento}
                      medicacion={medicacion}
                      setMedicacion={setMedicacion}
                      setFile={setFile}
                      handleHistoryData={handleOcupacionalData}
                      onChange={handleOcupacionalFieldChange}
                      onArrayChange={handleOcupacionalArrayChange}
                    />
                  ) : (
                    <TreatmentNotes
                      notasTratamiento={notasTratamiento}
                      setNotasTratamiento={setNotasTratamiento}
                      medicacion={medicacion}
                      setMedicacion={setMedicacion}
                      pacienteId={id}
                      setFile={setFile}
                    />
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <IconButton onClick={handleBack}>
                      <ArrowBackIcon />
                    </IconButton>
                    <IconButton onClick={handleNext} color="primary">
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="treatmentSummary"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
                >
                  <TreatmentSummary
                    selectedTherapy={selectedTherapy}
                    notasTratamiento={notasTratamiento}
                    ocupacionalData={ocupacionalData}
                    medicacion={medicacion}
                    onSubmit={handleSubmit}
                    onBack={handleBack}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </AnimatedBox>
        </Box>
      </Container>
    </Box>
  );
};

export default SistemaTerapias;