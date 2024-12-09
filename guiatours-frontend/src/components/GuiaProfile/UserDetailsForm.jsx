import React from 'react';

const UserDetailsForm = ({
  numPersonas,
  setNumPersonas,
  email,
  setEmail,
  telefono,
  setTelefono,
  fecha,
  setFecha,
  notas,
  setNotas,
  calcularTarifaTotal,
  errores,
}) => (
  <>
    <div>
      <label className="block text-lg font-medium">Correo Electrónico:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ejemplo@correo.com"
        className="p-2 border rounded-md w-full"
      />
      {errores.email && <p className="text-red-500">{errores.email}</p>}
    </div>

    <div>
      <label className="block text-lg font-medium">Teléfono:</label>
      <input
        type="tel"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="3001234567"
        className="p-2 border rounded-md w-full"
      />
      {errores.telefono && <p className="text-red-500">{errores.telefono}</p>}
    </div>

    <div>
      <label className="block text-lg font-medium">Fecha del Tour:</label>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="p-2 border rounded-md w-full"
      />
      {errores.fecha && <p className="text-red-500">{errores.fecha}</p>}
    </div>

    <div>
      <label className="block text-lg font-medium">Número de Personas:</label>
      <input
        type="number"
        min="1"
        value={numPersonas}
        onChange={(e) => setNumPersonas(e.target.value)}
        className="p-2 border rounded-md w-full"
      />
      {errores.numPersonas && <p className="text-red-500">{errores.numPersonas}</p>}
    </div>

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

    <div>
      <p className="text-lg font-medium">
        <strong>Total:</strong> {calcularTarifaTotal()} COP
      </p>
    </div>
  </>
);

export default UserDetailsForm;
