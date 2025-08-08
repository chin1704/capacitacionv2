// components/terapias/ocupacional/tabs/AlimentacionTab.js
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AlimentacionTab = ({ data, onChange, onArrayChange }) => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
                Evaluación de Alimentación
            </Typography>

            <TextField
                fullWidth
                label="Notas generales de alimentación"
                multiline
                rows={2}
                variant="outlined"
                value={data.notas_generales}
                onChange={(e) => onChange('', 'notas_generales', e.target.value)}
                sx={{ mb: 3 }}
            />

            {/* Horarios de comidas */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Horarios de comidas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {data.horario_comidas.map((comida, index) => (
                            <Grid item xs={12} sm={6} key={comida.tipo_comida}>
                                <Box sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
                                    <Typography variant="subtitle1">{comida.tipo_comida}</Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={comida.tiene_horario}
                                                onChange={(e) =>
                                                    onArrayChange('horario_comidas', index, 'tiene_horario', e.target.checked)
                                                }
                                            />
                                        }
                                        label="Tiene horario establecido"
                                    />
                                    {comida.tiene_horario && (
                                        <TextField
                                            type="time"
                                            fullWidth
                                            value={comida.horario || ''}
                                            onChange={(e) =>
                                                onArrayChange('horario_comidas', index, 'horario', e.target.value)
                                            }
                                            sx={{ mt: 1 }}
                                        />
                                    )}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Independencia en la alimentación */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Independencia en la alimentación</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" gutterBottom>Situación Actual</Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.independencia.actual.come_solo}
                                        onChange={(e) => onChange('independencia.actual', 'come_solo', e.target.checked)}
                                    />
                                }
                                label="Come solo"
                            />
                            <FormControl component="fieldset" fullWidth sx={{ mt: 1 }}>
                                <FormLabel component="legend">Bebe solo</FormLabel>
                                <RadioGroup
                                    value={data.independencia.actual.bebe_solo}
                                    onChange={(e) => onChange('independencia.actual', 'bebe_solo', e.target.value)}
                                >
                                    <FormControlLabel value="Siempre" control={<Radio />} label="Siempre" />
                                    <FormControlLabel value="A veces" control={<Radio />} label="A veces" />
                                    <FormControlLabel value="Por momentos" control={<Radio />} label="Por momentos" />
                                    <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
                                </RadioGroup>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.independencia.actual.sostiene_elemento}
                                        onChange={(e) =>
                                            onChange('independencia.actual', 'sostiene_elemento', e.target.checked)
                                        }
                                    />
                                }
                                label="Sostiene elemento"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1" gutterBottom>Situación Anterior</Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.independencia.anterior.come_solo}
                                        onChange={(e) =>
                                            onChange('independencia.anterior', 'come_solo', e.target.checked)
                                        }
                                    />
                                }
                                label="Come solo"
                            />
                            <FormControl component="fieldset" fullWidth sx={{ mt: 1 }}>
                                <FormLabel component="legend">Bebe solo</FormLabel>
                                <RadioGroup
                                    value={data.independencia.anterior.bebe_solo}
                                    onChange={(e) =>
                                        onChange('independencia.anterior', 'bebe_solo', e.target.value)
                                    }
                                >
                                    <FormControlLabel value="Siempre" control={<Radio />} label="Siempre" />
                                    <FormControlLabel value="A veces" control={<Radio />} label="A veces" />
                                    <FormControlLabel value="Por momentos" control={<Radio />} label="Por momentos" />
                                    <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
                                </RadioGroup>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.independencia.anterior.sostiene_elemento}
                                        onChange={(e) =>
                                            onChange('independencia.anterior', 'sostiene_elemento', e.target.checked)
                                        }
                                    />
                                }
                                label="Sostiene elemento"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Comportamiento durante comidas */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Comportamiento durante las comidas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {data.comportamiento.map((comportamiento, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <Typography variant="body1">{comportamiento.descripcion}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            row
                                            value={comportamiento.respuesta}
                                            onChange={(e) =>
                                                onArrayChange('comportamiento', index, 'respuesta', e.target.value)
                                            }
                                        >
                                            <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {index < data.comportamiento.length - 1 && <Divider sx={{ my: 1 }} />}
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>

            {/* Respuesta de los padres */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Respuesta de los padres</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Acción frente al rechazo"
                                multiline
                                rows={2}
                                value={data.respuesta_padres.rechazo}
                                onChange={(e) => onChange('respuesta_padres', 'rechazo', e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Acción cuando requiere más"
                                multiline
                                rows={2}
                                value={data.respuesta_padres.requiere_mas}
                                onChange={(e) => onChange('respuesta_padres', 'requiere_mas', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Conducta del niño */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Conducta del niño</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Al rechazar alimento"
                                multiline
                                rows={2}
                                value={data.conducta.rechazar}
                                onChange={(e) => onChange('conducta', 'rechazar', e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Al requerir más alimento"
                                multiline
                                rows={2}
                                value={data.conducta.requerir_mas}
                                onChange={(e) => onChange('conducta', 'requerir_mas', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Gustos y preferencias */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Gustos y preferencias</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>Preferencias de sabor</Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.gustos.salado}
                                        onChange={(e) => onChange('gustos', 'salado', e.target.checked)}
                                    />
                                }
                                label="Salado"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.gustos.dulce}
                                        onChange={(e) => onChange('gustos', 'dulce', e.target.checked)}
                                    />
                                }
                                label="Dulce"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.gustos.ambos}
                                        onChange={(e) => onChange('gustos', 'ambos', e.target.checked)}
                                    />
                                }
                                label="Ambos"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.gustos.condimentos}
                                        onChange={(e) => onChange('gustos', 'condimentos', e.target.checked)}
                                    />
                                }
                                label="Condimentos"
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Presentación de alimentos */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Presentación de alimentos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Cantidad de alimento"
                                value={data.presentacion.cantidad}
                                onChange={(e) => onChange('presentacion', 'cantidad', e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Forma de presentación"
                                value={data.presentacion.forma_presentacion}
                                onChange={(e) => onChange('presentacion', 'forma_presentacion', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

            {/* Comunicación durante la alimentación */}
            <Accordion sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Comunicación durante la alimentación</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {data.comunicacion.map((item, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <Typography variant="body1">{item.descripcion}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            row
                                            value={item.respuesta}
                                            onChange={(e) => onArrayChange('comunicacion', index, 'respuesta', e.target.value)}
                                        >
                                            <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {index < data.comunicacion.length - 1 && <Divider sx={{ my: 1 }} />}
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default AlimentacionTab;