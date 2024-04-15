import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import '../styles/popupclients.css';
import suppliersService from '../services/suppliersService';
import { useAuth } from './AuthContext';
import salesService from '../services/salesService';

function PopupSales({ closeModal, data, customers }) {

    const [inputs, setInputs] = useState({});
    const [customerSelected, setCustomerSelected] = useState(customers[0]);
    const [change, setChange] = useState(0);
    const auth = useAuth();
    const getTotal = data.reduce((total, p) => total + p.amount, 0);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }));

        // Si se ingresa la cantidad de dinero nomas
        if (name === 'customerMoney') {
            setChange(inputs.customerMoney > getTotal ? inputs.customerMoney - getTotal : 0);
        }

    }
    async function handleSubmit(e) {
        e.preventDefault();
        const todaysDate = new Date();
        const date = `${todaysDate.getFullYear()}-${(todaysDate.getMonth() + 1).toString().padStart(2, '0')}-${todaysDate.getDate().toString().padStart(2, '0')}`;

        try {
            // Se va iterar por todos los productos del carrito
            // para registrar cada venta por separado

            // Inserción a tabla Sales
            data.map((product) => {
                const dataForSalesTable = new URLSearchParams({
                    'cashier': auth.auth.username,
                    'date': date,
                    'amount': product.quantity * product.price,
                    'type': product.gen_name,
                    // 'name': inputs.customerName
                }).toString()

                const dataForSalesOrder = new URLSearchParams({
                    'product': product.product_name,
                    'customer_id': customerSelected.customer_id,
                    'gen_name': product.gen_name,
                    'product_code': product.product_code,
                    'date': date,
                    'price': product.price,
                    'amount': product.quantity * product.price,
                    'qty': product.quantity,
                }).toString()


                // Mandando datos la table `sales`
                salesService.postSales(dataForSalesTable)
                    .then((res) => {
                        if (res.status === 'success') {
                            console.log("A new sale added");
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })

                // Mandando datos la table `sales_order`
                salesService.postSalesOrder(dataForSalesOrder)
                    .then((res) => {
                        if (res.status === 'success') {
                            console.log("A new sale added");
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            })
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    return (

        <div className='popup-client-card-container shadow' style={{ width: '35%' }}>
            <a className='close-modal' onClick={() => closeModal(false)}>
                <FontAwesomeIcon icon={faXmarkSquare} size='2x' color='#260B01' />
            </a>
            <div style={{ marginTop: 20 }}>
                <span style={{ color: "#370021", fontWeight: 'bold', fontSize: 36 }}>
                    Cash
                </span>
            </div>
            <form className='popup-client-card' onSubmit={handleSubmit} name='clientForm'>

                {/* <br> */}

                <div className='input-container'>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Customer: </span>
                        {/* <input className='input-form-popup' onChange={handleChange} type="text" name="customerName" required /> */}
                        <select name='select' className='input-form-popup' onChange={(e) => { setCustomerSelected(JSON.parse(e.target.value)) }}>
                            {
                                customers.map((client) => (
                                    <option key={client.customer_id} value={JSON.stringify(client)}>{client.customer_name}</option>
                                ))

                            }
                        </select>
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Cash: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="customerMoney" required />
                    </div>
                    {/* <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Change: {change} </span>
                        <input className='input-form-popup' type="text" required />

                    </div> */}
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 18, fontWeight: 'bold' }}>Total: {getTotal} </span>
                    </div>
                </div>

                {
                    inputs.customerMoney >= getTotal &&
                    <div className="submit-container">
                        <button className="submit-button shadow" type="submit">Save</button>
                    </div>
                }

            </form>
        </div>
    )
}

export default PopupSales;