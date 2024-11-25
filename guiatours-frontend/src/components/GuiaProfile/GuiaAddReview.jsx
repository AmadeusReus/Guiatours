import React from 'react';

const GuiaAddReview = ({
  nuevoComentario,
  setNuevoComentario,
  calificacion,
  setCalificacion,
  enviarResena,
  mensajeExito,
}) => (
  <div className="mt-6">
    <h3 className="text-2xl font-bold">Agregar una Reseña</h3>
    <textarea
      className="w-full p-3 border rounded-md mt-2"
      rows="4"
      placeholder="Escribe tu reseña aquí..."
      value={nuevoComentario}
      onChange={(e) => setNuevoComentario(e.target.value)}
    ></textarea>
    <div className="mt-2">
      <label className="block text-lg font-bold">Calificación:</label>
      <input
        type="number"
        min="1"
        max="5"
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value)}
        className="w-16 p-2 border rounded-md"
      />
    </div>
    <button
      onClick={enviarResena}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      Enviar Reseña
    </button>
    {mensajeExito && <p className="text-green-500 mt-2">{mensajeExito}</p>}
  </div>
);

export default GuiaAddReview;
