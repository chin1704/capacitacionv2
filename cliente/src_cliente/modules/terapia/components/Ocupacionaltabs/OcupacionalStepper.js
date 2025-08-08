import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
  Shower as ShowerIcon,
  Checkroom as CheckroomIcon,
  SportsEsports as SportsEsportsIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';

// Importar el componente que renderiza los datos de manera recursiva
import OcupacionalDataDisplay from './OcupacionalDataDisplay';

const OcupacionalStepper = ({ datosOcupacional }) => {
  // Definir las secciones de datos ocupacionales
  const secciones = [
    { label: 'Alimentación', key: 'alimentacion', icon: <RestaurantIcon color="primary" /> },
    { label: 'Descanso', key: 'descanso', icon: <HotelIcon color="primary" /> },
    { label: 'Aseo', key: 'aseo', icon: <ShowerIcon color="primary" /> },
    { label: 'Vestimenta', key: 'vestimenta', icon: <CheckroomIcon color="primary" /> },
    { label: 'Juego', key: 'juego', icon: <SportsEsportsIcon color="primary" /> },
    { label: 'Conducta', key: 'conducta', icon: <PsychologyIcon color="primary" /> }
  ];

  return (
    <Stepper orientation="vertical" sx={{ mb: 3 }}>
      {secciones.map(({ label, key, icon }) => (
        <Step active key={key}>
          <StepLabel StepIconComponent={() => icon}>
            <Typography variant="h6">{label}</Typography>
          </StepLabel>
          <StepContent>
            <OcupacionalDataDisplay data={datosOcupacional[key]} />
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default OcupacionalStepper;