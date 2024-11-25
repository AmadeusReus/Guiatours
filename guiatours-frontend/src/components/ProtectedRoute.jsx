// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/authService'; // Servicio para manejar tokens

const ProtectedRoute = ({ children }) => {
  let token;
  try {
    token = getToken(); // Intenta obtener y validar el token
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return <Navigate to="/iniciar-sesion" replace />;
  }

  if (!token) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return children; // Renderiza el componente si está autenticado
};

export default ProtectedRoute;
