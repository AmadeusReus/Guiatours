import React, { useState } from 'react';

const GuiaPayment = ({ tarifa }) => {
  const [numPersonas, setNumPersonas] = useState(1);
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [notas, setNotas] = useState('');
  const [mensajePago, setMensajePago] = useState('');

  const handlePago = () => {
    setMensajePago('¡Pago realizado con éxito! Gracias por contratar este servicio, el guia se contactará contigo para confirmar los detalles.');
  };

  const calcularTarifaTotal = () => {
    const tarifaPorPersona = parseFloat(tarifa.replace(/[^\d]/g, '')); // Convierte tarifa a número
    return tarifaPorPersona * numPersonas;
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-md">
      <h3 className="text-2xl font-bold mb-4">Contratar este Guía</h3>
      <form className="space-y-4">
        {/* Número de Personas */}
        <div>
          <label className="block text-lg font-medium">Número de Personas:</label>
          <input
            type="number"
            min="1"
            value={numPersonas}
            onChange={(e) => setNumPersonas(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block text-lg font-medium">Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            className="p-2 border rounded-md w-full"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-lg font-medium">Teléfono:</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="3001234567"
            className="p-2 border rounded-md w-full"
          />
        </div>

        {/* Fecha del Tour */}
        <div>
          <label className="block text-lg font-medium">Fecha del Tour:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="p-2 border rounded-md w-full"
          />
        </div>

        {/* Notas Adicionales */}
        <div>
          <label className="block text-lg font-medium">Notas Adicionales:</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Comentarios o solicitudes especiales"
            className="p-2 border rounded-md w-full"
            rows="3"
          ></textarea>
        </div>

        {/* Total Calculado */}
        <div>
          <p className="text-lg font-medium">
            <strong>Total:</strong> {calcularTarifaTotal()} COP
          </p>
        </div>

        {/* Botón de Pagar */}
        <button
          type="button"
          onClick={handlePago}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Ir a Pagar
        </button>
        {mensajePago && <p className="text-green-500 mt-4">{mensajePago}</p>}
      </form>
    </div>
  );
};

export default GuiaPayment;
