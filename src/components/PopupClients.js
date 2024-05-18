import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import '../styles/popupclients.css';
import clientsService from '../services/clientsService';

function PopupClients({ displayModal, data, onClientAdded }) {
    const [inputs, setInputs] = useState({});
    const [customer_name, setCustomer_name] = useState(data ? data.customer_name : "");

    useEffect(() => {
        // Setting data to edit a customer
        if (data) {
            setInputs(values => ({ ...values, ['customer_id']: data.customer_id }))

            document.clientForm.customer_name.value = data.customer_name;
            setInputs(values => ({ ...values, ['customer_name']: data.customer_name }))

            document.clientForm.contact.value = data.contact;
            setInputs(values => ({ ...values, ['contact']: data.contact }))

            document.clientForm.address.value = data.address;
            setInputs(values => ({ ...values, ['address']: data.address }))

            document.clientForm.membership_number.value = data.membership_number;
            setInputs(values => ({ ...values, ['membership_number']: data.membership_number }))

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
                'customer_id': inputs.customer_id,
                'customer_name': inputs.customer_name,
                'contact': inputs.contact,
                'address': inputs.address,
                'membership_number': inputs.membership_number,
            })

            // If it's a new customer
            if (inputs.customer_id === undefined) {
                data.delete("customer_id");

                const res = await clientsService.postClient(data.toString())
                if (res.status === 'success') {
                    console.log("cliente agregado");
                    onClientAdded("¡Cliente registrado!", "Se ha agregado un nuevo cliente", 'success', 5000)
                }
            } else {
                // If a client is being edited
                const res = await clientsService.putClient(data.toString())
                if (res.status === 'success') {
                    console.log("cliente editado");
                    displayModal(false)
                    onClientAdded("¡Cliente modificado!", "Se ha modificado el cliente", 'success', 5000)
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
                    Client Information
                </span>
            </div>
            <form className='popup-client-card' onSubmit={handleSubmit} name='clientForm'>

                {/* <br> */}

                <div className='input-container'>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Full Name: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="customer_name" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Phone Number: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="contact" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Address: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="address" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Membership #: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="membership_number" required />
                    </div>
                </div>

                <div className="submit-container">
                    <button className="submit-button shadow" type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default PopupClients