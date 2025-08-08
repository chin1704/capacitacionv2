import React from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  Divider,
  Chip
} from '@mui/material';

// Componente optimizado para mostrar los datos sin edición
const OcupacionalDataDisplay = ({ data }) => {
  if (!data) return <Typography color="text.secondary">Sin datos</Typography>;

  // Para valores simples
  if (typeof data === 'string') {
    return <Typography>{data}</Typography>;
  }

  // Para booleanos
  if (typeof data === 'boolean') {
    return <Chip label={data ? 'Sí' : 'No'} color={data ? 'success' : 'error'} size="small" />;
  }

  // Para arrays
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
            <OcupacionalDataDisplay data={item} />
          </Box>
        ))}
      </Box>
    );
  }

  // Para objetos
  if (typeof data === 'object') {
    return (
      <List sx={{ width: '100%' }}>
        {Object.entries(data).map(([key, value], index) => (
          <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" color="primary.main" sx={{ mb: 1, fontWeight: 'bold', textTransform: 'capitalize' }}>
              {key.replace(/_/g, ' ')}:
            </Typography>
            <Box sx={{ pl: 2, width: '100%' }}>
              <OcupacionalDataDisplay data={value} />
            </Box>
            <Divider sx={{ width: '100%', my: 1 }} />
          </ListItem>
        ))}
      </List>
    );
  }

  return <Typography>{String(data)}</Typography>;
};

export default OcupacionalDataDisplay;