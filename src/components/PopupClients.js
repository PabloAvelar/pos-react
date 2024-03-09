import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import '../styles/popupclients.css';

function PopupClients({closeModal, data}) {
    console.log(data)
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
            <form className='popup-client-card'>

                {/* <br> */}

                <div className='input-container'>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Full Name: </span>
                        <input className='input-form-popup' type="text" name="fullname" value={data?data.customer_name:""} required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Phone Number: </span>
                        <input className='input-form-popup' type="text" name="contact" value={data?data.contact:""} required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Address: </span>
                        <input className='input-form-popup' type="text" name="address" value={data?data.address:""} required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Membership Number: </span>
                        <input className='input-form-popup' type="text" name="membership_number" value={data?data.membership_number:""} required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Product Name: </span>
                        <input className='input-form-popup' type="text" name="prod_name" value={data?data.prod_name:""} required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Note: </span>
                        <input className='input-form-popup' type="text" name="note" value={data?data.note:""} required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Expected Date: </span>
                        <input className='input-form-popup' type="date" name="expected_date" value={data?data.expected_date:""} required />
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