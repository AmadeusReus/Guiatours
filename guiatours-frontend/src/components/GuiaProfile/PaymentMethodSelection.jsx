import React from 'react';

const PaymentMethodSelection = ({ setMetodoPago }) => (
  <div className="mt-4 p-4 bg-white border rounded-md shadow-md">
    <h4 className="text-lg font-bold mb-4">Selecciona el Método de Pago:</h4>
    <div className="flex flex-col space-y-2">
      <button
        type="button"
        onClick={() => setMetodoPago('Tarjeta de Crédito')}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Tarjeta de Crédito
      </button>
      <button
        type="button"
        onClick={() => setMetodoPago('PSE')}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
      >
        Pago con PSE
      </button>
    </div>
  </div>
);

export default PaymentMethodSelection;
