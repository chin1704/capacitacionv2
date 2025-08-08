import React, { memo } from 'react';
import {
  Typography,
  TextField,
  Box,
  List,
  ListItem,
  Divider,
  Checkbox,
  FormControlLabel
} from '@mui/material';

// Componente optimizado con mejor manejo de cambios
const OcupacionalFieldEditor = memo(({ data, path, onInputChange }) => {
  // Para depuración
  console.log(`Renderizando campo: ${path}, valor:`, data);

  if (typeof data === 'string') {
    return (
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        multiline
        rows={2}
        value={data}
        onChange={(e) => {
          console.log(`Campo ${path} cambiado a: ${e.target.value}`);
          onInputChange(path, e.target.value);
        }}
        sx={{ mb: 2 }}
      />
    );
  }

  if (typeof data === 'boolean') {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={data}
            onChange={(e) => {
              console.log(`Campo ${path} cambiado a: ${e.target.checked}`);
              onInputChange(path, e.target.checked);
            }}
          />
        }
        label={path.split('.').pop() || path}
      />
    );
  }

  if (Array.isArray(data)) {
    return (
      <Box>
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 1,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <OcupacionalFieldEditor
              data={item}
              path={`${path}[${index}]`}
              onInputChange={(_, value) => {
                // Crear una copia del array para no mutar el original
                const updated = [...data];
                updated[index] = value;
                console.log(`Array ${path} actualizado:`, updated);
                onInputChange(path, updated);
              }}
            />
          </Box>
        ))}
      </Box>
    );
  }

  if (typeof data === 'object' && data !== null) {
    return (
      <List sx={{ width: '100%', p: 0 }}>
        {Object.entries(data).map(([key, value], index) => {
          const nestedPath = path ? `${path}.${key}` : key;
          
          return (
            <ListItem
              key={key}
              sx={{ flexDirection: 'column', alignItems: 'flex-start', p: 1 }}
            >
              <Typography
                variant="subtitle2"
                color="primary.main"
                sx={{ mb: 1, fontWeight: 'bold', textTransform: 'capitalize' }}
              >
                {key.replace(/_/g, ' ')}:
              </Typography>
              <Box sx={{ pl: 2, width: '100%' }}>
                <OcupacionalFieldEditor
                  data={value}
                  path={key}
                  onInputChange={(_, subValue) => {
                    // Crear una copia del objeto para actualizarlo
                    const updatedObject = { ...data };
                    updatedObject[key] = subValue;
                    console.log(`Objeto ${path} actualizado:`, updatedObject);
                    onInputChange(path, updatedObject);
                  }}
                />
              </Box>
              {index < Object.entries(data).length - 1 && (
                <Divider sx={{ width: '100%', my: 1 }} />
              )}
            </ListItem>
          );
        })}
      </List>
    );
  }

  return <Typography>{String(data)}</Typography>;
});

export default OcupacionalFieldEditor;