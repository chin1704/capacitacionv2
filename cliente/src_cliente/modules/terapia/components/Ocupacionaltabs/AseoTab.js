// terapia/componentes/Ocupacionaltabs/AseoTab.js
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    FormControl,
    FormControlLabel,
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

const AseoTab = ({ data, onChange, onArrayChange }) => (
    <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom color="primary">
            Evaluación del Aseo
        </Typography>

        <TextField
            fullWidth
            label="Observaciones generales"
            multiline
            rows={3}
            variant="outlined"
            value={data.observaciones_generales}
            onChange={(e) => onChange('aseo', 'observaciones_generales', e.target.value)}
            sx={{ mb: 3 }}
        />

        {/* Agrado por el aseo */}
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Agrado por el aseo</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {data.agrado_aseo.map((actividad, index) => (
                        <Grid item xs={12} sm={6} key={actividad.tipo_actividad}>
                            <Box sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1">{actividad.tipo_actividad}</Typography>
                                <FormControl component="fieldset" fullWidth>
                                    <RadioGroup
                                        value={actividad.nivel_agrado}
                                        onChange={(e) => {
                                            const agrado_aseo = [...data.agrado_aseo];
                                            agrado_aseo[index].nivel_agrado = e.target.value;
                                            onChange('aseo', 'agrado_aseo', agrado_aseo);
                                        }}
                                        row
                                    >
                                        <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>

        {/* Persona encargada del aseo */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Persona encargada del aseo</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {data.persona_aseo.map((aseo, index) => (
                        <Grid item xs={12} sm={6} key={aseo.tipo_aseo}>
                            <Box sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                                <Typography variant="subtitle1">{aseo.tipo_aseo}</Typography>
                                <TextField
                                    fullWidth
                                    label="Persona responsable"
                                    value={aseo.persona_responsable}
                                    onChange={(e) => {
                                        const persona_aseo = [...data.persona_aseo];
                                        persona_aseo[index].persona_responsable = e.target.value;
                                        onChange('aseo', 'persona_aseo', persona_aseo);
                                    }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>

        {/* Otros tipos de aseo */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Otros tipos de aseo</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.otros_aseo.map((otro, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    label="Tipo de aseo"
                                    value={otro.tipo_aseo}
                                    onChange={(e) => {
                                        const otros_aseo = [...data.otros_aseo];
                                        otros_aseo[index].tipo_aseo = e.target.value;
                                        onChange('aseo', 'otros_aseo', otros_aseo);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    label="Persona responsable"
                                    value={otro.persona_responsable}
                                    onChange={(e) => {
                                        const otros_aseo = [...data.otros_aseo];
                                        otros_aseo[index].persona_responsable = e.target.value;
                                        onChange('aseo', 'otros_aseo', otros_aseo);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} display="flex" alignItems="center" justifyContent="center">
                                <IconButton onClick={() => {
                                    const otros_aseo = data.otros_aseo ? [...data.otros_aseo] : [];
                                    otros_aseo.splice(index, 1);
                                    onChange('aseo', 'otros_aseo', otros_aseo);
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
                        const otros_aseo = data.otros_aseo ? [...data.otros_aseo] : [];
                        otros_aseo.push({ persona_responsable: '' });
                        onChange('aseo', 'otros_aseo', otros_aseo);
                    }}
                    sx={{ mt: 1 }}
                >


                    Añadir otro tipo
                </Button>
            </AccordionDetails>
        </Accordion>

        {/* Lugar de baño */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Lugar de baño</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                    <FormLabel component="legend">Tipo de lugar</FormLabel>
                    <RadioGroup
                        value={data.lugar_bano.tipo_lugar}
                        onChange={(e) => {
                            const lugar_bano = { ...data.lugar_bano, tipo_lugar: e.target.value };
                            onChange('aseo', 'lugar_bano', lugar_bano);
                        }}
                        row
                    >
                        <FormControlLabel value="Bañera" control={<Radio />} label="Bañera" />
                        <FormControlLabel value="Ducha" control={<Radio />} label="Ducha" />
                        <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                    </RadioGroup>
                </FormControl>

                {data.lugar_bano.tipo_lugar === "Otro" && (
                    <TextField
                        fullWidth
                        label="Especificar otro"
                        value={data.lugar_bano.descripcion_otro}
                        onChange={(e) => {
                            const lugar_bano = { ...data.lugar_bano, descripcion_otro: e.target.value };
                            onChange('aseo', 'lugar_bano', lugar_bano);
                        }}
                        sx={{ mb: 2 }}
                    />
                )}

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Horario de baño"
                            value={data.lugar_bano.horario_bano}
                            onChange={(e) => {
                                const lugar_bano = { ...data.lugar_bano, horario_bano: e.target.value };
                                onChange('aseo', 'lugar_bano', lugar_bano);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Frecuencia"
                            value={data.lugar_bano.frecuencia}
                            onChange={(e) => {
                                const lugar_bano = { ...data.lugar_bano, frecuencia: e.target.value };
                                onChange('aseo', 'lugar_bano', lugar_bano);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Duración (minutos)"
                            type="number"
                            value={data.lugar_bano.duracion_minutos}
                            onChange={(e) => {
                                const lugar_bano = { ...data.lugar_bano, duracion_minutos: parseInt(e.target.value) };
                                onChange('aseo', 'lugar_bano', lugar_bano);
                            }}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>

        {/* Resto de componentes para la pestaña de Aseo... */}
    </Box>
);


export default AseoTab;
