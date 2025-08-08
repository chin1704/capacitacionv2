import React, { useState } from 'react';
import { createCapacitacion } from '../services/capacitacionService';

const NuevaCapacitacion = () => {
  const [tema, setTema] = useState('');
  const [lugar, setLugar] = useState('');
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tema || !lugar || !fecha) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    setError('');
    
    const newCapacitacion = {
      tema,
      fecha,
      lugar
    };
    try {
      await createCapacitacion(newCapacitacion); 
      setSuccess(true);  
      setTema('');
      setLugar('');
      setFecha('');
    } catch (err) {
      setError('Hubo un error al guardar la capacitación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e0e0e0'
      }}>
        <h2 style={{
          margin: 0,
          color: '#333',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          Registrar Nueva Capacitación
        </h2>
      </div>

      {/* Alert Messages */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '1px solid #f5c6cb',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '12px 16px',
          borderRadius: '6px',
          border: '1px solid #c3e6cb',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          Capacitación guardada exitosamente
        </div>
      )}

      {/* Form Container */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '30px'
      }}>
        <form onSubmit={handleSubmit}>
          {/* Tema Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>
              Tema:
            </label>
            <input
              type="text"
              name="tema"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="Ingrese el tema de la capacitación"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>
              Lugar:
            </label>
            <input
              type="text"
              name="lugar"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="Ingrese el lugar de la capacitación"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>
              Fecha y Hora:
            </label>
            <input
              type="datetime-local"
              name="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#007bff'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: 'white',
              padding: '14px 20px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = '#218838';
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.backgroundColor = '#28a745';
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  marginRight: '8px',
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></span>
                Guardando...
              </span>
            ) : (
              'Guardar Capacitación'
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default NuevaCapacitacion;