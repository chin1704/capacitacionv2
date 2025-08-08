import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
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

const VestimentaTab = ({data, onChange}) => (
    <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom color="primary">
            Evaluación de Vestimenta
        </Typography>

        <TextField
            fullWidth
            label="Observaciones"
            multiline
            rows={3}
            variant="outlined"
            value={data.observaciones}
            onChange={(e) => onChange('vestimenta', 'observaciones', e.target.value)}
            sx={{ mb: 3 }}
        />

        {/* Habilidades de vestimenta */}
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Habilidades de vestimenta</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {data.habilidades_vestimenta.map((habilidad, index) => (
                        <Grid item xs={12} key={habilidad.tipo_habilidad}>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, mb: 2 }}>
                                <Typography variant="subtitle1">{habilidad.tipo_habilidad}</Typography>
                                <FormControl component="fieldset" fullWidth>
                                    <RadioGroup
                                        value={habilidad.nivel}
                                        onChange={(e) => {
                                            const habilidades_vestimenta = [...data.habilidades_vestimenta];
                                            habilidades_vestimenta[index].nivel = e.target.value;
                                            onChange('vestimenta', 'habilidades_vestimenta', habilidades_vestimenta);
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

        {/* Independencia en vestimenta */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Independencia en vestimenta</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {data.independencia_vestimenta.map((accion, index) => (
                        <Grid item xs={12} sm={6} key={accion.tipo_accion}>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                <Typography variant="subtitle1">{accion.tipo_accion}</Typography>
                                <FormControl component="fieldset" fullWidth>
                                    <RadioGroup
                                        value={accion.nivel_independencia}
                                        onChange={(e) => {
                                            const independencia_vestimenta = [...data.independencia_vestimenta];
                                            independencia_vestimenta[index].nivel_independencia = e.target.value;
                                            onChange('vestimenta', 'independencia_vestimenta', independencia_vestimenta);
                                        }}
                                    >
                                        <FormControlLabel value="Solo" control={<Radio />} label="Solo" />
                                        <FormControlLabel value="Con ayuda" control={<Radio />} label="Con ayuda" />
                                        <FormControlLabel value="No puede" control={<Radio />} label="No puede" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>

        {/* Cantidad de ropa */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Cantidad de ropa</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {data.cantidad_ropa.map((evaluacion, index) => (
                        <Grid item xs={12} key={evaluacion.tipo_evaluacion}>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, mb: 2 }}>
                                <Typography variant="subtitle1">{evaluacion.tipo_evaluacion}</Typography>
                                <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                                    <FormLabel component="legend">Cantidad</FormLabel>
                                    <RadioGroup
                                        value={evaluacion.cantidad}
                                        onChange={(e) => {
                                            const cantidad_ropa = [...data.cantidad_ropa];
                                            cantidad_ropa[index].cantidad = e.target.value;
                                            onChange('vestimenta', 'cantidad_ropa', cantidad_ropa);
                                        }}
                                        row
                                    >
                                        <FormControlLabel value="Excesiva" control={<Radio />} label="Excesiva" />
                                        <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
                                        <FormControlLabel value="Escasa" control={<Radio />} label="Escasa" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={evaluacion.le_gusta_descalzarse}
                                            onChange={(e) => {
                                                const cantidad_ropa = [...data.cantidad_ropa];
                                                cantidad_ropa[index].le_gusta_descalzarse = e.target.checked;
                                                onChange('vestimenta', 'cantidad_ropa', cantidad_ropa);
                                            }}
                                        />
                                    }
                                    label="Le gusta descalzarse"
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    </Box>
);
export default VestimentaTab;
