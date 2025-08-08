import React, { useEffect, useState } from 'react';
import { getAllCapacitador, deleteCapacitador } from '../services/capacitadorService';
import { Link } from 'react-router-dom';
import '../css/lista.css'; 

const CapacitadorList = () => {
  const [capacitadores, setCapacitadores] = useState([]);

  const fetchCapacitadores = () => {
    getAllCapacitador()
      .then(res => {
        let dataArray = null;
        
        if (Array.isArray(res.data)) {
          dataArray = res.data;
        } else {
          console.error('Los datos no son un array:', res);
          setCapacitadores([]);
        }
        
        if (dataArray) {
          setCapacitadores(dataArray);
        }
      })
      .catch(err => {
        console.error('Error al obtener capacitadores:', err);
        setCapacitadores([]);
      });
  };

  useEffect(() => {
    fetchCapacitadores();
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este capacitador?')) {
      deleteCapacitador(id)
        .then(() => fetchCapacitadores())
        .catch(err => console.error('Error al eliminar el capacitador:', err));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Gestión de Capacitadores</h2>
        <Link to="/fcc-capacitador/nuevo" className="btn btn-primary">
          + Nuevo Capacitador
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Tipo Capacitador</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {capacitadores.map(c => (
              <tr key={c.id_capacitador}>
                <td>{c.nombre_capacitador}</td>
                <td>{c.apellido_capacitador}</td>
                <td>{c.id_tipo_capacitador}</td>
                <td>
                  <div className="action-btns">
                    <Link to={`/fcc-capacitador/editar/${c.id_capacitador}`} className="btn btn-editar">
                      Editar
                    </Link>

                    <button onClick={() => handleDelete(c.id_capacitador)} className="btn btn-eliminar">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {capacitadores.length === 0 && (
          <div className="no-items">No hay capacitadores registrados</div>
        )}
      </div>
    </div>
  );
};

export default CapacitadorList;
