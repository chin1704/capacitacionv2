import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCabeceraById, updateCabecera } from '../services/cabeceraService';
import { getAllEventoCapacitacion} from '../../evento_capacitacion/services/eventoCapacitacionSerice';
import '../css/formulario.css'; 
import { Link } from 'react-router-dom'; 

const EditarCabecera = () => {
  const { id } = useParams();
  const [cabecera, setCabecera] = useState(null);
  const [eventosCapacitacion, setEventosCapacitacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      getCabeceraById(id),
      getAllEventoCapacitacion()
    ])
      .then(([cabeceraRes, eventosRes]) => {
        setCabecera(cabeceraRes.data);
        if (Array.isArray(eventosRes.data)) {
          setEventosCapacitacion(eventosRes.data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los datos');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cabecera.descripcion_cabecera || !cabecera.fecha_cabecera || !cabecera.id_evento_capacitacion) {
      setError('La descripción, fecha y evento de capacitación son obligatorios');
      return;
    }
    
    setSaving(true);
    setError('');
    
    updateCabecera(id, cabecera)
      .then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        setError('Error al actualizar la cabecera');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  if (loading) {
    return <div className="loading-container"><div className="loading-spinner"></div><p>Cargando...</p></div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Editar Cabecera</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Cabecera actualizada exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descripción de la Cabecera:</label>
            <input
              type="text"
              value={cabecera.descripcion_cabecera || ''}
              onChange={(e) => setCabecera({ ...cabecera, descripcion_cabecera: e.target.value })}
              required
              placeholder="Ingrese la descripción de la cabecera"
            />
          </div>

          <div className="form-group">
            <label>Fecha de la Cabecera:</label>
            <input
              type="date"
              value={formatDateForInput(cabecera.fecha_cabecera)}
              onChange={(e) => setCabecera({ ...cabecera, fecha_cabecera: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Archivo de la Cabecera:</label>
            <input
              type="text"
              value={cabecera.archivo_cabecera || ''}
              onChange={(e) => setCabecera({ ...cabecera, archivo_cabecera: e.target.value })}
              placeholder="Ingrese el nombre del archivo (opcional)"
            />
          </div>

          <div className="form-group">
            <label>Evento de Capacitación:</label>
            <select
              value={cabecera.id_evento_capacitacion || ''}
              onChange={(e) => setCabecera({ ...cabecera, id_evento_capacitacion: e.target.value })}
              required
            >
              <option value="">Seleccione un evento de capacitación</option>
              {eventosCapacitacion.map(evento => (
                <option key={evento.id_evento_capacitacion} value={evento.id_evento_capacitacion}>
                  {evento.descripcion_evento_capacitacion || evento.nombre_evento || `Evento ${evento.id_evento_capacitacion}`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="button-group">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? 'Guardando cambios...' : 'Editar Cambios'}
            </button>
          
            <Link to="/fcc-cabecera" className="btn btn-secondary">
              Volver a la lista
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCabecera;