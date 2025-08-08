import React, { useState, useEffect } from 'react';
import { createCabecera } from '../services/cabeceraService';
import { getAllEventoCapacitacion} from '../../evento_capacitacion/services/eventoCapacitacionSerice';
import { Link } from 'react-router-dom'; 
import '../css/formulario.css'; 

const NuevaCabecera = () => {
  const [descripcionCabecera, setDescripcionCabecera] = useState('');
  const [fechaCabecera, setFechaCabecera] = useState('');
  const [archivoCabecera, setArchivoCabecera] = useState('');
  const [idEventoCapacitacion, setIdEventoCapacitacion] = useState('');
  const [eventosCapacitacion, setEventosCapacitacion] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllEventoCapacitacion()
      .then(res => {
        if (Array.isArray(res.data)) {
          setEventosCapacitacion(res.data);
        }
      })
      .catch(err => {
        console.error('Error al cargar eventos de capacitación:', err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descripcionCabecera || !fechaCabecera || !idEventoCapacitacion) {
      setError('La descripción, fecha y evento de capacitación son obligatorios');
      return;
    }
    setLoading(true);
    setError('');
    
    const newCabecera = { 
      descripcion_cabecera: descripcionCabecera,
      fecha_cabecera: fechaCabecera,
      archivo_cabecera: archivoCabecera,
      id_evento_capacitacion: idEventoCapacitacion
    };
    
    try {
      await createCabecera(newCabecera); 
      setSuccess(true);
      setDescripcionCabecera('');
      setFechaCabecera('');
      setArchivoCabecera('');
      setIdEventoCapacitacion('');
    } catch (err) {
      setError('Hubo un error al guardar la cabecera');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Registrar Nueva Cabecera</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Cabecera guardada exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descripción de la Cabecera:</label>
            <input
              type="text"
              value={descripcionCabecera}
              onChange={(e) => setDescripcionCabecera(e.target.value)}
              placeholder="Ingrese la descripción de la cabecera"
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha de la Cabecera:</label>
            <input
              type="date"
              value={fechaCabecera}
              onChange={(e) => setFechaCabecera(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Archivo de la Cabecera:</label>
            <input
              type="text"
              value={archivoCabecera}
              onChange={(e) => setArchivoCabecera(e.target.value)}
              placeholder="Ingrese el nombre del archivo (opcional)"
            />
          </div>

          <div className="form-group">
            <label>Evento de Capacitación:</label>
            <select
              value={idEventoCapacitacion}
              onChange={(e) => setIdEventoCapacitacion(e.target.value)}
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
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Guardando...' : 'Guardar Cabecera'}
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

export default NuevaCabecera;