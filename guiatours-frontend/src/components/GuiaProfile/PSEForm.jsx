import React, { useState } from 'react';

const PSEForm = ({ tipoPersona, setTipoPersona, bancoSeleccionado, setBancoSeleccionado, handlePagoExitoso }) => {
  const [errores, setErrores] = useState({});

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!tipoPersona) {
      nuevosErrores.tipoPersona = 'Debe seleccionar el tipo de persona.';
    }
    if (!bancoSeleccionado) {
      nuevosErrores.bancoSeleccionado = 'Debe seleccionar un banco.';
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
      <h4 className="text-lg font-bold mb-4">Pago con PSE:</h4>

      <div>
        <label className="block text-lg font-medium">Tipo de Persona:</label>
        <select
          className="p-2 border rounded-md w-full"
          onChange={(e) => setTipoPersona(e.target.value)}
          value={tipoPersona}
        >
          <option value="">Seleccionar</option>
          <option value="Natural">Persona Natural</option>
          <option value="Jurídica">Persona Jurídica</option>
        </select>
        {errores.tipoPersona && <p className="text-red-500">{errores.tipoPersona}</p>}
      </div>

      <div className="mt-4">
        <label className="block text-lg font-medium">Banco:</label>
        <select
          className="p-2 border rounded-md w-full"
          onChange={(e) => setBancoSeleccionado(e.target.value)}
          value={bancoSeleccionado}
        >
          <option value="">Seleccionar</option>
          <option value="Nequi">Nequi</option>
          <option value="Daviplata">Daviplata</option>
          <option value="Bancolombia">Bancolombia</option>
        </select>
        {errores.bancoSeleccionado && <p className="text-red-500">{errores.bancoSeleccionado}</p>}
      </div>

      <button
        type="button"
        onClick={handlePago}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Pagar con PSE
      </button>
    </div>
  );
};

export default PSEForm;
