import React from 'react';

const GuiaReviews = ({ reseñas }) => (
  <div className="mt-6">
    <h3 className="text-2xl font-bold">Reseñas</h3>
    {reseñas?.length > 0 ? (
      reseñas.map((reseña, index) => (
        <div key={index} className="border-b py-4">
          <p className="text-gray-700">"{reseña.texto}"</p>
          <p className="text-sm text-gray-500">
            - {reseña.usuario}, {reseña.calificacion} estrellas
          </p>
          <p className="text-xs text-gray-400">Fecha: {reseña.fecha}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No hay reseñas disponibles.</p>
    )}
  </div>
);

export default GuiaReviews;
