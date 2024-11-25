import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../services/authService';

const EditarPerfilGuia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    experiencia: '',
    idiomas: '',
    especialidad: '',
    sobre_mi: '',
    tarifa: '',
    tour: '',
    whatsapp: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGuiaData = async () => {
      try {
        const token = getToken();
        const response = await fetch(`http://localhost:5000/api/guias/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Error al obtener los datos del guía');

        const data = await response.json();
        setFormData({
          nombre: data.nombre || '',
          experiencia: data.experiencia || '',
          idiomas: data.idiomas || '',
          especialidad: data.especialidad || '',
          sobre_mi: data.sobre_mi || '',
          tarifa: data.tarifa || '',
          tour: data.tour || '',
          whatsapp: data.contacto.whatsapp || '',
        });
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la información del guía.');
      }
    };

    fetchGuiaData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();
      const response = await fetch(`http://localhost:5000/api/guias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al actualizar el perfil');
      }

      setMensaje('Perfil actualizado exitosamente');
      setTimeout(() => navigate(`/guia/${id}/dashboard`), 2000); // Redirige al dashboard
    } catch (err) {
      console.error(err);
      setError(err.message || 'Hubo un problema al actualizar tu perfil.');
    }
  };

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  return (
    <div className="container mx-auto mt-16 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Editar Perfil</h1>

      {/* Sección de Foto de Perfil */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/images/guias/default-profile.png" // Foto predeterminada
          alt="Foto de perfil"
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <p className="text-sm text-gray-500 mt-2">Subir foto de perfil estará disponible pronto</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos editables */}
        {[
          { label: 'Nombre', name: 'nombre', type: 'text' },
          { label: 'Experiencia', name: 'experiencia', type: 'text' },
          { label: 'Idiomas', name: 'idiomas', type: 'text' },
          { label: 'Especialidad', name: 'especialidad', type: 'text' },
          { label: 'Sobre mí', name: 'sobre_mi', type: 'textarea' },
          { label: 'Tarifa', name: 'tarifa', type: 'text' },
          { label: 'Tour', name: 'tour', type: 'text' },
          { label: 'WhatsApp', name: 'whatsapp', type: 'text' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-lg font-medium">{field.label}:</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="p-2 border rounded-md w-full"
                rows="4"
              ></textarea>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="p-2 border rounded-md w-full"
              />
            )}
          </div>
        ))}

        {/* Botones de Guardar y Regresar */}
        <div className="mt-8 text-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => navigate(`/guia/${id}/dashboard`)}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          >
            Regresar
          </button>
        </div>
      </form>

      {/* Mensajes de éxito o error */}
      {mensaje && <p className="text-green-500 mt-4 text-center">{mensaje}</p>}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default EditarPerfilGuia;
