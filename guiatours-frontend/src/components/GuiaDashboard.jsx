import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../services/authService';

const GuiaDashboard = () => {
  const { id } = useParams(); // ID del guía obtenido de la ruta
  const navigate = useNavigate();
  const [guia, setGuia] = useState(null);
  const [metricas, setMetricas] = useState({ vecesContratado: 0, dineroGanado: 0 }); // Datos por defecto
  const [mensajes, setMensajes] = useState([
    { texto: 'Mensaje de prueba', usuario_nombre: 'Usuario 1', fecha: '2024-11-22' },
  ]); // Datos simulados
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuiaData = async () => {
      try {
        const token = getToken();
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
        setError('No se pudo cargar la información del guía.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuiaData();
  }, [id]);

  if (isLoading) {
    return <p className="text-center mt-6">Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  return (
    <div className="container mx-auto mt-16 p-6 bg-white shadow-md rounded-md">
      {/* Información del Guía */}
      <div className="flex flex-col items-center">
        <img
          src={guia?.foto || '/images/guias/default-profile.png'} // Foto por defecto
          alt={`Foto de ${guia?.nombre || 'Guía'}`}
          className="w-40 h-40 rounded-full object-cover shadow-md"
        />
        <h1 className="text-4xl font-bold mt-4">{guia?.nombre || 'Nombre no disponible'}</h1>
        <p className="text-lg text-gray-500">{guia?.idiomas || 'Idiomas no especificados'}</p>
        <p className="text-lg text-gray-700">{guia?.especialidad || 'Especialidad no especificada'}</p>
        <p className="text-md text-gray-600 mt-4">{guia?.sobre_mi || 'Información no disponible'}</p>
      </div>

      {/* Métricas */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-md shadow-md text-center">
          <h3 className="text-2xl font-bold">{metricas.vecesContratado}</h3>
          <p className="text-lg text-gray-700">Veces Contratado</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md shadow-md text-center">
          <h3 className="text-2xl font-bold">{metricas.dineroGanado} COP</h3>
          <p className="text-lg text-gray-700">Dinero Ganado</p>
        </div>
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
        {mensajes.length > 0 ? (
          <ul className="space-y-4">
            {mensajes.map((mensaje, index) => (
              <li key={index} className="border p-4 rounded-md shadow-md">
                <p className="text-gray-700">{mensaje.texto}</p>
                <p className="text-sm text-gray-500">De: {mensaje.usuario_nombre}</p>
                <p className="text-sm text-gray-500">Fecha: {mensaje.fecha}</p>
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
