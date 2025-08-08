import React, { useState, useEffect } from 'react';
import { createCurso } from '../services/cursoService';
import { getAllCategoriaCurso } from '../../categoriacurso/services/categoriacursoService';
import { Link } from 'react-router-dom';
import '../css/formulario.css';

const NuevoCurso = () => {
  const [nombreCurso, setNombreCurso] = useState('');
  const [codigoCurso, setCodigoCurso] = useState('');
  const [descripcionCurso, setDescripcionCurso] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cargar categorías cuando el componente se monte
    getAllCategoriaCurso()
      .then(res => {
        setCategorias(res.data);
      })
      .catch(err => {
        setError('Error al cargar las categorías');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreCurso || !codigoCurso || !descripcionCurso || !idCategoria) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    setError('');
    
    const newCurso = { 
      nombre_curso: nombreCurso,
      codigo_curso: codigoCurso,
      descripcion_curso: descripcionCurso,
      id_categoria: idCategoria
    };
    
    try {
      await createCurso(newCurso); 
      setSuccess(true);
      setNombreCurso('');
      setCodigoCurso('');
      setDescripcionCurso('');
      setIdCategoria('');
    } catch (err) {
      setError('Hubo un error al guardar el curso');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Registrar Nuevo Curso</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Curso guardado exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Curso:</label>
            <input
              type="text"
              value={nombreCurso}
              onChange={(e) => setNombreCurso(e.target.value)}
              placeholder="Ingrese el nombre del curso"
            />
          </div>

          <div className="form-group">
            <label>Código del Curso:</label>
            <input
              type="text"
              value={codigoCurso}
              onChange={(e) => setCodigoCurso(e.target.value)}
              placeholder="Ingrese el código del curso"
            />
          </div>

          <div className="form-group">
            <label>Descripción del Curso:</label>
            <input
              type="text"
              value={descripcionCurso}
              onChange={(e) => setDescripcionCurso(e.target.value)}
              placeholder="Ingrese la descripción del curso"
            />
          </div>

          <div className="form-group">
            <label>Categoría del Curso:</label>
            <select 
              value={idCategoria} 
              onChange={(e) => setIdCategoria(e.target.value)} 
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
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Guardando...' : 'Guardar Curso'}
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

export default NuevoCurso;
