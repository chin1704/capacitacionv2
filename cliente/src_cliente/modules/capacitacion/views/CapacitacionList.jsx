import React, { useEffect, useState } from 'react';
import { getAllCapacitaciones, deleteCapacitacion } from '../services/capacitacionService';
import { Link } from 'react-router-dom';

const CapacitacionList = () => {
  const [capacitaciones, setCapacitaciones] = useState([]);
  
  const fetchCapacitaciones = () => {
    getAllCapacitaciones()
      .then(res => {
        console.log('Respuesta completa:', res);
        
        let dataArray = null;
        
        if (Array.isArray(res)) {
          dataArray = res;
        } else if (res.data && Array.isArray(res.data)) {
          dataArray = res.data;
        } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
          dataArray = res.data.data;
        }
        
        if (dataArray) {
          setCapacitaciones(dataArray);
        } else {
          console.error('Los datos no son un array:', res);
          setCapacitaciones([]);
        }
      })
      .catch(err => {
        console.error('Error al obtener capacitaciones:', err);
        setCapacitaciones([]);
      });
  };
  
  useEffect(() => {
    fetchCapacitaciones();
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta capacitación?')) {
      deleteCapacitacion(id)
        .then(() => fetchCapacitaciones())
        .catch(err => console.error(err));
    }
  };
  
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
          Gestión de Capacitaciones
        </h2>
        <Link 
          to="/fcc-capacitaciones/nueva"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
        >
          + Nueva Capacitación
        </Link>
      </div>

      {/* Table Container */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #dee2e6'
            }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                fontSize: '15px'
              }}>Tema</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                fontSize: '15px'
              }}>Fecha</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#495057',
                fontSize: '15px'
              }}>Lugar</th>
              <th style={{
                padding: '16px',
                textAlign: 'center',
                fontWeight: '600',
                color: '#495057',
                fontSize: '15px'
              }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {capacitaciones.map(c => (
              <tr key={c.id_capacitacion} style={{
                borderBottom: '1px solid #dee2e6',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={{
                  padding: '16px',
                  color: '#333',
                  fontWeight: '500'
                }}>{c.tema}</td>
                <td style={{
                  padding: '16px',
                  color: '#666'
                }}>{new Date(c.fecha).toLocaleDateString()}</td>
                <td style={{
                  padding: '16px',
                  color: '#666'
                }}>{c.lugar}</td>
                <td style={{
                  padding: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Link 
                      to={`/fcc-capacitaciones/editar/${c.id_capacitacion}`}
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '6px 12px',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                    >
                      Editar
                    </Link>
                    <button 
                      onClick={() => handleDelete(c.id_capacitacion)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {capacitaciones.length === 0 && (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#666',
            fontSize: '16px'
          }}>
            No hay capacitaciones registradas
          </div>
        )}
      </div>
    </div>
  );
};

export default CapacitacionList;