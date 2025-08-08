// terapia/componentes/Ocupacionaltabs/JuegoTab.js
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import { addArrayItem, removeArrayItem } from '../OcupacionalForm';

const JuegoTab = ({ data, onChange }) => (
    <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom color="primary">
            Evaluación del Juego
        </Typography>

        <TextField
            fullWidth
            label="Opinión de los padres"
            multiline
            rows={3}
            variant="outlined"
            value={data.opinion_padres}
            onChange={(e) => onChange('juego', 'opinion_padres', e.target.value)}
            sx={{ mb: 2 }}
        />

        <TextField
            fullWidth
            label="Observaciones generales"
            multiline
            rows={3}
            variant="outlined"
            value={data.observaciones}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onChange('juego', 'observaciones', e.target.value)}
            sx={{ mb: 3 }}
        />

        {/* Juguetes preferidos */}
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Juguetes preferidos</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.juguetes_preferidos.map((juguete, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            label="Descripción del juguete"
                            value={juguete.descripcion}
                            onChange={(e) => {
                                const juguetes_preferidos = [...data.juguetes_preferidos];
                                juguetes_preferidos[index].descripcion = e.target.value;
                                onChange('juego', 'juguetes_preferidos', juguetes_preferidos);
                            }}
                        />
                        <IconButton onClick={() => {
                            const juguetes_preferidos = [...data.juguetes_preferidos];
                            juguetes_preferidos.splice(index, 1);
                            onChange('juego', 'juguetes_preferidos', juguetes_preferidos);
                        }} color="error">

                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                ))}
                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClickCapture={() => {
                        const juguetes_preferidos = [...data.juguetes_preferidos];
                        juguetes_preferidos.push({ descripcion: '' });
                        onChange('juego', 'juguetes_preferidos', juguetes_preferidos);
                    }}
                    sx={{ mt: 1 }}
                >
                    Añadir juguete
                </Button>
            </AccordionDetails>
        </Accordion>

        {/* Preferencias de compañeros */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Preferencias de compañeros</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {data.preferencias_companeros.map((preferencia, index) => (
                        <Grid item xs={12} sm={6} key={preferencia.tipo_preferencia}>
                            <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                <Typography variant="subtitle1">{preferencia.tipo_preferencia}</Typography>
                                <TextField
                                    fullWidth
                                    label={`Preferencia por ${preferencia.tipo_preferencia.toLowerCase()}`}
                                    value={preferencia.valor_preferencia}
                                    onChange={(e) => {
                                        const preferencias_companeros = [...data.preferencias_companeros];
                                        preferencias_companeros[index].valor_preferencia = e.target.value;
                                        onChange('juego', 'preferencias_companeros', preferencias_companeros);
                                    }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>

        {/* Preferencia por animales */}
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Preferencia por animales</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {data.preferencia_animales.map((animal, index) => (
                    <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            label="Descripción del animal"
                            value={animal.descripcion}
                            onChange={(e) => {
                                const preferencia_animales = [...data.preferencia_animales];
                                preferencia_animales[index].descripcion = e.target.value;
                                onChange('juego', 'preferencia_animales', preferencia_animales);
                            }}
                        />
                        <IconButton onClick={() => {
                            const preferencia_animales = [...data.preferencia_animales];
                            preferencia_animales.splice(index, 1);
                            onChange('juego', 'preferencia_animales', preferencia_animales);
                        }} color="error">

                            <DeleteOutlineIcon />
                        </IconButton>
                    </Box>
                ))}
                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => {
                        const preferencia_animales = [...data.preferencia_animales];
                        preferencia_animales.push({ descripcion: '' });
                        onChange('juego', 'preferencia_animales', preferencia_animales);
                    }}
                    sx={{ mt: 1 }}
                >
                    Añadir animal
                </Button>
            </AccordionDetails>
        </Accordion>
    </Box>
);
export default JuegoTab;
