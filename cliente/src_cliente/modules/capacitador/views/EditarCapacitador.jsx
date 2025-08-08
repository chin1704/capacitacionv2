import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCapacitadorById, updateCapacitador } from '../services/capacitadorService';
import { getAllTipoCapacitador } from '../../tipocapacitador/services/tipocapacitadorService';
import { Link } from 'react-router-dom';
import '../css/formulario.css';

const EditarCapacitador = () => {
  const { id } = useParams();
  const [capacitador, setCapacitador] = useState(null);
  const [tiposCapacitador, setTiposCapacitador] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCapacitadorById(id)
      .then((res) => {
        setCapacitador(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error al cargar el capacitador');
        setLoading(false);
      });

    getAllTipoCapacitador()
      .then((res) => {
        setTiposCapacitador(res.data);
      })
      .catch((err) => {
        setError('Error al cargar los tipos de capacitador');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    updateCapacitador(id, capacitador)
      .then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch((err) => {
        setError('Error al actualizar el capacitador');
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
        <h2>Editar Capacitador</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Capacitador actualizado exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Capacitador:</label>
            <input
              type="text"
              value={capacitador.nombre_capacitador}
              onChange={(e) => setCapacitador({ ...capacitador, nombre_capacitador: e.target.value })}
              placeholder="Ingrese el nombre del capacitador"
            />
          </div>

          <div className="form-group">
            <label>Apellido del Capacitador:</label>
            <input
              type="text"
              value={capacitador.apellido_capacitador}
              onChange={(e) => setCapacitador({ ...capacitador, apellido_capacitador: e.target.value })}
              placeholder="Ingrese el apellido del capacitador"
            />
          </div>

          <div className="form-group">
            <label>Tipo de Capacitador:</label>
            <select
              value={capacitador.id_tipo_capacitador}
              onChange={(e) => setCapacitador({ ...capacitador, id_tipo_capacitador: e.target.value })}
              required
            >
              <option value="">Seleccione un tipo de capacitador</option>
              {tiposCapacitador.map((tipo) => (
                <option key={tipo.id_tipo_capacitador} value={tipo.id_tipo_capacitador}>
                  {tipo.descripcion_tipo_capacitador}
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? 'Guardando cambios...' : 'Editar Cambios'}
            </button>

            <Link to="/fcc-capacitador" className="btn btn-secondary">
              Volver a la lista
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCapacitador;
