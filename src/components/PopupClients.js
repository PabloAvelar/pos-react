import React from 'react'
import '../styles/popupclients.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

function PopupClients() {
    return (
        <div className='popup-client-card-container shadow'>
            <div style={{ marginTop: 20 }}>
                <span style={{ color: "#370021", fontWeight: 'bold', fontSize: 36 }}>
                    ADD CUSTOMER
                </span>
            </div>
            <form className='popup-client-card'>

                {/* <br> */}

                <div className='input-container'>
                    <div className="input-prepend">
                        <input className='input-form' type="text" name="fullname" placeholder="Full Name" required />
                    </div>
                    <div className="input-prepend">
                        <input className='input-form' type="text" name="contact" placeholder="Phone Number" required />
                    </div>
                    <div className="input-prepend">
                        <input className='input-form' type="text"  name="address" placeholder="Address" required />
                    </div>
                    <div className="input-prepend">
                        <input className='input-form' type="text" name="expected_date" placeholder="Expected Date" required />
                    </div>
                    <div className="input-prepend">
                        <input className='input-form' type="text" name="membership_number" placeholder="Membership Number" required />
                    </div>
                    <div className="input-prepend">
                        <input className='input-form' type="text" name="prod_name" placeholder="Product Name" required />
                    </div>
                    <div className="input-prepend">
                        <input className='input-form' type="text" name="note" placeholder="Note" required />
                    </div>
                </div>

                <div className="submit-container">
                    <button className="submit-button shadow" href="dashboard.html" type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default PopupClients