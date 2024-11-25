import React from 'react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ image, city, id }) => {
  return (
    <Link to={`/destinos/${id}`} className="block">
      <div className="bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg">
        {/* Imagen */}
        <img src={image} alt={`Vista de ${city}`} className="w-full h-56 object-cover" />
        
        {/* Contenido */}
        <div className="p-6 text-center h-48 flex flex-col justify-between">
          {/* Título de la ciudad */}
          <h2 className="text-2xl font-bold text-gray-900">{city}</h2>
          {/* Descripción breve */}
          <p className="text-base text-gray-700 mt-4">
            Una experiencia única te espera. <span className="text-blue-500 font-semibold">¡Explora y descubre más!</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
