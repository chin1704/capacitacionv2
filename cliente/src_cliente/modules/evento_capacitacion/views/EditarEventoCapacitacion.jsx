import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventoCapacitacionById, updateEventoCapacitacion } from '../services/eventoCapacitacionSerice';
import { getAllCurso } from '../../curso/services/cursoService';
import { getAllCapacitador } from '../../capacitador/services/capacitadorService';
import '../css/formulario.css'; 
import { Link } from 'react-router-dom'; 

const EditarEventoCapacitacion = () => {
  const { id } = useParams();
  const [eventoCapacitacion, setEventoCapacitacion] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [capacitadores, setCapacitadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Función para formatear fecha para datetime-local
  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Formato: YYYY-MM-DDTHH:MM
    return date.toISOString().slice(0, 16);
  };

  useEffect(() => {
    Promise.all([
      getEventoCapacitacionById(id),
      getAllCurso(),
      getAllCapacitador()
    ])
      .then(([eventoRes, cursosRes, capacitadoresRes]) => {
        const evento = eventoRes.data;
        
        // Formatear fechas para datetime-local
        if (evento.fecha_inicio_evento_capacitacion) {
          evento.fecha_inicio_evento_capacitacion = formatDateTimeForInput(evento.fecha_inicio_evento_capacitacion);
        }
        if (evento.fecha_fin_evento_capacitacion) {
          evento.fecha_fin_evento_capacitacion = formatDateTimeForInput(evento.fecha_fin_evento_capacitacion);
        }
        
        setEventoCapacitacion(evento);
        setCursos(cursosRes.data || []);
        setCapacitadores(capacitadoresRes.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar el evento de capacitación');
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventoCapacitacion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!eventoCapacitacion.nombre_evento_capacitacion || !eventoCapacitacion.id_curso || !eventoCapacitacion.id_capacitador) {
      setError('El nombre del evento, curso y capacitador son obligatorios');
      return;
    }

    if (eventoCapacitacion.fecha_inicio_evento_capacitacion && eventoCapacitacion.fecha_fin_evento_capacitacion) {
      if (new Date(eventoCapacitacion.fecha_inicio_evento_capacitacion) > new Date(eventoCapacitacion.fecha_fin_evento_capacitacion)) {
        setError('La fecha y hora de inicio no puede ser mayor a la fecha y hora de fin');
        return;
      }
    }

    setSaving(true);
    setError('');
    
    updateEventoCapacitacion(id, eventoCapacitacion)
      .then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        setError('Error al actualizar el evento de capacitación');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) {
    return <div className="loading-container"><div className="loading-spinner"></div><p>Cargando...</p></div>;
  }

  if (!eventoCapacitacion) {
    return <div className="error-container">No se pudo cargar el evento de capacitación</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Editar Evento de Capacitación</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Evento de capacitación actualizado exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Evento:</label>
            <input
              type="text"
              name="nombre_evento_capacitacion"
              value={eventoCapacitacion.nombre_evento_capacitacion || ''}
              onChange={handleInputChange}
              required
              placeholder="Ingrese el nombre del evento"
            />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion_evento_capacitacion"
              value={eventoCapacitacion.descripcion_evento_capacitacion || ''}
              onChange={handleInputChange}
              placeholder="Ingrese la descripción del evento"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Fecha y Hora de Inicio:</label>
            <input
              type="datetime-local"
              name="fecha_inicio_evento_capacitacion"
              value={eventoCapacitacion.fecha_inicio_evento_capacitacion || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Fecha y Hora de Fin:</label>
            <input
              type="datetime-local"
              name="fecha_fin_evento_capacitacion"
              value={eventoCapacitacion.fecha_fin_evento_capacitacion || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Costo:</label>
            <input
              type="number"
              step="0.01"
              name="costo_evento_capacitacion"
              value={eventoCapacitacion.costo_evento_capacitacion || ''}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Curso:</label>
            <select
              name="id_curso"
              value={eventoCapacitacion.id_curso || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un curso</option>
              {cursos.map(curso => (
                <option key={curso.id_curso} value={curso.id_curso}>
                  {curso.nombre_curso || curso.descripcion_curso || `Curso ${curso.id_curso}`}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Capacitador:</label>
            <select
              name="id_capacitador"
              value={eventoCapacitacion.id_capacitador || ''}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un capacitador</option>
              {capacitadores.map(capacitador => (
                <option key={capacitador.id_capacitador} value={capacitador.id_capacitador}>
                  {capacitador.nombre_capacitador || capacitador.nombres_capacitador || `Capacitador ${capacitador.id_capacitador}`}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Observaciones:</label>
            <textarea
              name="observaciones_evento_capacitacion"
              value={eventoCapacitacion.observaciones_evento_capacitacion || ''}
              onChange={handleInputChange}
              placeholder="Observaciones adicionales"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Archivo:</label>
            <input
              type="text"
              name="archivo_evento_capacitacion"
              value={eventoCapacitacion.archivo_evento_capacitacion || ''}
              onChange={handleInputChange}
              placeholder="Ruta o nombre del archivo"
            />
          </div>
          
          <div className="button-group">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? 'Guardando cambios...' : 'Guardar Cambios'}
            </button>
          
            <Link to="/fcc-evento_capacitacion" className="btn btn-secondary">
              Volver a la lista
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarEventoCapacitacion;