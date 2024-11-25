import React, { useState, useEffect } from 'react';

const Chat = ({ usuarioId, guiaId, emisor }) => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [error, setError] = useState('');

  // Obtener mensajes al cargar el componente
  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/mensajes/${usuarioId}/${guiaId}`);
        if (!response.ok) {
          throw new Error('Error al cargar los mensajes.');
        }
        const data = await response.json();
        setMensajes(data.mensajes);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los mensajes.');
      }
    };

    fetchMensajes();
  }, [usuarioId, guiaId]);

  // Enviar un mensaje
  const handleEnviarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/mensajes/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: usuarioId,
          guia_id: guiaId,
          contenido: nuevoMensaje,
          emisor,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje.');
      }

      const mensajeEnviado = {
        contenido: nuevoMensaje,
        emisor,
        timestamp: new Date().toISOString(),
      };

      setMensajes((prevMensajes) => [...prevMensajes, mensajeEnviado]);
      setNuevoMensaje('');
    } catch (err) {
      console.error(err);
      setError('No se pudo enviar el mensaje.');
    }
  };

  return (
    <div className="chat-container bg-gray-100 p-4 rounded-md shadow-md">
      <div className="mensajes-area h-64 overflow-y-scroll border p-2 rounded-md mb-4">
        {mensajes.map((msg, index) => (
          <div
            key={index}
            className={`mensaje ${
              msg.emisor === emisor ? 'text-right' : 'text-left'
            }`}
          >
            <p className="bg-white p-2 rounded-md shadow-sm inline-block mb-2">
              {msg.contenido}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleEnviarMensaje} className="flex">
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-grow p-2 border rounded-l-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Chat;
