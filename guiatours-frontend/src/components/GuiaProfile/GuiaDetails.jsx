import React from 'react';

const GuiaDetails = ({ experiencia, idiomas, tour, tarifa }) => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <h3 className="text-xl font-bold">Experiencia</h3>
      <p className="text-gray-700">{experiencia}</p>
    </div>
    <div>
      <h3 className="text-xl font-bold">Idiomas</h3>
      <p className="text-gray-700">{idiomas}</p>
    </div>
    <div>
      <h3 className="text-xl font-bold">Tour</h3>
      <p className="text-gray-700">{tour}</p>
    </div>
    <div>
      <h3 className="text-xl font-bold">Tarifa</h3>
      <p className="text-gray-700">{tarifa || 'No disponible'}</p>
    </div>
  </div>
);

export default GuiaDetails;
