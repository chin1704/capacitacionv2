import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCursoById, updateCurso } from '../services/cursoService';
import { getAllCategoriaCurso } from '../../categoriacurso/services/categoriacursoService';
import { Link } from 'react-router-dom';
import '../css/formulario.css';

const EditarCurso = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllCategoriaCurso()
      .then(res => {
        setCategorias(res.data);
      })
      .catch(err => {
        setError('Error al cargar las categorías');
      });

    getCursoById(id)
      .then(res => {
        setCurso(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar el curso');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    updateCurso(id, curso)
      .then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        setError('Error al actualizar el curso');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) {
    return <div className="loading-container"><div className="loading-spinner"></div><p>Cargando...</p></div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Editar Curso</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Curso actualizado exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Curso:</label>
            <input
              type="text"
              value={curso.nombre_curso}
              onChange={(e) => setCurso({ ...curso, nombre_curso: e.target.value })}
              placeholder="Ingrese el nombre del curso"
            />
          </div>

          <div className="form-group">
            <label>Código del Curso:</label>
            <input
              type="text"
              value={curso.codigo_curso}
              onChange={(e) => setCurso({ ...curso, codigo_curso: e.target.value })}
              placeholder="Ingrese el código del curso"
            />
          </div>

          <div className="form-group">
            <label>Descripción del Curso:</label>
            <input
              type="text"
              value={curso.descripcion_curso}
              onChange={(e) => setCurso({ ...curso, descripcion_curso: e.target.value })}
              placeholder="Ingrese la descripción del curso"
            />
          </div>

          <div className="form-group">
            <label>Categoría del Curso:</label>
            <select 
              value={curso.id_categoria} 
              onChange={(e) => setCurso({ ...curso, id_categoria: e.target.value })} 
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map(categoria => (
                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nombre_categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? 'Guardando cambios...' : 'Editar Curso'}
            </button>

            <Link to="/fcc-curso" className="btn btn-secondary">
              Volver a la lista
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCurso;
