import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCapacitacionById, updateCapacitacion } from '../services/capacitacionService';

const EditarCapacitacion = () => {
  const { id } = useParams();
  const [capacitacion, setCapacitacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCapacitacionById(id)
      .then(res => {
        let data = null;
        
        if (res.data && res.data.data) {
          data = res.data.data;
        } else if (res.data) {
          data = res.data;
        } else {
          data = res;
        }
        
        if (Array.isArray(data) && data.length > 0) {
          data = data[0];
        }
        
        const capacitacionData = {
          id_capacitacion: data?.id_capacitacion || '',
          tema: data?.tema || '',
          lugar: data?.lugar || '',
          fecha: data?.fecha || ''
        };
        
        setCapacitacion(capacitacionData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener capacitación:', err);
        setError('Error al cargar la capacitación');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    updateCapacitacion(id, capacitacion)
      .then(res => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        console.error('Error al actualizar capacitación:', err);
        setError('Error al actualizar la capacitación');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return '';
    }
  };

  if (loading) {
    return (
      <div style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '40px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666', fontSize: '16px' }}>Cargando capacitación...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!capacitacion || error) {
    return (
      <div style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #f5c6cb',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Error</h3>
          <p style={{ margin: 0 }}>
            {error || 'No se pudo cargar la capacitación'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
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
          Editar Capacitación
        </h2>
      </div>

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
          Capacitación actualizada exitosamente
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '30px'
      }}>
        <form onSubmit={handleSubmit}>
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
              value={capacitacion.tema || ''}
              onChange={(e) => setCapacitacion({ ...capacitacion, tema: e.target.value })}
              required
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
              value={capacitacion.lugar || ''}
              onChange={(e) => setCapacitacion({ ...capacitacion, lugar: e.target.value })}
              required
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
              value={formatDateForInput(capacitacion.fecha)}
              onChange={(e) => setCapacitacion({ ...capacitacion, fecha: e.target.value })}
              required
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
            disabled={saving}
            style={{
              width: '100%',
              backgroundColor: saving ? '#6c757d' : '#007bff',
              color: 'white',
              padding: '14px 20px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              if (!saving) e.target.style.backgroundColor = '#0056b3';
            }}
            onMouseOut={(e) => {
              if (!saving) e.target.style.backgroundColor = '#007bff';
            }}
          >
            {saving ? (
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
                Guardando cambios...
              </span>
            ) : (
              'Guardar Cambios'
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

export default EditarCapacitacion;