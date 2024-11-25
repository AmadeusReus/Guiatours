import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDestinos } from '../data/mockData'; // Importar datos de prueba

const DestinationDetails = () => {
  const { id } = useParams(); // 'id' ahora corresponde al ID de la ciudad
  const [destino, setDestino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ciudades/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los detalles de la ciudad');
        }
        const data = await response.json();
        setDestino(data); // Datos desde el backend
      } catch (err) {
        console.error('Error al conectar con el backend, usando datos de prueba:', err);

        // Fallback a datos de prueba
        const fallbackData = Object.values(mockDestinos).find(
          (ciudad, index) => index + 1 === parseInt(id, 10) // Usar índice como ID simulado
        );

        if (fallbackData) {
          setDestino({
            ciudad: {
              nombre: fallbackData.nombre,
              descripcion: fallbackData.descripcion,
              imagen_principal: fallbackData.imagenPrincipal,
            },
            atracciones: fallbackData.atracciones,
            guias: fallbackData.guias,
          });
        } else {
          setError('Ciudad no encontrada en datos de prueba.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

  return (
    <div className="container mx-auto mt-8">
      {/* Imagen principal */}
      <div
        className="relative h-80 w-full bg-cover bg-center rounded-md shadow-md mb-10"
        style={{ backgroundImage: `url('${destino.ciudad.imagen_principal}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{destino.ciudad.nombre}</h1>
        </div>
      </div>

      {/* Descripción */}
      <div className="bg-white p-6 rounded-md shadow-md mb-10">
        <p className="text-lg">{destino.ciudad.descripcion}</p>
      </div>

      {/* Atracciones principales */}
      <div className="mt-10">
        <h2 className="text-4xl font-bold mb-6">Atracciones Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destino.atracciones.map((atraccion, index) => (
            <div key={index} className="bg-white rounded-md shadow-md">
              <img
                src={atraccion.imagen}
                alt={atraccion.nombre}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold">{atraccion.nombre}</h3>
                <p>{atraccion.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guías disponibles */}
      <div className="mt-10">
        <h2 className="text-4xl font-bold mb-6">Guías Turísticos Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destino.guias.map((guia) => (
            <div key={guia.id} className="bg-white rounded-md shadow-md p-6">
              <h3 className="text-xl font-bold">{guia.nombre}</h3>
              <p><strong>Experiencia:</strong> {guia.experiencia}</p>
              <p><strong>Idiomas:</strong> {guia.idiomas}</p>
              <Link
                to={`/guia/${guia.id}`} // Ajuste: solo pasamos el ID del guía
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md block text-center"
              >
                Ver Perfil
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
