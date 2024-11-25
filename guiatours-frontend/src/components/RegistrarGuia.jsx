import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrarGuia = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: '',
    whatsapp: '',
    ciudad_id: '',
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

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
      const response = await fetch('http://localhost:5000/api/auth/registerGuide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al registrar el guía');
      }

      setMensaje('¡Registro exitoso! Redirigiendo...');
      setTimeout(() => {
        navigate('/inicia-sesion-guia');
      }, 2000); // Redirige después de 2 segundos
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <div className="container mx-auto mt-16 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Regístrate como Guía</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">WhatsApp:</label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Ciudad:</label>
          <select
            name="ciudad_id"
            value={formData.ciudad_id}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          >
            <option value="">Seleccione una ciudad</option>
            <option value="1">Cartagena</option>
            <option value="2">Medellín</option>
            <option value="3">Bogotá</option>
            <option value="4">Cali</option>
            <option value="5">Santa Marta</option>
            <option value="6">San Andrés</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Registrar
        </button>
        {mensaje && <p className="text-center text-red-500 mt-4">{mensaje}</p>}
      </form>
    </div>
  );
};

export default RegistrarGuia;
