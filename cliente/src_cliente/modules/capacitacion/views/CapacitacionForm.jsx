import React, { useState } from 'react';
import { createCapacitacion } from '../services/capacitacionService';
import { useNavigate } from 'react-router-dom';

const CapacitacionForm = () => {
  const [form, setForm] = useState({ nombre: '', descripcion: '', fecha: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createCapacitacion(form)
      .then(() => navigate('/fcc-capacitaciones'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva Capacitación</h2>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
      <input type="date" name="fecha" onChange={handleChange} required />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default CapacitacionForm;
