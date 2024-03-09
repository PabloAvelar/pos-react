import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import '../styles/popupclients.css';

function PopupClients({ closeModal, data }) {
    const [inputs, setInputs] = useState({});
    const [customer_name, setCustomer_name] = useState(data ? data.customer_name : "");

    useEffect(()=>{
        // Setting data to edit a customer
        if (data){
            document.clientForm.customer_name.value = data.customer_name;
            setInputs(values => ({ ...values, ['customer_name']: data.customer_name }))

            document.clientForm.contact.value = data.contact;
            setInputs(values => ({ ...values, ['contact']: data.contact }))

            document.clientForm.address.value = data.address;
            setInputs(values => ({ ...values, ['address']: data.address }))

            document.clientForm.membership_number.value = data.membership_number;
            setInputs(values => ({ ...values, ['membership_number']: data.membership_number }))

            document.clientForm.prod_name.value = data.prod_name;
            setInputs(values => ({ ...values, ['prod_name']: data.prod_name }))

            document.clientForm.note.value = data.note;
            setInputs(values => ({ ...values, ['note']: data.note }))

            document.clientForm.expected_date.value = data.expected_date;
            setInputs(values => ({ ...values, ['expected_date']: data.expected_date }))
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
                'customer_name': inputs.customer_name,
                'contact': inputs.contact,
                'address': inputs.address,
                'membership_number': inputs.membership_number,
                'prod_name': inputs.prod_name,
                'note': inputs.note,
                'expected_date': inputs.expected_date,
            }).toString()
            
            console.log(data);

        } catch (e) {

        }
    }

    return (

        <div className='popup-client-card-container shadow'>
            <a className='close-modal' onClick={() => closeModal(false)}>
                <FontAwesomeIcon icon={faXmarkSquare} size='2x' color='#260B01' />
            </a>
            <div style={{ marginTop: 20 }}>
                <span style={{ color: "#370021", fontWeight: 'bold', fontSize: 36 }}>
                    Add Customer
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
                        <span style={{ fontSize: 16 }}>Membership Number: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="membership_number" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Product Name: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="prod_name" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Note: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="note" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Expected Date: </span>
                        <input className='input-form-popup' onChange={handleChange} type="date" name="expected_date" required />
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