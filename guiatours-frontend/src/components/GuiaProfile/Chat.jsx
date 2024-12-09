import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../services/authService';

const Chat = () => {
  const { id: guiaId } = useParams(); // Obtener guiaId de la URL
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [error, setError] = useState('');
  const mensajesRef = useRef(null); // Referencia para scroll automático

  // Obtener usuarioId del token
  const token = getToken();
  let usuarioId = null;
  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      usuarioId = payload.id;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      setError('Error al procesar la sesión. Por favor, inicia sesión nuevamente.');
    }
  }

  // Obtener mensajes al cargar el componente
  useEffect(() => {
    const fetchMensajes = async () => {
      if (!usuarioId || !guiaId) {
        console.error('Faltan usuarioId o guiaId');
        setError('Faltan datos necesarios para cargar el chat.');
        return;
      }

      console.log('Solicitando mensajes para:', { usuarioId, guiaId });
      try {
        const response = await fetch(`http://localhost:5000/api/mensajes/${usuarioId}/${guiaId}`);
        if (!response.ok) {
          throw new Error('Error al cargar los mensajes.');
        }
        const data = await response.json();
        console.log('Mensajes recibidos:', data.mensajes);
        setMensajes(data.mensajes);
      } catch (err) {
        console.error('Error al cargar mensajes:', err);
        setError('No se pudieron cargar los mensajes.');
      }
    };

    fetchMensajes();
  }, [usuarioId, guiaId]);

  // Enviar un mensaje
  const handleEnviarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    const mensaje = {
      usuario_id: usuarioId,
      guia_id: parseInt(guiaId, 10),
      contenido: nuevoMensaje,
      emisor: 'usuario', // Definir el emisor (puede ser 'usuario' o 'guia')
    };

    console.log('Enviando mensaje:', mensaje);

    try {
      const response = await fetch('http://localhost:5000/api/mensajes/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensaje),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje.');
      }

      console.log('Mensaje enviado correctamente.');

      const mensajeEnviado = {
        ...mensaje,
        timestamp: new Date().toISOString(), // Simular timestamp local
      };

      setMensajes((prevMensajes) => [...prevMensajes, mensajeEnviado]);
      setNuevoMensaje('');
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setError('No se pudo enviar el mensaje.');
    }
  };

  // Scroll automático al final del chat
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight;
    }
  }, [mensajes]);

  return (
    <div className="chat-container bg-gray-100 p-4 rounded-md shadow-md">
      {/* Mensajes */}
      <div
        ref={mensajesRef}
        className="mensajes-area h-64 overflow-y-scroll border p-2 rounded-md mb-4"
      >
        {mensajes.map((msg, index) => (
          <div
            key={index}
            className={`mensaje ${msg.emisor === 'usuario' ? 'text-right' : 'text-left'}`}
          >
            <p
              className={`p-2 rounded-md shadow-sm inline-block mb-2 ${
                msg.emisor === 'usuario' ? 'bg-blue-200' : 'bg-green-200'
              }`}
            >
              {msg.contenido}
            </p>
          </div>
        ))}
      </div>

      {/* Formulario para enviar un nuevo mensaje */}
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
