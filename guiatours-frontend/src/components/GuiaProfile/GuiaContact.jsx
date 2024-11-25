import React from 'react';

const GuiaContact = ({ email, whatsapp }) => (
  <div className="mt-6">
    <h3 className="text-2xl font-bold">Contacto</h3>
    <p className="text-gray-700">
      <strong>Email:</strong>{' '}
      <a href={`mailto:${email}`} className="text-blue-500">
        {email || 'No disponible'}
      </a>
    </p>
    <p className="text-gray-700">
      <strong>WhatsApp:</strong>{' '}
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        {whatsapp || 'No disponible'}
      </a>
    </p>
  </div>
);

export default GuiaContact;
