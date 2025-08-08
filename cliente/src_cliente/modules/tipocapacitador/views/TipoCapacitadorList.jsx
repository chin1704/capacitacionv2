import React, { useEffect, useState } from 'react';
import { getAllTipoCapacitador, deleteTipoCapacitador } from '../services/tipocapacitadorService';
import { Link } from 'react-router-dom';
import '../css/lista.css'; 

const TipoCapacitadorList = () => {
  const [tiposCapacitador, setTiposCapacitador] = useState([]);

  const fetchTiposCapacitador = () => {
    getAllTipoCapacitador()
      .then(res => {
        let dataArray = null;
        
        if (Array.isArray(res.data)) {
          dataArray = res.data;
        } else {
          setTiposCapacitador([]);
        }
        
        if (dataArray) {
          setTiposCapacitador(dataArray);
        }
      })
      .catch(err => {
        setTiposCapacitador([]);
      });
  };

  useEffect(() => {
    fetchTiposCapacitador();
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este tipo de capacitador?')) {
      deleteTipoCapacitador(id)
        .then(() => fetchTiposCapacitador())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Gestión de Tipos de Capacitador</h2>
        <Link to="/fcc-tipocapacitador/nuevo" className="btn btn-primary">
          + Nuevo Tipo de Capacitador
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tiposCapacitador.map(c => (
              <tr key={c.id_tipo_capacitador}>
                <td>{c.descripcion_tipo_capacitador}</td>
                <td>
                  <div className="action-btns">
                    <Link to={`/fcc-tipocapacitador/editar/${c.id_tipo_capacitador}`} className="btn btn-editar">
                      Editar
                    </Link>

                    <button onClick={() => handleDelete(c.id_tipo_capacitador)} className="btn btn-eliminar">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {tiposCapacitador.length === 0 && (
          <div className="no-items">No hay tipos de capacitador registrados</div>
        )}
      </div>
    </div>
  );
};

export default TipoCapacitadorList;