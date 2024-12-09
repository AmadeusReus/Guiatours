import React from 'react';

const Metricas = ({ metricas, errorMetricas }) => (
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
);

export default Metricas;
