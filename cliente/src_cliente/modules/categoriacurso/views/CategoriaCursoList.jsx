import React, { useEffect, useState } from 'react';
import { getAllCategoriaCurso, deleteCategoriaCurso } from '../services/categoriacursoService';
import { Link } from 'react-router-dom';
import '../css/lista.css'; 

const CategoriaCursoList = () => {
  const [categoriaCursos, setCategoriaCursos] = useState([]);

  const fetchCategoriaCursos = () => {
    getAllCategoriaCurso()
      .then(res => {
        console.log('Respuesta completa:', res);
        
        let dataArray = null;
        
        if (Array.isArray(res.data)) {
          dataArray = res.data;
        } else {
          console.error('Los datos no son un array:', res);
          setCategoriaCursos([]);
        }
        
        if (dataArray) {
          setCategoriaCursos(dataArray);
        }
      })
      .catch(err => {
        console.error('Error al obtener categorías de curso:', err);
        setCategoriaCursos([]);
      });
  };

  useEffect(() => {
    fetchCategoriaCursos();
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría de curso?')) {
      deleteCategoriaCurso(id)
        .then(() => fetchCategoriaCursos())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Gestión de Catergorías</h2>
        <Link to="/fcc-categoriacurso/nueva" className="btn btn-primary">
          + Nueva Categoría
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nivel</th>
              <th>Padre categoria</th>
              <th>Estado</th>
              <th>Código</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categoriaCursos.map(c => (
              <tr key={c.id_categoria}>
                <td>{c.nombre_categoria}</td>
                <td>{c.nivel_categoria}</td>
                <td>{c.padre_categoria}</td>
                <td>{c.estado_categoria}</td>
                <td>{c.codigo_categoria}</td>
                <td>
                  <div className="action-btns">
                    <Link to={`/fcc-categoriacurso/editar/${c.id_categoria}`} className="btn btn-editar">
                      Editar
                    </Link>

                    <button onClick={() => handleDelete(c.id_categoria)} className="btn btn-eliminar">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {categoriaCursos.length === 0 && (
          <div className="no-items">No hay categorias registrados</div>
        )}
      </div>
    </div>
  );
};

export default CategoriaCursoList;
