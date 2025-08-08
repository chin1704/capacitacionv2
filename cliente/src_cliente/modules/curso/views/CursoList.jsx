import React, { useEffect, useState } from 'react';
import { getAllCurso, deleteCurso } from '../services/cursoService'; 
import { Link } from 'react-router-dom';
import '../css/lista.css'; 

const CursoList = () => {
  const [cursos, setCursos] = useState([]);

  const fetchCursos = () => {
    getAllCurso()
      .then(res => {
        let dataArray = null;

        if (Array.isArray(res.data)) {
          dataArray = res.data;
        } else {
          setCursos([]);
        }

        if (dataArray) {
          setCursos(dataArray);
        }
      })
      .catch(err => {
        setCursos([]);
      });
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este curso?')) {
      deleteCurso(id)
        .then(() => fetchCursos())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Gestión de Cursos</h2>
        <Link to="/fcc-curso/nuevo" className="btn btn-primary">
          + Nuevo Curso
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map(curso => (
              <tr key={curso.id_curso}>
                <td>{curso.nombre_curso}</td>
                <td>{curso.codigo_curso}</td>
                <td>{curso.descripcion_curso}</td>
                <td>{curso.id_categoria}</td>
                <td>
                  <div className="action-btns">
                    <Link to={`/fcc-curso/editar/${curso.id_curso}`} className="btn btn-editar">
                      Editar
                    </Link>

                    <button onClick={() => handleDelete(curso.id_curso)} className="btn btn-eliminar">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cursos.length === 0 && (
          <div className="no-items">No hay cursos registrados</div>
        )}
      </div>
    </div>
  );
};

export default CursoList;
