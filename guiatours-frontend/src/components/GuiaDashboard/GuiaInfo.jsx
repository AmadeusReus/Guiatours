import React from 'react';

const GuiaInfo = ({ guia }) => (
  <div className="flex flex-col items-center">
    <img
      src={guia?.foto || '/images/guias.jpg'}
      alt={`Foto de ${guia?.nombre || 'Guía'}`}
      className="w-40 h-40 rounded-full object-cover shadow-md"
      onError={(e) => {
        e.target.src = '/images/guias.jpg';
      }}
    />
    <h1 className="text-4xl font-bold mt-4">{guia?.nombre || 'Nombre no disponible'}</h1>
    <p className="text-lg text-gray-500">{guia?.idiomas || 'Idiomas no especificados'}</p>
    <p className="text-lg text-gray-700">{guia?.especialidad || 'Especialidad no especificada'}</p>
    <p className="text-md text-gray-600 mt-4">{guia?.sobre_mi || 'Información no disponible'}</p>
  </div>
);

export default GuiaInfo;
