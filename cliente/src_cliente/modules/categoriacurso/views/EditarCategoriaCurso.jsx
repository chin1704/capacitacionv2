import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoriaCursoById, updateCategoriaCurso } from '../services/categoriacursoService';
import '../css/formulario.css'; 
import { Link } from 'react-router-dom'; 

const EditarCategoriaCurso = () => {
  const { id } = useParams();
  const [categoriaCurso, setCategoriaCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategoriaCursoById(id)
      .then(res => {
        const data = res.data ? res.data : res;
        setCategoriaCurso(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener categoría de curso:', err);
        setError('Error al cargar la categoría de curso');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    updateCategoriaCurso(id, categoriaCurso)
      .then(res => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        console.error('Error al actualizar la categoría de curso:', err);
        setError('Error al actualizar la categoría de curso');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando categoría...</p>
      </div>
    );
  }

  if (!categoriaCurso || error) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error || 'No se pudo cargar la categoría de curso'}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Editar Categoría de Curso</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Categoría de curso actualizada exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de la Categoría:</label>
            <input
              type="text"
              value={categoriaCurso.nombre_categoria || ''}
              onChange={(e) => setCategoriaCurso({ ...categoriaCurso, nombre_categoria: e.target.value })}
              required
              placeholder="Ingrese el nombre de la categoría"
            />
          </div>

          <div className="form-group">
            <label>Nivel de la Categoría:</label>
            <input
              type="number"
              value={categoriaCurso.nivel_categoria || ''}
              onChange={(e) => setCategoriaCurso({ ...categoriaCurso, nivel_categoria: e.target.value })}
              required
              placeholder="Ingrese el nivel de la categoría"
            />
          </div>

          <div className="form-group">
            <label>Padre de la Categoría:</label>
            <input
              type="text"
              value={categoriaCurso.padre_categoria || ''}
              onChange={(e) => setCategoriaCurso({ ...categoriaCurso, padre_categoria: e.target.value })}
              placeholder="Ingrese el padre de la categoría (opcional)"
            />
          </div>

          <div className="form-group">
            <label>Estado de la Categoría:</label>
            <select
              value={categoriaCurso.estado_categoria || 'activo'}
              onChange={(e) => setCategoriaCurso({ ...categoriaCurso, estado_categoria: e.target.value })}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="form-group">
            <label>Código de la Categoría:</label>
            <input
              type="text"
              value={categoriaCurso.codigo_categoria || ''}
              onChange={(e) => setCategoriaCurso({ ...categoriaCurso, codigo_categoria: e.target.value })}
              required
              placeholder="Ingrese el código de la categoría"
            />
          </div>
          
          <div className="button-group">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {saving ? 'Guardando cambios...' : 'Editar Cambios'}
            </button>
          
            <Link to="/fcc-categoriacurso" className="btn btn-secondary">
              Volver a la lista
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCategoriaCurso;
