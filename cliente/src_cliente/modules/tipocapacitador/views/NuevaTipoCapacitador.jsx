import React, { useState } from 'react';
import { createTipoCapacitador } from '../services/tipocapacitadorService';
import { Link } from 'react-router-dom'; 
import '../css/formulario.css'; 

const NuevoTipoCapacitador = () => {
  const [descripcionTipoCapacitador, setDescripcionTipoCapacitador] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descripcionTipoCapacitador) {
      setError('La descripción es obligatoria');
      return;
    }
    setLoading(true);
    setError('');
    
    const newTipoCapacitador = { descripcion_tipo_capacitador: descripcionTipoCapacitador };
    
    try {
      await createTipoCapacitador(newTipoCapacitador); 
      setSuccess(true);
      setDescripcionTipoCapacitador('');
    } catch (err) {
      setError('Hubo un error al guardar el tipo de capacitador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Registrar Nuevo Tipo de Capacitador</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Tipo de capacitador guardado exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descripción del Tipo de Capacitador:</label>
            <input
              type="text"
              value={descripcionTipoCapacitador}
              onChange={(e) => setDescripcionTipoCapacitador(e.target.value)}
              placeholder="Ingrese la descripción del tipo de capacitador"
            />
          </div>

          <div className="button-group">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Guardando...' : 'Guardar Tipo de Capacitador'}
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

export default NuevoTipoCapacitador;

