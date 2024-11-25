import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConvierteteEnGuia = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/registro-guia');
  };

  const handleLoginClick = () => {
    navigate('/inicia-sesion-guia');
  };

  return (
    <div className="container mx-auto mt-16 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        Conviértete en Guía Turístico
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Únete a nuestra comunidad de guías turísticos y ayuda a viajeros de todo el mundo a descubrir las maravillas de tu región.
      </p>

      {/* Beneficios de ser guía */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Beneficios de Ser Guía</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Comparte tu pasión por tu ciudad y su cultura.</li>
          <li>Obtén ingresos adicionales mientras haces lo que amas.</li>
          <li>Conecta con personas de todas partes del mundo.</li>
          <li>Desarrolla habilidades en comunicación y liderazgo.</li>
          <li>Forma parte de una comunidad global de guías turísticos.</li>
        </ul>
      </div>

      {/* Botones de Registro e Inicio de Sesión */}
      <div className="flex flex-col items-center mt-10 space-y-4">
        <button
          className="bg-blue-500 text-white py-3 px-8 rounded-md shadow-md hover:bg-blue-600 transition"
          onClick={handleRegisterClick}
        >
          Regístrate como Guía
        </button>
        <button
          className="bg-green-500 text-white py-3 px-8 rounded-md shadow-md hover:bg-green-600 transition"
          onClick={handleLoginClick}
        >
          Inicia Sesión como Guía
        </button>
      </div>

      {/* Imagen de soporte */}
      <div className="flex justify-center mt-8">
        <img
          src="/images/imagen1.jpeg"
          alt="Conviértete en Guía"
          className="w-full max-w-lg rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default ConvierteteEnGuia;
