import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

export function EditButton(object) {

    const handleEdit = (e) => {
        e.preventDefault();
        console.log(object)

    }
    //box-shadow: rgba(0, 0, 0, 0.45) 1.95px 1.95px 2.6px;

    return (
        <div>
            <a onClick={handleEdit}> 
                <FontAwesomeIcon icon={faPencil} style={{ color: '#593325'}} />
            </a>
        </div>
    )
}

export function DeleteButton(object) {
    const handleDelete = (e) => {
        e.preventDefault();
        console.log(object)
    }

    return (
        <div>
            <a onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} style={{ color: '#593325' }} />
            </a>
        </div>
    )
}
