import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken, getRole, getGuiaId } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const token = isAuthenticated(); // Verificar si hay un token
  const role = getRole(); // Obtenemos el rol del localStorage (guía o usuario)
  const guiaId = getGuiaId(); // Obtenemos el ID del guía si aplica

  const handleLogout = () => {
    removeToken();
    if (role === 'guia') {
      navigate('/inicia-sesion-guia'); // Redirige al inicio de sesión de guía
    } else {
      navigate('/iniciar-sesion'); // Redirige al inicio de sesión de usuario
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">GUIATOURS</Link>
        <div className="flex space-x-4">
          {/* Mostrar "Quiero Ser Guía" solo si no hay sesión activa */}
          {!token && <Link to="/conviertete-en-guia" className="text-white">Quiero Ser Guía</Link>}

          {/* Mostrar opciones basadas en autenticación */}
          {!token ? (
            <>
              {/* Mostrar botones de inicio de sesión y registro */}
              <Link to="/iniciar-sesion" className="text-white">Iniciar Sesión</Link>
              <Link to="/registrarse" className="text-white">Registrarse</Link>
            </>
          ) : (
            <>
              {/* Mostrar Dashboard si es guía */}
              {role === 'guia' && (
                <Link to={`/guia/${guiaId}/dashboard`} className="text-white">
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
