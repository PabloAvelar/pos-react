import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

export function EditButton({ onEditClick }) {

    const handleEdit = () => {
        // Puedes realizar otras operaciones aquí si es necesario
        onEditClick(); // Llama a la función proporcionada como prop
    };

    return (
        <div>
            <a onClick={handleEdit}>
                <FontAwesomeIcon icon={faPencil} style={{ color: '#593325' }} />
            </a>
        </div>
    )
}

export function DeleteButton({ onDeleteClick }) {
    const handleDelete = () => {
        // Puedes realizar otras operaciones aquí si es necesario
        onDeleteClick(); // Llama a la función proporcionada como prop
    };

    return (
        <div>
            <a onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} style={{ color: '#593325' }} />
            </a>
        </div>
    )
}
