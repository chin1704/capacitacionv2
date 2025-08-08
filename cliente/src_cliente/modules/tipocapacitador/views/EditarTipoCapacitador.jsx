import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTipoCapacitadorById, updateTipoCapacitador } from '../services/tipocapacitadorService';
import '../css/formulario.css'; 
import { Link } from 'react-router-dom'; 

const EditarTipoCapacitador = () => {
  const { id } = useParams();
  const [tipoCapacitador, setTipoCapacitador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getTipoCapacitadorById(id)
      .then(res => {
        setTipoCapacitador(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar el tipo de capacitador');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    updateTipoCapacitador(id, tipoCapacitador)
      .then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        setError('Error al actualizar el tipo de capacitador');
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
        <h2>Editar Tipo de Capacitador</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Tipo de capacitador actualizado exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descripción del Tipo de Capacitador:</label>
            <input
              type="text"
              value={tipoCapacitador.descripcion_tipo_capacitador || ''}
              onChange={(e) => setTipoCapacitador({ ...tipoCapacitador, descripcion_tipo_capacitador: e.target.value })}
              required
              placeholder="Ingrese la descripción del tipo de capacitador"
            />
          </div>
          
          <div className="button-group">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? 'Guardando cambios...' : 'Editar Cambios'}
            </button>
          
            <Link to="/fcc-tipocapacitador" className="btn btn-secondary">
              Volver a la lista
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarTipoCapacitador;
