import React from 'react';

const FormularioRespuesta = ({
  conversacionActiva,
  nuevoMensaje,
  setNuevoMensaje,
  enviarMensaje,
}) => {
  if (!conversacionActiva) return null;

  return (
    <div className="mt-4">
      <textarea
        className="w-full p-2 border rounded-md"
        rows="3"
        placeholder="Escribe tu respuesta..."
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={enviarMensaje}
      >
        Enviar
      </button>
    </div>
  );
};

export default FormularioRespuesta;
