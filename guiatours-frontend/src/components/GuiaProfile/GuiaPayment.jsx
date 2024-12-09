import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener guiaId de la URL
import UserDetailsForm from './UserDetailsForm';
import PaymentMethodSelection from './PaymentMethodSelection';
import CreditCardForm from './CreditCardForm';
import PSEForm from './PSEForm';
import PaymentSuccessMessage from './PaymentSuccessMessage';
import { getToken } from '../../services/authService'; // Para obtener el token

const GuiaPayment = ({ tarifa }) => {
  const { id: guiaId } = useParams(); // Obtener guiaId de la URL
  const [numPersonas, setNumPersonas] = useState(1);
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [notas, setNotas] = useState('');
  const [mostrarMetodosPago, setMostrarMetodosPago] = useState(false);
  const [metodoPago, setMetodoPago] = useState('');
  const [mensajePago, setMensajePago] = useState('');
  const [bancoSeleccionado, setBancoSeleccionado] = useState('');
  const [tipoPersona, setTipoPersona] = useState('');
  const [errores, setErrores] = useState({}); // Manejo de errores de validación

  const calcularTarifaTotal = () => {
    const tarifaPorPersona = parseFloat(tarifa.replace(/[^\d]/g, ''));
    return tarifaPorPersona * numPersonas;
  };

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!email) nuevosErrores.email = 'El correo electrónico es obligatorio.';
    if (!telefono) nuevosErrores.telefono = 'El teléfono es obligatorio.';
    if (!fecha) nuevosErrores.fecha = 'La fecha del tour es obligatoria.';
    if (numPersonas <= 0) nuevosErrores.numPersonas = 'El número de personas debe ser al menos 1.';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0; // Retorna true si no hay errores
  };

  const handleMostrarMetodosPago = () => {
    if (validarCampos()) {
      setMostrarMetodosPago(true);
    }
  };

  const registrarContrato = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debe iniciar sesión para contratar un guía.');
      return;
    }

    // Decodificar manualmente el token
    let usuarioId;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      usuarioId = payload.id;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      alert('Token inválido. Por favor, inicia sesión nuevamente.');
      return;
    }

    console.log('Usuario ID:', usuarioId); // Verificar el ID extraído

    if (!usuarioId) {
      alert('No se pudo determinar el usuario. Por favor, inicia sesión.');
      return;
    }

    const datosContrato = {
      guia_id: parseInt(guiaId, 10), // Convertir el guiaId a número
      usuario_id: usuarioId,
      num_personas: numPersonas,
      monto: calcularTarifaTotal(),
    };

    console.log('Datos enviados al backend:', datosContrato);

    try {
      const response = await fetch('http://localhost:5000/api/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datosContrato),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Respuesta del backend:', errorData);
        throw new Error(errorData.mensaje || 'Error al registrar el contrato.');
      }

      const responseData = await response.json();
      console.log('Respuesta del servidor:', responseData);

      setMensajePago('¡Contrato registrado con éxito! Gracias por contratar este servicio.');
      setMetodoPago('');
      setMostrarMetodosPago(false);
    } catch (error) {
      console.error('Error al registrar el contrato:', error);
      alert(error.message || 'Hubo un problema al registrar el contrato.');
    }
  };

  const handlePagoExitoso = () => {
    registrarContrato();
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-md">
      <h3 className="text-2xl font-bold mb-4">Contratar este Guía</h3>

      {!mensajePago && (
        <form className="space-y-4">
          {/* Formulario de datos del usuario */}
          <UserDetailsForm
            numPersonas={numPersonas}
            setNumPersonas={setNumPersonas}
            email={email}
            setEmail={setEmail}
            telefono={telefono}
            setTelefono={setTelefono}
            fecha={fecha}
            setFecha={setFecha}
            notas={notas}
            setNotas={setNotas}
            calcularTarifaTotal={calcularTarifaTotal}
            errores={errores} // Pasar los errores al formulario
          />

          {/* Selección del método de pago */}
          {!mostrarMetodosPago && (
            <button
              type="button"
              onClick={handleMostrarMetodosPago}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Ir a Pagar
            </button>
          )}

          {mostrarMetodosPago && !metodoPago && (
            <PaymentMethodSelection setMetodoPago={setMetodoPago} />
          )}

          {/* Formularios de métodos de pago */}
          {metodoPago === 'Tarjeta de Crédito' && (
            <CreditCardForm handlePagoExitoso={handlePagoExitoso} />
          )}

          {metodoPago === 'PSE' && (
            <PSEForm
              tipoPersona={tipoPersona}
              setTipoPersona={setTipoPersona}
              bancoSeleccionado={bancoSeleccionado}
              setBancoSeleccionado={setBancoSeleccionado}
              handlePagoExitoso={handlePagoExitoso}
            />
          )}
        </form>
      )}

      {/* Mensaje de éxito */}
      {mensajePago && <PaymentSuccessMessage mensajePago={mensajePago} />}
    </div>
  );
};

export default GuiaPayment;
