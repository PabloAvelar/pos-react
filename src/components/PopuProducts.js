import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import '../styles/popuproducts.css';
import suppliersService from '../services/suppliersService';

function PopuProducts({ closeModal, data }) {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        // Setting data to edit a customer
        if (data) {
            setInputs(values => ({ ...values, ['suplier_id']: data.suplier_id }))

            document.clientForm.suplier_name.value = data.suplier_name;
            setInputs(values => ({ ...values, ['suplier_name']: data.suplier_name }))

            document.clientForm.contact_person.value = data.contact_person;
            setInputs(values => ({ ...values, ['contact_person']: data.contact_person }))

            document.clientForm.suplier_contact.value = data.suplier_contact;
            setInputs(values => ({ ...values, ['suplier_contact']: data.suplier_contact }))

            document.clientForm.suplier_address.value = data.suplier_address;
            setInputs(values => ({ ...values, ['suplier_address']: data.suplier_address }))

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
                'suplier_id': inputs.suplier_id,
                'suplier_name': inputs.suplier_name,
                'contact_person': inputs.contact_person,
                'suplier_contact': inputs.suplier_contact,
                'suplier_address': inputs.suplier_address,
                'note': inputs.note,
            })

            // If it's a new customer
            if (inputs.suplier_id === undefined) {
                data.delete("suplier_id");

                suppliersService.postSupplier(data.toString())
                    .then((res) => {
                        if (res.status === 'success') {
                            console.log("Supplier agregado");
                            window.location.reload();
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            } else {
                // If a Supplier is being edited
                suppliersService.putSupplier(data.toString())
                    .then((res) => {
                        if (res.status === 'success') {
                            console.log("cliente editado");
                            window.location.reload();
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (

        <div className='popup-client-card-container shadow'>
            <a className='close-modal' onClick={() => closeModal(false)}>
                <FontAwesomeIcon icon={faXmarkSquare} size='2x' color='#260B01' />
            </a>
            <div style={{ marginTop: 20 }}>
                <span style={{ color: "#370021", fontWeight: 'bold', fontSize: 36 }}>
                    Product Information
                </span>
            </div>
            <form className='popup-client-card1' onSubmit={handleSubmit} name='clientForm'>

                {/* <br> */}

                <div className='input-container'>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Brand: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="suplier_name" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Generic name: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="suplier_address" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Category/Description: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="contact_person" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Contact Number: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="suplier_contact" required />
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

export default PopuProducts;