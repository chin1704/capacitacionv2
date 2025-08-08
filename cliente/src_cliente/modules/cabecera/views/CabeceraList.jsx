import React, { useEffect, useState } from 'react';
import { getAllCabecera, deleteCabecera } from '../services/cabeceraService';
import { Link } from 'react-router-dom';
import '../css/lista.css'; 

const CabeceraList = () => {
  const [cabeceras, setCabeceras] = useState([]);

  const fetchCabeceras = () => {
    getAllCabecera()
      .then(res => {
        let dataArray = null;
        
        if (Array.isArray(res.data)) {
          dataArray = res.data;
        } else {
          setCabeceras([]);
        }
        
        if (dataArray) {
          setCabeceras(dataArray);
        }
      })
      .catch(err => {
        setCabeceras([]);
      });
  };

  useEffect(() => {
    fetchCabeceras();
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta cabecera?')) {
      deleteCabecera(id)
        .then(() => fetchCabeceras())
        .catch(err => console.error(err));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Gestión de Cabeceras</h2>
        <Link to="/fcc-cabecera/nuevo" className="btn btn-primary">
          + Nueva Cabecera
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Archivo</th>
              <th>ID Evento Capacitación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cabeceras.map(c => (
              <tr key={c.id_cabecera}>
                <td>{c.descripcion_cabecera}</td>
                <td>{formatDate(c.fecha_cabecera)}</td>
                <td>{c.archivo_cabecera || 'Sin archivo'}</td>
                <td>{c.id_evento_capacitacion}</td>
                <td>
                  <div className="action-btns">
                    <Link to={`/fcc-cabecera/editar/${c.id_cabecera}`} className="btn btn-editar">
                      Editar
                    </Link>

                    <button onClick={() => handleDelete(c.id_cabecera)} className="btn btn-eliminar">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {cabeceras.length === 0 && (
          <div className="no-items">No hay cabeceras registradas</div>
        )}
      </div>
    </div>
  );
};

export default CabeceraList;