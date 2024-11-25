import React from 'react';

const GuiaHeader = ({ fotoFinal, nombre, especialidad }) => (
  <div className="text-center">
    <img
      src={fotoFinal}
      alt={`Foto de ${nombre}`}
      className="w-60 h-60 rounded-full mx-auto object-cover shadow-lg border-4 border-gray-300"
    />
    <h1 className="text-4xl font-bold mt-6">{nombre}</h1>
    <p className="text-lg text-gray-600 italic mt-2">{especialidad}</p>
  </div>
);

export default GuiaHeader;
