import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    FormControl,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    FormLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import { addArrayItem, removeArrayItem } from '../OcupacionalForm';



const ConductaTab = ({ data, onChange, onArrayChange }) => (

    <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom color="primary">
            Evaluación de Conducta
        </Typography>

        <TextField
            fullWidth
            label="Observaciones generales"
            multiline
            rows={3}
            variant="outlined"
            value={data.observaciones}
            onChange={(e) => onChange('conducta', 'observaciones', e.target.value)}
            sx={{ mb: 3 }}
        />

        {/* Comportamiento general */}
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Comportamiento general</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.comportamiento_general.map((comportamiento, index) => (
                    <Box key={comportamiento.contexto} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <Typography variant="subtitle1">{comportamiento.contexto}</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Descripción del lugar"
                                    value={comportamiento.descripcion_lugar}
                                    onChange={(e) => {
                                        const comportamiento_general = [...data.comportamiento_general];
                                        comportamiento_general[index].descripcion_lugar = e.target.value;
                                        onChange('conducta', 'comportamiento_general', comportamiento_general);
                                    }}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Descripción del comportamiento"
                                    value={comportamiento.descripcion_comportamiento}
                                    onChange={(e) => {
                                        const comportamiento_general = [...data.comportamiento_general];
                                        comportamiento_general[index].descripcion_comportamiento = e.target.value;
                                        onChange('conducta', 'comportamiento_general', comportamiento_general);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>

        {/* Otros comportamientos */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Otros comportamientos</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.otros_comportamientos.map((comportamiento, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    label="Contexto"
                                    value={comportamiento.contexto}
                                    onChange={(e) => {
                                        const otros_comportamientos = [...data.otros_comportamientos];
                                        otros_comportamientos[index].contexto = e.target.value;
                                        onChange('conducta', 'otros_comportamientos', otros_comportamientos);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    label="Descripción"
                                    value={comportamiento.descripcion}
                                    onChange={(e) => {
                                        const otros_comportamientos = [...data.otros_comportamientos];
                                        otros_comportamientos[index].descripcion = e.target.value;
                                        onChange('conducta', 'otros_comportamientos', otros_comportamientos);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} display="flex" alignItems="center" justifyContent="center">
                                <IconButton onClick={() => {
                                    const otros_comportamientos = [...data.otros_comportamientos];
                                    otros_comportamientos.splice(index, 1);
                                    onChange('conducta', 'otros_comportamientos', otros_comportamientos);
                                }} color="error">
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => {
                        const otros_comportamientos = [...data.otros_comportamientos];
                        otros_comportamientos.push({descripcion: '' });
                        onChange('conducta', 'otros_comportamientos', otros_comportamientos);
                    }}
                    sx={{ mt: 1 }}
                >
                    Añadir comportamiento
                </Button>
            </AccordionDetails>
        </Accordion>

        {/* Conductas de oposición */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Conductas de oposición</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.conductas_oposicion.map((conducta, index) => (
                    <Box key={conducta.tipo_conducta} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <Typography variant="subtitle1">{conducta.tipo_conducta}</Typography>
                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                            <FormLabel component="legend">Frecuencia</FormLabel>
                            <RadioGroup
                                value={conducta.frecuencia}
                                onChange={(e) => {
                                    const conductas_oposicion = [...data.conductas_oposicion];
                                    conductas_oposicion[index].frecuencia = e.target.value;
                                    onChange('conducta', 'conductas_oposicion', conductas_oposicion);
                                }}
                                row
                            >
                                <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                <FormControlLabel value="A veces" control={<Radio />} label="A veces" />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Justificación"
                            value={conducta.justificacion}
                            onChange={(e) => {
                                const conductas_oposicion = [...data.conductas_oposicion];
                                conductas_oposicion[index].justificacion = e.target.value;
                                onChange('conducta', 'conductas_oposicion', conductas_oposicion);
                            }}
                        />
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>

        {/* Patrones de llanto */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Patrones de llanto</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.patrones_llanto.map((patron, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            label="Descripción del patrón"
                            value={patron.descripcion}
                            onChange={(e) => {
                                const patrones_llanto = [...data.patrones_llanto];
                                patrones_llanto[index].descripcion = e.target.value;
                                onChange('conducta', 'patrones_llanto', patrones_llanto);
                            }}
                        />
                        <IconButton onClick={()=>{
                            const patrones_llanto = [...data.patrones_llanto];
                            patrones_llanto.splice(index, 1);
                            onChange('conducta', 'patrones_llanto', patrones_llanto);
                        }} color="error">
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                ))}
                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick = {()=>{
                        const patrones_llanto = [...data.patrones_llanto];
                        patrones_llanto.push({descripcion:''});
                        onChange('conducta', 'patrones_llanto', patrones_llanto);
                    }}
                    sx={{ mt: 1 }}
                >
                    Añadir patrón
                </Button>
            </AccordionDetails>
        </Accordion>

        {/* Conductas específicas */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Conductas específicas</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.conductas_especificas.map((conducta, index) => (
                    <Box key={conducta.tipo_conducta} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <Typography variant="subtitle1">{conducta.tipo_conducta}</Typography>
                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                            <RadioGroup
                                value={conducta.respuesta}
                                onChange={(e) => {
                                    const conductas_especificas = [...data.conductas_especificas];
                                    conductas_especificas[index].respuesta = e.target.value;
                                    onChange('conducta', 'conductas_especificas', conductas_especificas);
                                }}
                                row
                            >
                                <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
                        {conducta.respuesta === "Sí" && (
                            <TextField
                                fullWidth
                                label="Descripción adicional"
                                value={conducta.descripcion_adicional}
                                onChange={(e) => {
                                    const conductas_especificas = [...data.conductas_especificas];
                                    conductas_especificas[index].descripcion_adicional = e.target.value;
                                    onChange('conducta', 'conductas_especificas', conductas_especificas);
                                }}
                            />
                        )}
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>

        {/* Noción de peligro */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Noción de peligro</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.nocion_peligro.map((peligro, index) => (
                    <Box key={peligro.tipo_peligro} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={peligro.tiene_nocion}
                                    onChange={(e) => {
                                        const nocion_peligro = [...data.nocion_peligro];
                                        nocion_peligro[index].tiene_nocion = e.target.checked;
                                        onChange('conducta', 'nocion_peligro', nocion_peligro);
                                    }}
                                />
                            }
                            label={`Tiene noción de peligro: ${peligro.tipo_peligro}`}
                        />
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>

        {/* Resto de componentes para la pestaña de Conducta... */}
    </Box>
);

export default ConductaTab;