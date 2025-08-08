import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import GeneralEvaluationTab from './Ocupacionaltabs/GeneralEvaluationTab';
import AlimentacionTab from './Ocupacionaltabs/AlimentacionTab';
import DescansoTab from './Ocupacionaltabs/DescansoTab';
import AseoTab from './Ocupacionaltabs/AseoTab';
import VestimentaTab from './Ocupacionaltabs/VestimentaTab';
import JuegoTab from './Ocupacionaltabs/JuegoTab';
import ConductaTab from './Ocupacionaltabs/ConductaTab';

const OcupacionalForm = ({
  notasTratamiento,
  setNotasTratamiento,
  medicacion,
  setMedicacion,
  setFile,
  handleHistoryData
}) => {
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [openSection, setOpenSection] = useState(null);

  // Estado para datos generales de terapia ocupacional
  const [ocupacionalData, setOcupacionalData] = useState({
    // Datos generales
    actividades_vida_diaria: '',
    motricidad_fina: '',
    coordinacion_visomotora: '',
    nivel_independencia: 'moderado',
    objetivo_terapeutico: '',

    // Datos específicos de alimentación
    alimentacion: {
      notas_generales: '',
      horario_comidas: [
        { tipo_comida: 'Desayuno', tiene_horario: false, horario: '' },
        { tipo_comida: 'Almuerzo', tiene_horario: false, horario: '' },
        { tipo_comida: 'Merienda', tiene_horario: false, horario: '' },
        { tipo_comida: 'Cena', tiene_horario: false, horario: '' }
      ],
      independencia: {
        actual: { come_solo: false, bebe_solo: 'Nunca', sostiene_elemento: false },
        anterior: { come_solo: false, bebe_solo: 'Nunca', sostiene_elemento: false }
      },
      elementos: {
        actual: [],
        anterior: []
      },
      uso_elementos: {
        numero_diario: '',
        tipo_alimento: '',
        tipo_tetina: '',
        posicion_nino: '',
        solo_acompanado: 'Solo',
        material: ''
      },
      ingesta_liquidos: {
        actual: { cantidad: 'Moderado', momentos_dia: '' },
        anterior: { cantidad: 'Moderado', momentos_dia: '' }
      },
      dificultades: {
        actual: [],
        anterior: []
      },
      preferencias: {
        comida_preferida: '',
        bebida_preferida: '',
        comida_rechazada: '',
        bebida_rechazada: ''
      },
      comportamiento: [
        { descripcion: 'Se distrae fácilmente', respuesta: 'No' },
        { descripcion: 'Se levanta durante la comida', respuesta: 'No' },
        { descripcion: 'Juega con la comida', respuesta: 'No' }
      ],
      respuesta_padres: {
        rechazo: '',
        requiere_mas: ''
      },
      conducta: {
        rechazar: '',
        requerir_mas: ''
      },
      gustos: {
        salado: false,
        dulce: false,
        ambos: false,
        condimentos: false
      },
      presentacion: {
        cantidad: '',
        forma_presentacion: ''
      },
      comunicacion: [
        { descripcion: 'Indica cuando quiere más', respuesta: 'No' },
        { descripcion: 'Pide comida/bebida específica', respuesta: 'No' },
        { descripcion: 'Comunica saciedad', respuesta: 'No' }
      ]
    },

    // NUEVOS DATOS - Descanso
    descanso: {
      observaciones_generales: '',
      horas_sueno: [
        { tipo_periodo: 'Noche', horas: 0 },
        { tipo_periodo: 'Dia', horas: 0 },
        { tipo_periodo: 'Total', horas: 0 }
      ],
      horario_sueno: [
        { tipo_periodo: 'Noche', hora_inicio: '', hora_fin: '', duracion_minutos: 0 },
        { tipo_periodo: 'Dia', hora_inicio: '', hora_fin: '', duracion_minutos: 0 }
      ],
      tipo_sueno: [
        { tipo_periodo: 'Noche', calidad_sueno: 'Tranquilo' },
        { tipo_periodo: 'Dia', calidad_sueno: 'Tranquilo' }
      ],
      lugar_descanso: [
        { tipo_periodo: 'Noche', descripcion_lugar: '' },
        { tipo_periodo: 'Dia', descripcion_lugar: '' }
      ],
      ritmo_sueno: {
        tipo_ritmo: 'Continuo',
        frecuencia_interrupciones: ''
      },
      circunstancias_sueno: [
        { tipo_circunstancia: 'Acompañado por', respuesta: 'No', descripcion_justificacion: '', detalle_acompanamiento: '' },
        { tipo_circunstancia: 'Solo', respuesta: 'No', descripcion_justificacion: '' },
        { tipo_circunstancia: 'Objeto', respuesta: 'No', descripcion_justificacion: '' },
        { tipo_circunstancia: 'Se moja', respuesta: 'No', descripcion_justificacion: '' },
        { tipo_circunstancia: 'Con luz', respuesta: 'No', descripcion_justificacion: '' }
      ],
      conductas_sueno: [
        { tipo_conducta: 'Habla dormido', frecuencia: 'Nunca', descripcion_conducta: '' },
        { tipo_conducta: 'Grita', frecuencia: 'Nunca', descripcion_conducta: '' },
        { tipo_conducta: 'Pesadillas', frecuencia: 'Nunca', descripcion_conducta: '' }
      ],
      otras_conductas_sueno: [],
      comienzo_sueno: [
        { tipo_periodo: 'Noche', tipo_comienzo: 'Espontaneo', metodo_induccion: '' },
        { tipo_periodo: 'Dia', tipo_comienzo: 'Espontaneo', metodo_induccion: '' }
      ],
      estado_despertar: {
        tipo_estado: 'Buen humor',
        descripcion_adicional: ''
      },
      levantadas_nocturnas: {
        frecuencia: 'A veces',
        motivo: ''
      }
    },
    // NUEVOS DATOS - Aseo
    aseo: {
      observaciones_generales: '',
      agrado_aseo: [
        { tipo_actividad: 'Bañarse', nivel_agrado: 'Sí' },
        { tipo_actividad: 'Lavado de cabeza', nivel_agrado: 'Sí' }
      ],
      persona_aseo: [
        { tipo_aseo: 'Baño', persona_responsable: '' },
        { tipo_aseo: 'Lavado de dientes', persona_responsable: '' }
      ],
      otros_aseo: [],
      lugar_bano: {
        tipo_lugar: 'Bañera',
        descripcion_otro: '',
        horario_bano: '',
        frecuencia: '',
        duracion_minutos: 0
      },
      actitud_bano: {
        tipo_actitud: 'Juego',
        descripcion_otro: ''
      },
      conductas_bano: [
        { tipo_conducta: 'Juego', descripcion: '' },
        { tipo_conducta: 'Juguetes', descripcion: '' }
      ],
      otras_conductas_bano: [],
      preferencias_bano: {
        temperatura_agua: 'Tibia',
        comunicacion_baño: [],
        descripcion_otras_comunicaciones: ''
      },
      independencia_aseo: [
        { area_aseo: 'Mano', nivel_independencia: 'No' },
        { area_aseo: 'Cara', nivel_independencia: 'No' },
        { area_aseo: 'Dientes', nivel_independencia: 'No' },
        { area_aseo: 'Partes intimas', nivel_independencia: 'No' },
        { area_aseo: 'Peinarse', nivel_independencia: 'No' },
        { area_aseo: 'Bañarse', nivel_independencia: 'No' }
      ],
      actitud_espejo: {
        descripcion_actitud: ''
      },
      control_esfinteres: [
        { tipo_control: 'Vesical', periodo: 'Diurno', edad_adquisicion: '', logrado: false },
        { tipo_control: 'Vesical', periodo: 'Nocturno', edad_adquisicion: '', logrado: false },
        { tipo_control: 'Anal', periodo: 'Diurno', edad_adquisicion: '', logrado: false },
        { tipo_control: 'Anal', periodo: 'Nocturno', edad_adquisicion: '', logrado: false }
      ],
      uso_panales: {
        frecuencia_uso: 'No',
        tipo_uso: 'Diurno'
      },
      lugares_deposicion: [
        { tipo_deposicion: 'Orina', descripcion_lugar: '' },
        { tipo_deposicion: 'Heces', descripcion_lugar: '' }
      ]
    },

    // NUEVOS DATOS - Vestimenta
    vestimenta: {
      observaciones: '',
      habilidades_vestimenta: [
        { tipo_habilidad: 'Colaboración corporal', nivel: 'No' },
        { tipo_habilidad: 'Reconocimiento de la ropa', nivel: 'No' },
        { tipo_habilidad: 'Elección de la ropa', nivel: 'No' },
        { tipo_habilidad: 'Elección según ocasión', nivel: 'No' }
      ],
      independencia_vestimenta: [
        { tipo_accion: 'Vestirse', nivel_independencia: 'Con ayuda' },
        { tipo_accion: 'Desvestirse', nivel_independencia: 'Con ayuda' }
      ],
      cantidad_ropa: [
        { tipo_evaluacion: 'Actual', cantidad: 'Normal', le_gusta_descalzarse: false },
        { tipo_evaluacion: 'Anterior', cantidad: 'Normal', le_gusta_descalzarse: false }
      ]
    },

    // NUEVOS DATOS - Juego
    juego: {
      opinion_padres: '',
      observaciones: '',
      juguetes_preferidos: [],
      preferencias_companeros: [
        { tipo_preferencia: 'Sexo', valor_preferencia: '' },
        { tipo_preferencia: 'Edad', valor_preferencia: '' }
      ],
      preferencia_animales: []
    },

    // NUEVOS DATOS - Conducta
    conducta: {
      observaciones: '',
      comportamiento_general: [
        { contexto: 'En la casa', descripcion_lugar: '', descripcion_comportamiento: '' },
        { contexto: 'En la calle', descripcion_lugar: '', descripcion_comportamiento: '' }
      ],
      otros_comportamientos: [],
      conductas_oposicion: [
        { tipo_conducta: 'Caprichos', frecuencia: 'No', justificacion: '' },
        { tipo_conducta: 'Pataletas', frecuencia: 'No', justificacion: '' }
      ],
      patrones_llanto: [],
      conductas_especificas: [
        { tipo_conducta: 'Toma el olor de objetos', respuesta: 'No', descripcion_adicional: '' },
        { tipo_conducta: 'Rompe cosas', respuesta: 'No', descripcion_adicional: '' },
        { tipo_conducta: 'Se aísla', respuesta: 'No', descripcion_adicional: '' },
        { tipo_conducta: 'Es travieso', respuesta: 'No', descripcion_adicional: '' },
        { tipo_conducta: 'Es temerario (arriesgado)', respuesta: 'No', descripcion_adicional: '' }
      ],
      nocion_peligro: [
        { tipo_peligro: 'Electricidad', tiene_nocion: false, descripcion_otro: '' },
        { tipo_peligro: 'Fuego', tiene_nocion: false, descripcion_otro: '' },
        { tipo_peligro: 'Animales', tiene_nocion: false, descripcion_otro: '' },
        { tipo_peligro: 'Calle (autos)', tiene_nocion: false, descripcion_otro: '' },
        { tipo_peligro: 'Objetos cortantes', tiene_nocion: false, descripcion_otro: '' }
      ],
      otros_peligros: [],
      habitos_television: {
        mira_tv: false,
        tiempo_diario: '',
        programas_preferidos: '',
        postura: ''
      },
      factores_tranquilidad: [],
      relaciones_sociales: [
        { tipo_relacion: 'Con conocidos', facilidad: false, descripcion: '' },
        { tipo_relacion: 'Con desconocidos', facilidad: false, descripcion: '' },
        { tipo_relacion: 'Separación madre', facilidad: false, descripcion: '' },
        { tipo_relacion: 'Separación padre', facilidad: false, descripcion: '' },
        { tipo_relacion: 'Con hermanos', facilidad: false, descripcion: '' },
        { tipo_relacion: 'Con parientes', facilidad: false, descripcion: '' }
      ],
      condiciones_vivienda: [
        { aspecto: 'Habitación privada', presente: false, descripcion_otro: '' },
        { aspecto: 'Lugar de juegos', presente: false, descripcion_otro: '' }
      ],
      otras_condiciones_vivienda: []
    }
  });

  const handleGeneralChange = (field, value) => {
    setOcupacionalData(prev => {
      const updated = { ...prev, [field]: value };
      handleHistoryData?.(updated);
      return updated;
    });
  };
  const handleAlimentacionChange = (sectionPath, field, value) => {
    setOcupacionalData(prevData => {
      const newData = { ...prevData };
  
      const path = sectionPath ? sectionPath.split('.') : [];
      let current = newData.alimentacion;
  
      // Navegar al objeto destino
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
  
      current[field] = value;
  
      return {
        ...newData,
        alimentacion: { ...newData.alimentacion }
      };
    });
  };
  



  // Manejo de cambios para las nuevas secciones
  const handleSectionChange = (section, field, value) => {
    const sectionData = { ...ocupacionalData[section] };
    sectionData[field] = value;

    const newData = { ...ocupacionalData, [section]: sectionData };
    setOcupacionalData(newData);
    handleHistoryData && handleHistoryData(newData);
  };

  // Manejo de cambios para datos anidados en las nuevas secciones
  const handleNestedSectionChange = (section, subSection, field, value) => {
    const sectionData = { ...ocupacionalData[section] };
    sectionData[subSection][field] = value;

    const newData = { ...ocupacionalData, [section]: sectionData };
    setOcupacionalData(newData);
    handleHistoryData && handleHistoryData(newData);
  };

  const handleArrayChange = (section, arrayName, index, field, value) => {
    setOcupacionalData(prev => {
      const updatedArray = [...prev[section][arrayName]];
      updatedArray[index][field] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: updatedArray
        }
      };
    });
  };

  const handleAlimentacionArrayChange = (sectionPath, index, field, value) => {
    setOcupacionalData(prevData => {
      const newData = { ...prevData };
      const path = sectionPath.split('.'); // ej: ["alimentacion", "comunicacion"]
  
      // Navegamos hasta el array objetivo
      let current = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
  
      const arrayName = path[path.length - 1];
      const updatedArray = [...current[arrayName]];
  
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value
      };
  
      current[arrayName] = updatedArray;
  
      return { ...newData };
    });
  };
  
  // Añadir elementos a arrays para nuevas secciones
  const addArrayItem = (section, arrayName, newItem) => {
    const sectionData = { ...ocupacionalData[section] };
    sectionData[arrayName].push(newItem);

    const newData = { ...ocupacionalData, [section]: sectionData };
    setOcupacionalData(newData);
    handleHistoryData && handleHistoryData(newData);
  };

  // Eliminar elementos de arrays para nuevas secciones
  const removeArrayItem = (section, arrayName, index) => {
    const sectionData = { ...ocupacionalData[section] };
    sectionData[arrayName].splice(index, 1);

    const newData = { ...ocupacionalData, [section]: sectionData };
    setOcupacionalData(newData);
    handleHistoryData && handleHistoryData(newData);
  };

  // Manejo de elementos de alimentación (ya implementado)
  const addElemento = (tipo) => {
    const alimentacion = { ...ocupacionalData.alimentacion };
    alimentacion.elementos[tipo].push({ descripcion_elemento: '' });

    const newData = { ...ocupacionalData, alimentacion };
    setOcupacionalData(newData);
    handleHistoryData && handleHistoryData(newData);
  };

  const removeElemento = (tipo, index) => {
    const alimentacion = { ...ocupacionalData.alimentacion };
    alimentacion.elementos[tipo].splice(index, 1);

    const newData = { ...ocupacionalData, alimentacion };
    setOcupacionalData(newData);
    handleHistoryData && handleHistoryData(newData);
  };

  // Manejo de dificultades (ya implementado)
  const addDificultad = (tipo) => {
    const alimentacion = { ...ocupacionalData.alimentacion };
    alimentacion.dificultades[tipo].push({ descripcion_dificultad: '' });

    const newData = { ...ocupacionalData, alimentacion };
    setOcupacionalData(newData);
    handleHistoryData && handleHistoryData(newData);
  };

  const removeDificultad = (tipo, index) => {
    const alimentacion = { ...ocupacionalData.alimentacion };
    alimentacion.dificultades[tipo].splice(index, 1);

    const newData = { ...ocupacionalData, alimentacion };
    setOcupacionalData(newData);
    handleHistoryData && handleHistoryData(newData);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  //
  const handleChange = (section, field, value) => {
    setOcupacionalData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      }
    }));
  };

  // funcion para alteernar secciones
  const toggleSection = (section) => {
    setOpenSection(prev => (prev === section ? null : section));
  };
  // Renderizado principal de OcupacionalForm
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={activeTab}
        onClick={(e) => e.stopPropagation()}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        <Tab label="Evaluación General" />
        <Tab label="Alimentación" />
        <Tab label="Descanso" />
        <Tab label="Aseo" />
        <Tab label="Vestimenta" />
        <Tab label="Juego" />
        <Tab label="Conducta" />
        <Tab label="Notas de Tratamiento" />
        <Tab label="Medicación" />
      </Tabs>

      {activeTab === 0 && (
        <GeneralEvaluationTab
          data={ocupacionalData}
          onChange={handleGeneralChange}
        />
      )}
      {activeTab === 1 && (
        <AlimentacionTab
          data={ocupacionalData.alimentacion}
          onChange={(sectionPath, field, value) => {
            setOcupacionalData(prev => {
              const updated = { ...prev };
              let target = updated.alimentacion;
              
              // Manejo de rutas anidadas como 'independencia.actual'
              if (sectionPath) {
                const keys = sectionPath.split('.');
                for (const key of keys) {
                  target = target[key];
                }
              }
              
              target[field] = value;
              
              handleHistoryData?.(updated);
              return updated;
            });
          }}
          onArrayChange={(arrayName, index, field, value) => {
            setOcupacionalData(prev => {
              const updated = { ...prev };
              const array = [...updated.alimentacion[arrayName]];
              array[index] = { ...array[index], [field]: value };
              updated.alimentacion[arrayName] = array;
              
              handleHistoryData?.(updated);
              return updated;
            });
          }}
        />
      )}
      {activeTab === 2 && (
        <DescansoTab
          data={ocupacionalData.descanso}
          onChange={handleSectionChange}
          openSection={openSection}
          setOpenSection={setOpenSection}
          onAddArrayItem={(arrayName, newItem) => addArrayItem('descanso', arrayName, newItem)}
          onRemoveArrayItem={(arrayName, index) => removeArrayItem('descanso', arrayName, index)}
        />
      )}
      {activeTab === 3 && (
        <AseoTab 
          data={ocupacionalData.aseo} 
          onChange={handleSectionChange} 
          onArrayChange={handleArrayChange} 
        />
      )}
      {activeTab === 4 && (
        <VestimentaTab 
          data={ocupacionalData.vestimenta} 
          onChange={handleSectionChange} 
          onArrayChange={handleArrayChange} 
        />
      )}
      {activeTab === 5 && (
        <JuegoTab 
        data={ocupacionalData.juego} 
        onChange={handleSectionChange} 
        onArrayChange={handleArrayChange} />
      )}
      {activeTab === 6 && (
        <ConductaTab 
        data={ocupacionalData.conducta} 
        onChange={handleSectionChange} 
        onArrayChange={handleArrayChange} />
      )}
      {activeTab === 7 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Notas de Tratamiento
          </Typography>
          <TextField
            fullWidth
            label="Notas del tratamiento"
            multiline
            rows={6}
            value={notasTratamiento}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setNotasTratamiento(e.target.value)}
          />
        </Box>
      )}
      {activeTab === 8 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Medicación
          </Typography>
          <TextField
            fullWidth
            label="Medicación"
            multiline
            rows={6}
            value={medicacion}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setMedicacion(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
              sx={{ mt: 2 }}
            >
              Adjuntar archivo
              <input
                type="file"
                hidden
                onClick={(e) => e.stopPropagation()}
                onChange={handleFileChange}
              />
            </Button>
            {fileName && (
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Archivo seleccionado: {fileName}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OcupacionalForm;

export const addArrayItem = (data, setData, section, arrayName, newItem, handleHistoryData) => {
  const sectionData = { ...data[section] };
  sectionData[arrayName].push(newItem);

  const newData = { ...data, [section]: sectionData };
  setData(newData);
  handleHistoryData && handleHistoryData(newData);
};

export const removeArrayItem = (data, setData, section, arrayName, index, handleHistoryData) => {
  const sectionData = { ...data[section] };
  sectionData[arrayName].splice(index, 1);

  const newData = { ...data, [section]: sectionData };
  setData(newData);
  handleHistoryData && handleHistoryData(newData);
};

export const toggleSection = (currentOpenSection, setOpenSection, sectionToToggle, openSection) => {
  setOpenSection(prev => (prev === sectionToToggle ? null : sectionToToggle));
};
