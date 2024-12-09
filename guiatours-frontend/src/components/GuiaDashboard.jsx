import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../services/authService';

const GuiaDashboard = () => {
  const { id } = useParams(); // ID del guía obtenido de la ruta
  const navigate = useNavigate();
  const [guia, setGuia] = useState(null);
  const [metricas, setMetricas] = useState({ vecesContratado: 0, dineroGanado: 0 });
  const [mensajes, setMensajes] = useState([]);
  const [errorMetricas, setErrorMetricas] = useState('');
  const [errorMensajes, setErrorMensajes] = useState('');
  const [isLoadingMetricas, setIsLoadingMetricas] = useState(true);
  const [isLoadingMensajes, setIsLoadingMensajes] = useState(true);
  const [errorGuia, setErrorGuia] = useState('');
  const [isLoadingGuia, setIsLoadingGuia] = useState(true);

  const token = getToken();

  // Cargar datos del guía
  useEffect(() => {
    const fetchGuiaData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/guias/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Error al obtener los datos del guía');
        const data = await response.json();
        setGuia(data);
      } catch (err) {
        console.error(err);
        setErrorGuia('No se pudo cargar la información del guía.');
      } finally {
        setIsLoadingGuia(false);
      }
    };

    fetchGuiaData();
  }, [id, token]);

  // Cargar métricas del guía
  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/contratos/metrics/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Error al obtener las métricas');
        const data = await response.json();
        console.log('Datos recibidos:', data); // Depuración
        setMetricas({
          vecesContratado: data.veces_contratado || 0,
          dineroGanado: data.total_ganado || 0,
        });
      } catch (err) {
        console.error('Error al cargar métricas:', err);
        setErrorMetricas('No se pudo cargar las métricas.');
      } finally {
        setIsLoadingMetricas(false);
      }
    };

    fetchMetricas();
  }, [id, token]);

  // Cargar mensajes del guía
useEffect(() => {
  const fetchMensajes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/mensajes/guia/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        throw new Error('Error al obtener los mensajes.');
      }

      const data = await response.json();
      console.log('Mensajes recibidos:', data.mensajes); // Depuración

      if (Array.isArray(data.mensajes)) {
        setMensajes(data.mensajes);
      } else {
        console.error('Formato de datos inesperado:', data);
        setErrorMensajes('Formato de datos inesperado.');
      }
    } catch (err) {
      console.error('Error al cargar mensajes:', err);
      setErrorMensajes('No se pudieron cargar los mensajes.');
    } finally {
      setIsLoadingMensajes(false);
    }
  };

  fetchMensajes();
}, [id, token]);


  if (isLoadingGuia || isLoadingMetricas || isLoadingMensajes) {
    return <p className="text-center mt-6">Cargando...</p>;
  }

  if (errorGuia) {
    return <p className="text-red-500 text-center mt-6">{errorGuia}</p>;
  }

  return (
    <div className="container mx-auto mt-16 p-6 bg-white shadow-md rounded-md">
      {/* Información del Guía */}
      <div className="flex flex-col items-center">
        <img
          src={guia?.foto || '/images/guias.jpg'}
          alt={`Foto de ${guia?.nombre || 'Guía'}`}
          className="w-40 h-40 rounded-full object-cover shadow-md"
          onError={(e) => {
            e.target.src = '/images/guias.jpg';
          }} // Manejar error de carga de imagen
        />
        <h1 className="text-4xl font-bold mt-4">{guia?.nombre || 'Nombre no disponible'}</h1>
        <p className="text-lg text-gray-500">{guia?.idiomas || 'Idiomas no especificados'}</p>
        <p className="text-lg text-gray-700">{guia?.especialidad || 'Especialidad no especificada'}</p>
        <p className="text-md text-gray-600 mt-4">{guia?.sobre_mi || 'Información no disponible'}</p>
      </div>

      {/* Métricas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {errorMetricas ? (
          <p className="text-red-500 text-center">{errorMetricas}</p>
        ) : (
          <>
            <div className="bg-blue-100 p-4 rounded-md shadow-md text-center">
              <h3 className="text-2xl font-bold">{metricas.vecesContratado}</h3>
              <p className="text-lg text-gray-700">Veces Contratado</p>
            </div>
            <div className="bg-green-100 p-4 rounded-md shadow-md text-center">
              <h3 className="text-2xl font-bold">{Number(metricas.dineroGanado).toLocaleString()} COP</h3>
              <p className="text-lg text-gray-700">Dinero Ganado</p>
            </div>
          </>
        )}
      </div>

      {/* Botón Editar Perfil */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(`/guia/${id}/editar`)}
          className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Editar Perfil
        </button>
      </div>

      {/* Buzón de Mensajes */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Buzón de Mensajes</h3>
        {errorMensajes ? (
          <p className="text-red-500">{errorMensajes}</p>
        ) : mensajes.length > 0 ? (
          <ul className="space-y-4">
            {mensajes.map((mensaje, index) => (
              <li key={index} className="border p-4 rounded-md shadow-md">
                <p className="text-gray-700">{mensaje.contenido}</p>
                <p className="text-sm text-gray-500">
                  {mensaje.emisor === 'usuario' ? 'De: Usuario' : 'De: Guía'}
                </p>
                <p className="text-sm text-gray-500">Fecha: {new Date(mensaje.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tienes mensajes nuevos.</p>
        )}
      </div>
    </div>
  );
};

export default GuiaDashboard;
