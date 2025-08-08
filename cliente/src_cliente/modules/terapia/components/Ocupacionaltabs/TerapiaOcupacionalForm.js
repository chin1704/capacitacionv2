import React, { memo, useState, useEffect } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Typography,
    Button,
    Box
} from '@mui/material';
import {
    Restaurant as RestaurantIcon,
    Hotel as HotelIcon,
    Shower as ShowerIcon,
    Checkroom as CheckroomIcon,
    SportsEsports as SportsEsportsIcon,
    Psychology as PsychologyIcon
} from '@mui/icons-material';

// Importar el componente de edición optimizado
import OcupacionalFieldEditor from './OcupacionalFieldEditor';

// Usar memo para evitar re-renderizados innecesarios
const TerapiaOcupacionalForm = memo(({ datosOcupacional, setDatosOcupacional }) => {
    // Mantener activo solo el paso actual para mejorar rendimiento
    const [activeStep, setActiveStep] = useState(0);

    // Definir las secciones para la edición
    const secciones = [
        { label: 'Alimentación', key: 'alimentacion', icon: <RestaurantIcon color="primary" /> },
        { label: 'Descanso', key: 'descanso', icon: <HotelIcon color="primary" /> },
        { label: 'Aseo', key: 'aseo', icon: <ShowerIcon color="primary" /> },
        { label: 'Vestimenta', key: 'vestimenta', icon: <CheckroomIcon color="primary" /> },
        { label: 'Juego', key: 'juego', icon: <SportsEsportsIcon color="primary" /> },
        { label: 'Conducta', key: 'conducta', icon: <PsychologyIcon color="primary" /> }
    ];

    // Asegurarse de que todos los campos existan con valores iniciales
    useEffect(() => {
        const defaultValues = {
            alimentacion: '',
            descanso: '',
            aseo: '',
            vestimenta: '',
            juego: '',
            conducta: ''
        };
        
        // Actualizar solo si faltan campos
        const updatedData = { ...defaultValues, ...datosOcupacional };
        
        // Verificar si hay diferencias para evitar ciclos infinitos
        if (JSON.stringify(updatedData) !== JSON.stringify(datosOcupacional)) {
            setDatosOcupacional(updatedData);
        }
    }, []);

    const handleNext = () => {
        setActiveStep((prevStep) => Math.min(prevStep + 1, secciones.length - 1));
    };

    const handleBack = () => {
        setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleInputChange = (sectionKey, updatedValue) => {
        console.log(`Actualizando campo ${sectionKey} con valor:`, updatedValue);
        setDatosOcupacional(prev => {
            const updatedData = { ...prev, [sectionKey]: updatedValue };
            console.log("Datos actualizados:", updatedData);
            return updatedData;
        });
    };

    return (
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 3 }}>
            {secciones.map(({ label, key, icon }, index) => (
                <Step key={key}>
                    <StepLabel StepIconComponent={() => icon}>
                        <Typography variant="h6">{label}</Typography>
                    </StepLabel>
                    <StepContent>
                        {/* Renderizar el editor para este paso */}
                        <OcupacionalFieldEditor
                            data={datosOcupacional[key] || ''}
                            path={key}
                            onInputChange={handleInputChange}
                        />
                        <Box sx={{ mb: 2, mt: 2 }}>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                    disabled={index === secciones.length - 1}
                                >
                                    {index === secciones.length - 1 ? 'Finalizar' : 'Continuar'}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Atrás
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    );
});

export default TerapiaOcupacionalForm;