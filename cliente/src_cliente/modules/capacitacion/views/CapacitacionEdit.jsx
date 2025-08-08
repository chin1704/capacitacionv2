import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCapacitacionById, updateCapacitacion } from '../services/capacitacionService';

const CapacitacionEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ nombre: '', descripcion: '', fecha: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getCapacitacionById(id)
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateCapacitacion(id, form)
      .then(() => navigate('/fcc-capacitaciones'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Capacitación</h2>
      <input name="nombre" value={form.nombre} onChange={handleChange} required />
      <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />
      <input type="date" name="fecha" value={form.fecha?.substring(0, 10)} onChange={handleChange} required />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default CapacitacionEdit;
