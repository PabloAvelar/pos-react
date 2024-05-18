import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import '../styles/popupclients.css';
import suppliersService from '../services/suppliersService';

function PopupSuppliers({ displayModal, data, onSupplierAdded }) {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        // Setting data to edit a customer
        if (data) {
            setInputs(values => ({ ...values, ['supplier_id']: data.supplier_id }))

            document.clientForm.supplier_name.value = data.supplier_name;
            setInputs(values => ({ ...values, ['supplier_name']: data.supplier_name }))

            document.clientForm.contact_person.value = data.contact_person;
            setInputs(values => ({ ...values, ['contact_person']: data.contact_person }))

            document.clientForm.supplier_contact.value = data.supplier_contact;
            setInputs(values => ({ ...values, ['supplier_contact']: data.supplier_contact }))

            document.clientForm.supplier_address.value = data.supplier_address;
            setInputs(values => ({ ...values, ['supplier_address']: data.supplier_address }))

            document.clientForm.note.value = data.note;
            setInputs(values => ({ ...values, ['note']: data.note }))

        }
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {


            const data = new URLSearchParams({
                'supplier_id': inputs.supplier_id,
                'supplier_name': inputs.supplier_name,
                'contact_person': inputs.contact_person,
                'supplier_contact': inputs.supplier_contact,
                'supplier_address': inputs.supplier_address,
                'note': inputs.note,
            })

            // If it's a new customer
            if (inputs.supplier_id === undefined) {
                data.delete("supplier_id");

                const res = await suppliersService.postSupplier(data.toString());
                if (res.status === 'success') {
                    console.log("Supplier agregado");
                    onSupplierAdded("¡Nuevo proveedor registrado!", "Se ha agregado un nuevo proveedor", 'success', 5000);
                }

            } else {
                // If a Supplier is being edited
                const res = await suppliersService.putSupplier(data.toString());
                if (res.status === 'success') {
                    console.log("cliente editado");
                    onSupplierAdded("¡Proveedor modificado!", "Se ha modificar el proveedor", 'success', 5000);
                }
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (

        <div className='popup-client-card-container shadow'>
            <a className='close-modal' onClick={() => displayModal(false)}>
                <FontAwesomeIcon icon={faXmarkSquare} size='2x' color='#260B01' />
            </a>
            <div style={{ marginTop: 20 }}>
                <span style={{ color: "#370021", fontWeight: 'bold', fontSize: 36 }}>
                    Supplier Information
                </span>
            </div>
            <form className='popup-client-card' onSubmit={handleSubmit} name='clientForm'>

                {/* <br> */}

                <div className='input-container'>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Supplier Name: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="supplier_name" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Address: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="supplier_address" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Contact Name: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="contact_person" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Contact Number: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="supplier_contact" required />
                    </div>

                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Note: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="note" required />
                    </div>
                </div>

                <div className="submit-container">
                    <button className="submit-button shadow" type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default PopupSuppliers;