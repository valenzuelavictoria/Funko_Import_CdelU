import React, { useState } from 'react';
import '../../Admin.css';

const AdPerfil = () => {
  const [isPersonalInfoEditing, setIsPersonalInfoEditing] = useState(false);
  const [isShippingInfoEditing, setIsShippingInfoEditing] = useState(false);

  return (
    <div className="perfil-container">
      <h1 className="text-centerMP text-2xl font-semibold mb-6">Mi Perfil</h1>
      
      {/* Información Personal */}
      <div className="info-section">
        <h2 className="section-title">Información Personal</h2>
        <p>Actualiza tu información personal aquí.</p>
        {isPersonalInfoEditing ? (
          <div className="edit-form">
            <input type="text" placeholder="Nombre" className="input-field" />
            <input type="text" placeholder="Apellido" className="input-field" />
            <input type="email" placeholder="Correo electrónico" className="input-field" />
            <input type="tel" placeholder="Teléfono" className="input-field" />
            <button className="btn-save">Guardar Cambios</button>
          </div>
        ) : (
          <div>
            <p><strong>Nombre:</strong> Juan Pérez</p>
            <p><strong>Correo electrónico:</strong> juanperez@example.com</p>
            <button className="btn-edit" onClick={() => setIsPersonalInfoEditing(true)}>Editar Información</button>
          </div>
        )}
      </div>

      {/* Información de Envío */}
      <div className="info-section">
        <h2 className="section-title">Datos del Envío</h2>
        <p>Gestiona tu dirección de envío predeterminada.</p>
        {isShippingInfoEditing ? (
          <div className="edit-form">
            <input type="text" placeholder="Calle y Número" className="input-field" />
            <input type="text" placeholder="Ciudad" className="input-field" />
            <input type="text" placeholder="Provincia" className="input-field" />
            <input type="text" placeholder="Código Postal" className="input-field" />
            <button className="btn-save">Guardar Dirección</button>
          </div>
        ) : (
          <div>
            <p><strong>Calle:</strong> Calle Falsa 123</p>
            <p><strong>Ciudad:</strong> Ciudad Falsa</p>
            <p><strong>Provincia:</strong> Provincia Falsa</p>
            <p><strong>Código Postal:</strong> 12345</p>
            <button className="btn-edit" onClick={() => setIsShippingInfoEditing(true)}>Editar Dirección</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdPerfil;
