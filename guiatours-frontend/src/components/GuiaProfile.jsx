import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../services/authService';
import GuiaHeader from './GuiaProfile/GuiaHeader';
import GuiaDetails from './GuiaProfile/GuiaDetails';
import GuiaContact from './GuiaProfile/GuiaContact';
import GuiaReviews from './GuiaProfile/GuiaReviews';
import GuiaAddReview from './GuiaProfile/GuiaAddReview';
import GuiaPayment from './GuiaProfile/GuiaPayment';
import Chat from './GuiaProfile/Chat';
import { FaComments } from 'react-icons/fa'; // Icono de chat

const GuiaProfile = () => {
  const { id } = useParams();
  const [guia, setGuia] = useState(null);
  const [fotoFinal, setFotoFinal] = useState('/images/guias/default-profile.png');
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mostrarChat, setMostrarChat] = useState(false); // Estado para mostrar/ocultar el chat

  useEffect(() => {
    const fetchGuiaDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/guias/${id}`);
        if (!response.ok) throw new Error('Error al obtener los detalles del guía');
        const data = await response.json();
        setGuia(data);
        validarFoto(data.foto || '/images/guias/default-profile.png');
      } catch (err) {
        console.error('Error al obtener los datos del guía:', err);
      }
    };

    fetchGuiaDetails();
  }, [id]);

  const validarFoto = (fotoUrl) => {
    const img = new Image();
    img.onload = () => setFotoFinal(fotoUrl);
    img.onerror = () => setFotoFinal('/images/guia1.jpg');
    img.src = fotoUrl;
  };

  const enviarResena = async () => {
    const token = getToken();
    if (!token) {
      alert('Debes iniciar sesión para dejar un comentario.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/guias/${id}/resenas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          texto: nuevoComentario,
          calificacion,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al enviar la reseña');
      }

      const nuevaResena = await response.json();
      setGuia((prevGuia) => ({
        ...prevGuia,
        reseñas: [...(prevGuia.reseñas || []), nuevaResena.reseña],
      }));
      setNuevoComentario('');
      setCalificacion(5);
      setMensajeExito('Reseña enviada exitosamente.');
    } catch (err) {
      console.error('Error al enviar la reseña:', err);
      alert(err.message || 'Hubo un problema al enviar tu reseña.');
    }
  };

  return (
    <div className="container mx-auto mt-16 p-6 bg-white shadow-md rounded-md">
      <GuiaHeader fotoFinal={fotoFinal} nombre={guia?.nombre} especialidad={guia?.especialidad} />
      <GuiaDetails
        experiencia={guia?.experiencia}
        idiomas={guia?.idiomas}
        tour={guia?.tour}
        tarifa={guia?.tarifa}
      />
      <GuiaContact email={guia?.contacto?.email} whatsapp={guia?.contacto?.whatsapp} />
      
      {/* Botón para abrir el chat */}
      {getToken() && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setMostrarChat((prev) => !prev)}
            className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition"
            title="Abrir chat"
          >
            <FaComments size={24} />
          </button>
        </div>
      )}

      {/* Chat desplegable */}
      {mostrarChat && <Chat guiaId={id} />}

      <GuiaReviews reseñas={guia?.reseñas} />
      <GuiaPayment tarifa={guia?.tarifa || '0'} />
      <GuiaAddReview
        nuevoComentario={nuevoComentario}
        setNuevoComentario={setNuevoComentario}
        calificacion={calificacion}
        setCalificacion={setCalificacion}
        enviarResena={enviarResena}
        mensajeExito={mensajeExito}
      />
    </div>
  );
};

export default GuiaProfile;
