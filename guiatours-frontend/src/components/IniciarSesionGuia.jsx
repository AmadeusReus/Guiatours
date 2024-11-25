import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, setRole, setGuiaId } from '../services/authService'; // Funciones para manejo de token y roles

const IniciarSesionGuia = () => {
  const [formData, setFormData] = useState({ email: '', contrasena: '' });
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
    setMensaje('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/loginGuide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token); // Guardar token en localStorage
        setRole('guia'); // Guardar el rol como guía
        setGuiaId(data.guiaId); // Guardar el ID del guía
        setMensaje('Inicio de sesión exitoso');
        navigate(`/guia/${data.guiaId}/dashboard`); // Redirigir al dashboard del guía
      } else {
        setMensaje(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (err) {
      setMensaje('Error al conectar con el servidor');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto mt-16 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Inicia Sesión como Guía</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          Iniciar Sesión
        </button>
        {mensaje && <p className="text-center text-red-500 mt-4">{mensaje}</p>}
      </form>
    </div>
  );
};

export default IniciarSesionGuia;
