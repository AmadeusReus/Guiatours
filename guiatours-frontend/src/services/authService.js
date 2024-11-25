// src/services/authService.js

// Guardar el token en localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Obtener el token del localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Eliminar el token (logout)
export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role'); // Eliminar el rol al cerrar sesión
  localStorage.removeItem('guiaId'); // Eliminar el ID del guía al cerrar sesión
};

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!getToken(); // Devuelve true si hay un token
};

// Guardar el rol en localStorage
export const setRole = (role) => {
  localStorage.setItem('role', role);
};

// Obtener el rol del localStorage
export const getRole = () => {
  return localStorage.getItem('role');
};

// Guardar el ID del guía en localStorage
export const setGuiaId = (id) => {
  localStorage.setItem('guiaId', id);
};

// Obtener el ID del guía del localStorage
export const getGuiaId = () => {
  return localStorage.getItem('guiaId');
};
