import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationCard from './components/DestinationCard';
import DestinationDetails from './components/DestinationDetails';
import ConvierteteEnGuia from './components/ConvierteteEnGuia';
import IniciarSesion from './components/IniciarSesion';
import Registrarse from './components/Registrarse';
import GuiaProfile from './components/GuiaProfile';
import ProtectedRoute from './components/ProtectedRoute';
import RegistrarGuia from './components/RegistrarGuia'; // Nueva ruta
import IniciarSesionGuia from './components/IniciarSesionGuia'; // Nueva ruta
import GuiaDashboard from './components/GuiaDashboard';
import EditarPerfilGuia from './components/EditarPerfilGuia';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ciudades');
        if (!response.ok) {
          throw new Error('Error al obtener las ciudades');
        }
        const data = await response.json();
        setCiudades(data);
        setFilteredCities(data);
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
      }
    };

    fetchCiudades();
  }, []);

  useEffect(() => {
    const filtered = ciudades.filter((ciudad) =>
      ciudad.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchQuery, ciudades]);

  return (
    <div>
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center">Destinos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
          {filteredCities.map((ciudad) => (
            <DestinationCard
              key={ciudad.id}
              image={ciudad.imagen_principal}
              city={ciudad.nombre}
              id={ciudad.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinos/:id" element={<DestinationDetails />} />
        <Route path="/conviertete-en-guia" element={<ConvierteteEnGuia />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/guia/:id" element={<ProtectedRoute><GuiaProfile /></ProtectedRoute>} />
        <Route path="/registro-guia" element={<RegistrarGuia />} /> {/* Nueva ruta */}
        <Route path="/inicia-sesion-guia" element={<IniciarSesionGuia />} /> {/* Nueva ruta */}
        <Route path="/guia/:id/dashboard" element={<ProtectedRoute><GuiaDashboard /></ProtectedRoute>} />
        <Route path="/guia/:id/editar" element={<ProtectedRoute><EditarPerfilGuia /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
