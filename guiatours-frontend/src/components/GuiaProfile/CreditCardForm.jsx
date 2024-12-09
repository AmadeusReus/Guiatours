import React, { useState } from 'react';

const CreditCardForm = ({ handlePagoExitoso }) => {
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [cvc, setCvc] = useState('');
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!numeroTarjeta || !/^\d{16}$/.test(numeroTarjeta)) {
      nuevosErrores.numeroTarjeta = 'El número de tarjeta debe contener 16 dígitos.';
    }
    if (!fechaExpiracion || !/^\d{2}\/\d{2}$/.test(fechaExpiracion)) {
      nuevosErrores.fechaExpiracion = 'La fecha de expiración debe tener el formato MM/AA.';
    }
    if (!cvc || !/^\d{3}$/.test(cvc)) {
      nuevosErrores.cvc = 'El CVC debe contener 3 dígitos.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handlePago = () => {
    if (validarCampos()) {
      handlePagoExitoso();
    }
  };

  return (
    <div className="mt-4 p-4 bg-white border rounded-md shadow-md">
      <h4 className="text-lg font-bold mb-4">Datos de Tarjeta de Crédito:</h4>

      <div>
        <label className="block text-lg font-medium">Número de Tarjeta:</label>
        <input
          type="text"
          value={numeroTarjeta}
          onChange={(e) => setNumeroTarjeta(e.target.value)}
          placeholder="0000 0000 0000 0000"
          className="p-2 border rounded-md w-full"
        />
        {errores.numeroTarjeta && <p className="text-red-500">{errores.numeroTarjeta}</p>}
      </div>

      <div className="flex space-x-4 mt-4">
        <div>
          <label className="block text-lg font-medium">Fecha de Expiración:</label>
          <input
            type="text"
            value={fechaExpiracion}
            onChange={(e) => setFechaExpiracion(e.target.value)}
            placeholder="MM/AA"
            className="p-2 border rounded-md w-full"
          />
          {errores.fechaExpiracion && <p className="text-red-500">{errores.fechaExpiracion}</p>}
        </div>
        <div>
          <label className="block text-lg font-medium">CVC:</label>
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            className="p-2 border rounded-md w-full"
          />
          {errores.cvc && <p className="text-red-500">{errores.cvc}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={handlePago}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Pagar con Tarjeta
      </button>
    </div>
  );
};

export default CreditCardForm;
