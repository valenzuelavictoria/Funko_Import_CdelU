import React, { useState } from 'react';
import '../../App.css';

const PerfilUser = () => {
  const [isPersonalInfoEditing, setIsPersonalInfoEditing] = useState(false);
  const [isShippingInfoEditing, setIsShippingInfoEditing] = useState(false);

  return (
    <div className="perfil-containerUSER">
      <h1 className="text-centerMPUSER text-2xl font-semibold mb-6">Mi Perfil</h1>
      
      {/* Información Personal */}
      <div className="info-sectionUSER">
        <h2 className="section-titleUSER">Información Personal</h2>
        <p>Actualiza tu información personal aquí.</p>
        {isPersonalInfoEditing ? (
          <div className="edit-formUSER">
            <input type="text" placeholder="Nombre" className="input-fieldUSER" />
            <input type="text" placeholder="Apellido" className="input-fieldUSER" />
            <input type="email" placeholder="Correo electrónico" className="input-fieldUSER" />
            <input type="tel" placeholder="Teléfono" className="input-fieldUSER" />
            <button className="btn-saveUSR">Guardar Cambios</button>
          </div>
        ) : (
          <div>
            <p><strong>Nombre:</strong> Juan Pérez</p>
            <p><strong>Correo electrónico:</strong> juanperez@example.com</p>
            <button className="btn-editUSER" onClick={() => setIsPersonalInfoEditing(true)}>Editar Información</button>
          </div>
        )}
      </div>

      {/* Información de Envío */}
      <div className="info-sectionUSER">
        <h2 className="section-titleUSER">Datos del Envío</h2>
        <p>Gestiona tu dirección de envío predeterminada.</p>
        {isShippingInfoEditing ? (
          <div className="edit-formUSER">
            <input type="text" placeholder="Calle y Número" className="input-fieldUSER" />
            <input type="text" placeholder="Ciudad" className="input-fieldUSER" />
            <input type="text" placeholder="Provincia" className="input-fieldUSER" />
            <input type="text" placeholder="Código Postal" className="input-fieldUSER" />
            <button className="btn-saveUSER">Guardar Dirección</button>
          </div>
        ) : (
          <div>
            <p><strong>Calle:</strong> Calle Falsa 123</p>
            <p><strong>Ciudad:</strong> Ciudad Falsa</p>
            <p><strong>Provincia:</strong> Provincia Falsa</p>
            <p><strong>Código Postal:</strong> 12345</p>
            <button className="btn-editUSER" onClick={() => setIsShippingInfoEditing(true)}>Editar Dirección</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilUser;
