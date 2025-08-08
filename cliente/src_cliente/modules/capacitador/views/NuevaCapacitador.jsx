import React, { useState, useEffect } from 'react';
import { createCapacitador } from '../services/capacitadorService';
import { getAllTipoCapacitador } from '../../tipocapacitador/services/tipocapacitadorService';
import { Link } from 'react-router-dom';
import '../css/formulario.css';

const NuevoCapacitador = () => {
  const [nombreCapacitador, setNombreCapacitador] = useState('');
  const [apellidoCapacitador, setApellidoCapacitador] = useState('');
  const [idTipoCapacitador, setIdTipoCapacitador] = useState('');
  const [tiposCapacitador, setTiposCapacitador] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllTipoCapacitador()
      .then((res) => {
        setTiposCapacitador(res.data);
      })
      .catch((err) => {
        setError('Error al cargar los tipos de capacitador');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreCapacitador || !apellidoCapacitador || !idTipoCapacitador) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    setError('');

    const newCapacitador = {
      nombre_capacitador: nombreCapacitador,
      apellido_capacitador: apellidoCapacitador,
      id_tipo_capacitador: idTipoCapacitador,
    };

    try {
      await createCapacitador(newCapacitador);
      setSuccess(true);
      setNombreCapacitador('');
      setApellidoCapacitador('');
      setIdTipoCapacitador('');
    } catch (err) {
      setError('Hubo un error al guardar el capacitador');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Registrar Nuevo Capacitador</h2>
      </div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">Capacitador guardado exitosamente</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Capacitador:</label>
            <input
              type="text"
              value={nombreCapacitador}
              onChange={(e) => setNombreCapacitador(e.target.value)}
              placeholder="Ingrese el nombre del capacitador"
            />
          </div>

          <div className="form-group">
            <label>Apellido del Capacitador:</label>
            <input
              type="text"
              value={apellidoCapacitador}
              onChange={(e) => setApellidoCapacitador(e.target.value)}
              placeholder="Ingrese el apellido del capacitador"
            />
          </div>

          <div className="form-group">
            <label>Tipo de Capacitador:</label>
            <select
              value={idTipoCapacitador}
              onChange={(e) => setIdTipoCapacitador(e.target.value)}
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
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Guardando...' : 'Guardar Capacitador'}
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

export default NuevoCapacitador;
