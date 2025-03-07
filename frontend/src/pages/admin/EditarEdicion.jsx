import React, { useState, useEffect } from 'react';

function EditarEdicion({ edition, onCancel, onSave }) {
  const [nombre, setNombre] = useState(edition.nombre);

  // Actualiza los valores del formulario cuando la edición cambia
  useEffect(() => {
    setNombre(edition.nombre);
  }, [edition]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEdition = { ...edition, nombre }; // Solo actualiza el nombre
    onSave(updatedEdition); // Pasa la edición editada a la función onSave
  };

  return (
    <div className="modalAE">
      <div className="modal-contentAE">
        <h3>Editar Edición</h3>
        <form onSubmit={handleSubmit}>
          <div className="blockAE">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="modal-actionsAE">
            <button type="button" className="btn-cancelAE" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-saveAE">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarEdicion;