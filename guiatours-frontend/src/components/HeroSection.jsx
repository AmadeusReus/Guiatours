import React from 'react';

const HeroSection = ({ searchQuery, setSearchQuery }) => {
  return (
    <div
      className="bg-cover bg-center h-96 flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/images/tapartoantioquia.jpg')" }}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold">Descubre los Mejores Guías Turísticos de Colombia</h1>
        <p className="mt-4 text-lg">Encuentra experiencias inolvidables en cada rincón del país.</p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Buscar por ciudad"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 rounded-l-md text-black"
          />
          <button
            className="bg-yellow-500 p-3 rounded-r-md"
            onClick={() => {
              if (!searchQuery) {
                alert('Por favor, ingresa una ciudad para buscar.');
              }
            }}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

