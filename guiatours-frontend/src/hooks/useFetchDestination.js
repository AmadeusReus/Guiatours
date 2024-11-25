// src/hooks/useFetchDestination.js
import { useState, useEffect } from 'react';
import { mockDestinos } from '../data/mockData';

export const useFetchDestination = (city) => {
  const [destino, setDestino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatosDestino = async () => {
      try {
        const datosPrueba = mockDestinos[city.toLowerCase()];
        if (datosPrueba) {
          setDestino(datosPrueba);
        } else {
          setError('No se pudo encontrar el destino.');
        }
        setLoading(false);
      } catch (error) {
        setError('No se pudo cargar la información del destino.');
        setLoading(false);
      }
    };
    fetchDatosDestino();
  }, [city]);

  return { destino, loading, error };
};
