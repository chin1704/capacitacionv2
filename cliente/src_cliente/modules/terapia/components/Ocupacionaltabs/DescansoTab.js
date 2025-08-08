// components/terapias/ocupacional/tabs/DescansoTab.js
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';


const DescansoTab = ({ data, onChange }) => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
                Evaluación del Descanso
            </Typography>

            <TextField
                fullWidth
                label="Observaciones generales"
                multiline
                rows={3}
                variant="outlined"
                value={data.observaciones_generales}
                onChange={(e) => onChange('descanso', 'observaciones_generales', e.target.value)}
                sx={{ mb: 3 }}
            />

            {/* Horas de sueño */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Horas de sueño</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {data.horas_sueno.map((periodo, index) => (
                            <Grid item xs={12} sm={4} key={periodo.tipo_periodo}>
                                <Typography variant="subtitle2">{periodo.tipo_periodo}</Typography>
                                <TextField
                                    type="number"
                                    label="Horas"
                                    value={periodo.horas}
                                    onChange={(e) => {
                                        const updated = [...data.horas_sueno];
                                        updated[index].horas = parseFloat(e.target.value);
                                        onChange('descanso', 'horas_sueno', updated);
                                    }}
                                    inputProps={{ step: 0.5, min: 0, max: 24 }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Horario de sueño */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Horario de sueño</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {data.horario_sueno.map((horario, index) => (
                            <Grid item xs={12} sm={6} key={horario.tipo_periodo}>
                                <Box sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                                    <Typography variant="subtitle1">{horario.tipo_periodo}</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Hora inicio"
                                                type="time"
                                                value={horario.hora_inicio}
                                                onChange={(e) => {
                                                    const horario_sueno = [...data.horario_sueno];
                                                    horario_sueno[index].hora_inicio = e.target.value;
                                                    onChange('descanso', 'horario_sueno', horario_sueno);
                                                }}
                                                sx={{ mb: 2 }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                fullWidth
                                                label="Hora fin"
                                                type="time"
                                                value={horario.hora_fin}
                                                onChange={(e) => {
                                                    const horario_sueno = [...data.horario_sueno];
                                                    horario_sueno[index].hora_fin = e.target.value;
                                                    onChange('descanso', 'horario_sueno', horario_sueno);
                                                }}
                                                sx={{ mb: 2 }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <TextField
                                        fullWidth
                                        label="Duración (minutos)"
                                        type="number"
                                        value={horario.duracion_minutos}
                                        onChange={(e) => {
                                            const horario_sueno = [...data.horario_sueno];
                                            horario_sueno[index].duracion_minutos = parseInt(e.target.value);
                                            onChange('descanso', 'horario_sueno', horario_sueno);
                                        }}
                                        inputProps={{ min: 0 }}
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Tipo de sueño */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Tipo de sueño</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {data.tipo_sueno.map((tipo, index) => (
                            <Grid item xs={12} sm={6} key={tipo.tipo_periodo}>
                                <Typography variant="subtitle1">{tipo.tipo_periodo}</Typography>
                                <FormControl component="fieldset" fullWidth sx={{ mt: 1 }}>
                                    <FormLabel component="legend">Calidad del sueño</FormLabel>
                                    <RadioGroup
                                        value={tipo.calidad_sueno}
                                        onChange={(e) => {
                                            const updated = [...data.tipo_sueno];
                                            updated[index].calidad_sueno = e.target.value;
                                            onChange('descanso', 'tipo_sueno', updated);
                                        }}
                                    >
                                        <FormControlLabel value="Tranquilo" control={<Radio />} label="Tranquilo" />
                                        <FormControlLabel value="Intranquilo" control={<Radio />} label="Intranquilo" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Lugar de descanso */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Lugar de descanso</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {data.lugar_descanso.map((lugar, index) => (
                            <Grid item xs={12} sm={6} key={lugar.tipo_periodo}>
                                <TextField
                                    fullWidth
                                    label={`Descripción del lugar (${lugar.tipo_periodo})`}
                                    value={lugar.descripcion_lugar}
                                    onChange={(e) => {
                                        const updated = [...data.lugar_descanso];
                                        updated[index].descripcion_lugar = e.target.value;
                                        onChange('descanso', 'lugar_descanso', updated);
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Ritmo de sueño */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Ritmo de sueño</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <FormLabel component="legend">Tipo de ritmo</FormLabel>
                        <RadioGroup
                            value={data.ritmo_sueno.tipo_ritmo}
                            onChange={(e) => {
                                const ritmo_sueno = { ...data.ritmo_sueno, tipo_ritmo: e.target.value };
                                onChange('descanso', 'ritmo_sueno', ritmo_sueno);
                            }}
                        >
                            <FormControlLabel value="Continuo" control={<Radio />} label="Continuo" />
                            <FormControlLabel value="Interrumpido" control={<Radio />} label="Interrumpido" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Frecuencia de interrupciones"
                        value={data.ritmo_sueno.frecuencia_interrupciones}
                        onChange={(e) => {
                            const ritmo_sueno = { ...data.ritmo_sueno, frecuencia_interrupciones: e.target.value };
                            onChange('descanso', 'ritmo_sueno', ritmo_sueno);
                        }}
                    />
                </AccordionDetails>
            </Accordion>

            {/* Circunstancias de sueño */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Circunstancias de sueño</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {data.circunstancias_sueno.map((circunstancia, index) => (
                            <Grid item xs={12} key={circunstancia.tipo_circunstancia}>
                                <Box sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 1, mb: 2 }}>
                                    <Typography variant="subtitle1">{circunstancia.tipo_circunstancia}</Typography>
                                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                                        <RadioGroup
                                            value={circunstancia.respuesta}
                                            onChange={(e) => {
                                                const circunstancias_sueno = [...data.circunstancias_sueno];
                                                circunstancias_sueno[index].respuesta = e.target.value;
                                                onChange('descanso', 'circunstancias_sueno', circunstancias_sueno);
                                            }}
                                            row
                                        >
                                            <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                    <TextField
                                        fullWidth
                                        label="Descripción / Justificación"
                                        value={circunstancia.descripcion_justificacion}
                                        onChange={(e) => {
                                            const circunstancias_sueno = [...data.circunstancias_sueno];
                                            circunstancias_sueno[index].descripcion_justificacion = e.target.value;
                                            onChange('descanso', 'circunstancias_sueno', circunstancias_sueno);
                                        }}
                                    />
                                    {circunstancia.tipo_circunstancia === "Acompañado por" && circunstancia.respuesta === "Sí" && (
                                        <TextField
                                            fullWidth
                                            label="Detalle del acompañamiento"
                                            value={circunstancia.detalle_acompanamiento || ""}
                                            onChange={(e) => {
                                                const circunstancias_sueno = [...data.circunstancias_sueno];
                                                circunstancias_sueno[index].detalle_acompanamiento = e.target.value;
                                                onChange('descanso', 'circunstancias_sueno', circunstancias_sueno);
                                            }}
                                            sx={{ mt: 2 }}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Conductas durante el sueño */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Conductas durante el sueño</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {data.conductas_sueno.map((conducta, index) => (
                        <Box key={conducta.tipo_conducta} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                            <Typography variant="subtitle2">{conducta.tipo_conducta}</Typography>
                            <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                                <FormLabel component="legend">Frecuencia</FormLabel>
                                <RadioGroup
                                    value={conducta.frecuencia}
                                    onChange={(e) => {
                                        const conductas_sueno = [...data.conductas_sueno];
                                        conductas_sueno[index].frecuencia = e.target.value;
                                        onChange('descanso', 'conductas_sueno', conductas_sueno);
                                    }}
                                    row
                                >
                                    <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
                                    <FormControlLabel value="A veces" control={<Radio />} label="A veces" />
                                    <FormControlLabel value="Frecuentemente" control={<Radio />} label="Frecuentemente" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Descripción"
                                value={conducta.descripcion_conducta}
                                onChange={(e) => {
                                    const conductas_sueno = [...data.conductas_sueno];
                                    conductas_sueno[index].descripcion_conducta = e.target.value;
                                    onChange('descanso', 'conductas_sueno', conductas_sueno);
                                }}
                            />
                        </Box>
                    ))}

                    {/* Otras conductas durante el sueño */}
                    <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>Otras conductas</Typography>
                    {data.otras_conductas_sueno.map((conducta, index) => (
                        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                            <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                                <FormLabel component="legend">Frecuencia</FormLabel>
                                <RadioGroup
                                    value={conducta.frecuencia}
                                    onChange={(e) => {
                                        const conductas_sueno = [...data.conductas_sueno];
                                        conductas_sueno[index].frecuencia = e.target.value;
                                        onChange('descanso', 'conductas_sueno', conductas_sueno);
                                    }}
                                    row
                                >
                                    <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
                                    <FormControlLabel value="A veces" control={<Radio />} label="A veces" />
                                    <FormControlLabel value="Frecuentemente" control={<Radio />} label="Frecuentemente" />
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Descripción"
                                value={conducta.descripcion}
                                onChange={(e) => {
                                    const otras_conductas = [...data.otras_conductas_sueno];
                                    otras_conductas[index].descripcion = e.target.value;
                                    onChange('descanso', 'otras_conductas_sueno', otras_conductas);
                                }}
                            />
                            <IconButton onClick={() => {
                                const otras_conductas = [...data.otras_conductas_sueno];
                                otras_conductas.splice(index, 1);
                                onChange('descanso', 'otras_conductas_sueno', otras_conductas);
                            }} color="error">
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => {
                            const otras_conductas = [...data.otras_conductas_sueno];
                            otras_conductas.push({ descripcion: '' });
                            onChange('descanso', 'otras_conductas_sueno', otras_conductas);
                        }}
                        sx={{ mt: 1 }}
                    >
                        Añadir otra conducta
                    </Button>
                </AccordionDetails>
            </Accordion>

            {/* Comienzo de sueño */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Comienzo de sueño</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {data.comienzo_sueno.map((comienzo, index) => (
                            <Grid item xs={12} sm={6} key={comienzo.tipo_periodo}>
                                <Box sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                                    <Typography variant="subtitle1">{comienzo.tipo_periodo}</Typography>
                                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                                        <FormLabel component="legend">Tipo de comienzo</FormLabel>
                                        <RadioGroup
                                            value={comienzo.tipo_comienzo}
                                            onChange={(e) => {
                                                const comienzo_sueno = [...data.comienzo_sueno];
                                                comienzo_sueno[index].tipo_comienzo = e.target.value;
                                                onChange('descanso', 'comienzo_sueno', comienzo_sueno);
                                            }}
                                        >
                                            <FormControlLabel value="Espontaneo" control={<Radio />} label="Espontáneo" />
                                            <FormControlLabel value="Inducido" control={<Radio />} label="Inducido" />
                                        </RadioGroup>
                                    </FormControl>
                                    {comienzo.tipo_comienzo === "Inducido" && (
                                        <TextField
                                            fullWidth
                                            label="Método de inducción"
                                            value={comienzo.metodo_induccion}
                                            onChange={(e) => {
                                                const comienzo_sueno = [...data.comienzo_sueno];
                                                comienzo_sueno[index].metodo_induccion = e.target.value;
                                                onChange('descanso', 'comienzo_sueno', comienzo_sueno);
                                            }}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Estado al despertar */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Estado al despertar</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <FormLabel component="legend">Tipo de estado</FormLabel>
                        <RadioGroup
                            value={data.estado_despertar.tipo_estado}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                                const estado_despertar = { ...data.estado_despertar, tipo_estado: e.target.value };
                                onChange('descanso', 'estado_despertar', estado_despertar);
                            }}
                        >
                            <FormControlLabel value="Buen humor" control={<Radio />} label="Buen humor" />
                            <FormControlLabel value="Mal humor" control={<Radio />} label="Mal humor" />
                            <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Descripción adicional"
                        value={data.estado_despertar.descripcion_adicional}
                        onChange={(e) => {
                            const estado_despertar = { ...data.estado_despertar, descripcion_adicional: e.target.value };
                            onChange('descanso', 'estado_despertar', estado_despertar);
                        }}
                    />
                </AccordionDetails>
            </Accordion>

            {/* Levantadas nocturnas */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Levantadas nocturnas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <FormLabel component="legend">Frecuencia</FormLabel>
                        <RadioGroup
                            value={data.levantadas_nocturnas.frecuencia}
                            onChange={(e) => {
                                const levantadas_nocturnas = { ...data.levantadas_nocturnas, frecuencia: e.target.value };
                                onChange('descanso', 'levantadas_nocturnas', levantadas_nocturnas);
                            }}
                            row
                        >
                            <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
                            <FormControlLabel value="A veces" control={<Radio />} label="A veces" />
                            <FormControlLabel value="Frecuentemente" control={<Radio />} label="Frecuentemente" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Motivo"
                        value={data.levantadas_nocturnas.motivo}
                        onChange={(e) => {
                            const levantadas_nocturnas = { ...data.levantadas_nocturnas, motivo: e.target.value };
                            onChange('descanso', 'levantadas_nocturnas', levantadas_nocturnas);
                        }}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default DescansoTab;
