import React, { useEffect, useState } from 'react';
import { getAllEventoCapacitacion, deleteEventoCapacitacion } from '../services/eventoCapacitacionSerice';
import { Link } from 'react-router-dom';
import '../css/lista.css'; 

const EventoCapacitacionList = () => {
  const [eventosCapacitacion, setEventosCapacitacion] = useState([]);

  const fetchEventosCapacitacion = () => {
    getAllEventoCapacitacion()
      .then(res => {
        let dataArray = null;
        
        if (Array.isArray(res.data)) {
          dataArray = res.data;
        } else {
          setEventosCapacitacion([]);
        }
        
        if (dataArray) {
          setEventosCapacitacion(dataArray);
        }
      })
      .catch(err => {
        setEventosCapacitacion([]);
      });
  };

  useEffect(() => {
    fetchEventosCapacitacion();
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este evento de capacitación?')) {
      deleteEventoCapacitacion(id)
        .then(() => fetchEventosCapacitacion())
        .catch(err => console.error(err));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    return dateString.replace('T', ' ').replace('.000Z', '');
  };


  return (
    <div className="container">
      <div className="header">
        <h2>Gestión de Eventos de Capacitación</h2>
        <Link to="/fcc-evento_capacitacion/nuevo" className="btn btn-primary">
          + Nuevo Evento de Capacitación
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre del Evento</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventosCapacitacion.map(evento => (
              <tr key={evento.id_evento_capacitacion}>
                <td>{evento.nombre_evento_capacitacion}</td>
                <td>{evento.descripcion_evento_capacitacion}</td>
                <td>{formatDate(evento.fecha_inicio_evento_capacitacion)}</td>
                <td>{formatDate(evento.fecha_fin_evento_capacitacion)}</td>
                <td>${evento.costo_evento_capacitacion}</td>
                <td>
                  <div className="action-btns">
                    <Link to={`/fcc-evento_capacitacion/editar/${evento.id_evento_capacitacion}`} className="btn btn-editar">
                      Editar
                    </Link>

                    <button onClick={() => handleDelete(evento.id_evento_capacitacion)} className="btn btn-eliminar">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {eventosCapacitacion.length === 0 && (
          <div className="no-items">No hay eventos de capacitación registrados</div>
        )}
      </div>
    </div>
  );
};

export default EventoCapacitacionList;