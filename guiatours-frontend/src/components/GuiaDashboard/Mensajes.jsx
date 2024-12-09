import React from 'react';

const Mensajes = ({ mensajes, errorMensajes }) => (
  <div className="mt-8">
    <h3 className="text-2xl font-bold mb-4">Buzón de Mensajes</h3>
    {errorMensajes ? (
      <p className="text-red-500">{errorMensajes}</p>
    ) : mensajes.length > 0 ? (
      <ul className="space-y-4">
        {mensajes.map((mensaje, index) => (
          <li key={index} className="border p-4 rounded-md shadow-md">
            <p className="text-gray-700">{mensaje.contenido}</p>
            <p className="text-sm text-gray-500">
              {mensaje.emisor === 'usuario' ? 'De: Usuario' : 'De: Guía'}
            </p>
            <p className="text-sm text-gray-500">Fecha: {new Date(mensaje.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No tienes mensajes nuevos.</p>
    )}
  </div>
);

export default Mensajes;
