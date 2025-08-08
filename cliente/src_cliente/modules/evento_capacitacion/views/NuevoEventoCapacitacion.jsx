import React, { useState, useEffect } from 'react';
import { createEventoCapacitacion} from '../services/eventoCapacitacionSerice';
import { getAllCurso } from '../../curso/services/cursoService';
import { getAllCapacitador } from '../../capacitador/services/capacitadorService';
import { Link } from 'react-router-dom'; 
import '../css/formulario.css'; 

const NuevoEventoCapacitacion = () => {
  const [formData, setFormData] = useState({
    nombre_evento_capacitacion: '',
    descripcion_evento_capacitacion: '',
    fecha_inicio_evento_capacitacion: '',
    fecha_fin_evento_capacitacion: '',
    costo_evento_capacitacion: '',
    observaciones_evento_capacitacion: '',
    archivo_evento_capacitacion: '',
    id_curso: '',
    id_capacitador: ''
  });
  
  const [cursos, setCursos] = useState([]);
  const [capacitadores, setCapacitadores] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([getAllCurso(), getAllCapacitador()])
      .then(([cursosRes, capacitadoresRes]) => {
        setCursos(cursosRes.data || []);
        setCapacitadores(capacitadoresRes.data || []);
      })
      .catch(err => {
        console.error('Error al cargar datos:', err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre_evento_capacitacion || !formData.id_curso || !formData.id_capacitador) {
      setError('El nombre del evento, curso y capacitador son obligatorios');
      return;
    }

    if (formData.fecha_inicio_evento_capacitacion && formData.fecha_fin_evento_capacitacion) {
      if (new Date(formData.fecha_inicio_evento_capacitacion) > new Date(formData.fecha_fin_evento_capacitacion)) {
        setError('La fecha y hora de inicio no puede ser mayor a la fecha y hora de fin');
        return;
      }
    }

    setLoading(true);
    setError('');
    
    try {
      await createEventoCapacitacion(formData); 
      setSuccess(true);
      setFormData({
        nombre_evento_capacitacion: '',
        descripcion_evento_capacitacion: '',
        fecha_inicio_evento_capacitacion: '',
        fecha_fin_evento_capacitacion: '',
        costo_evento_capacitacion: '',
        observaciones_evento_capacitacion: '',
        archivo_evento_capacitacion: '',
        id_curso: '',
        id_capacitador: ''
      });
    } catch (err) {
      setError('Hubo un error al guardar el evento de capacitación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Registrar Nuevo Evento de Capacitación</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Evento de capacitación guardado exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Evento:</label>
            <input
              type="text"
              name="nombre_evento_capacitacion"
              value={formData.nombre_evento_capacitacion}
              onChange={handleInputChange}
              placeholder="Ingrese el nombre del evento"
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion_evento_capacitacion"
              value={formData.descripcion_evento_capacitacion}
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
              value={formData.fecha_inicio_evento_capacitacion}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Fecha y Hora de Fin:</label>
            <input
              type="datetime-local"
              name="fecha_fin_evento_capacitacion"
              value={formData.fecha_fin_evento_capacitacion}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Costo:</label>
            <input
              type="number"
              step="0.01"
              name="costo_evento_capacitacion"
              value={formData.costo_evento_capacitacion}
              onChange={handleInputChange}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Curso:</label>
            <select
              name="id_curso"
              value={formData.id_curso}
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
              value={formData.id_capacitador}
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
              value={formData.observaciones_evento_capacitacion}
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
              value={formData.archivo_evento_capacitacion}
              onChange={handleInputChange}
              placeholder="Ruta o nombre del archivo"
            />
          </div>

          <div className="button-group">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Guardando...' : 'Guardar Evento de Capacitación'}
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

export default NuevoEventoCapacitacion;