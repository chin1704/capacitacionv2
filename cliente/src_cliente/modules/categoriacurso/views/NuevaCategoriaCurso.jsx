import React, { useState } from 'react';
import { createCategoriaCurso } from '../services/categoriacursoService';
import { Link } from 'react-router-dom'; 
import '../css/formulario.css'; 

const NuevaCategoriaCurso = () => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [nivelCategoria, setNivelCategoria] = useState('');
  const [padreCategoria, setPadreCategoria] = useState('');
  const [estadoCategoria, setEstadoCategoria] = useState('activo');
  const [codigoCategoria, setCodigoCategoria] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreCategoria || !nivelCategoria || !codigoCategoria) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    setError('');
    
    const newCategoriaCurso = {
      nombre_categoria: nombreCategoria,
      nivel_categoria: nivelCategoria,
      padre_categoria: padreCategoria,
      estado_categoria: estadoCategoria,
      codigo_categoria: codigoCategoria,
    };
    
    try {
      await createCategoriaCurso(newCategoriaCurso); 
      setSuccess(true);  
      setNombreCategoria('');
      setNivelCategoria('');
      setPadreCategoria('');
      setEstadoCategoria('activo');
      setCodigoCategoria('');
    } catch (err) {
      setError('Hubo un error al guardar la categoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Registrar Nueva Categoría de Curso</h2>
      </div>

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert success">
          Categoría guardada exitosamente
        </div>
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de la Categoría:</label>
            <input
              type="text"
              name="nombre_categoria"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              placeholder="Ingrese el nombre de la categoría"
            />
          </div>

          <div className="form-group">
            <label>Nivel de la Categoría:</label>
            <input
              type="number"
              name="nivel_categoria"
              value={nivelCategoria}
              onChange={(e) => setNivelCategoria(e.target.value)}
              placeholder="Ingrese el nivel de la categoría"
            />
          </div>

          <div className="form-group">
            <label>Padre de la Categoría:</label>
            <input
              type="text"
              name="padre_categoria"
              value={padreCategoria}
              onChange={(e) => setPadreCategoria(e.target.value)}
              placeholder="Ingrese el padre de la categoría (opcional)"
            />
          </div>

          <div className="form-group">
            <label>Estado de la Categoría:</label>
            <select
              name="estado_categoria"
              value={estadoCategoria}
              onChange={(e) => setEstadoCategoria(e.target.value)}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="form-group">
            <label>Código de la Categoría:</label>
            <input
              type="text"
              name="codigo_categoria"
              value={codigoCategoria}
              onChange={(e) => setCodigoCategoria(e.target.value)}
              placeholder="Ingrese el código de la categoría"
            />
          </div>

          <div className="button-group">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Guardando...' : 'Guardar Categoría'}
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

export default NuevaCategoriaCurso;
