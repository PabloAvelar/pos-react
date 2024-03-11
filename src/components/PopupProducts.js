import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import '../styles/popuproducts.css';
import productsService from '../services/productsService';

function PopupProducts({ closeModal, data }) {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        // Setting data to edit a customer
        if (data) {
            setInputs(values => ({ ...values, ['product_id']: data.product_id }))

            document.clientForm.product_code.value = data.product_code;
            setInputs(values => ({ ...values, ['product_code']: data.product_code }))

            document.clientForm.product_name.value = data.product_name;
            setInputs(values => ({ ...values, ['product_name']: data.product_name }))

            document.clientForm.gen_name.value = data.gen_name;
            setInputs(values => ({ ...values, ['gen_name']: data.gen_name }))

            document.clientForm.supplier.value = data.supplier;
            setInputs(values => ({ ...values, ['supplier']: data.supplier }))

            document.clientForm.qty.value = data.qty;
            setInputs(values => ({ ...values, ['qty']: data.qty }))

            document.clientForm.onhand_qty.value = data.onhand_qty;
            setInputs(values => ({ ...values, ['onhand_qty']: data.onhand_qty }))

            document.clientForm.price.value = data.price;
            setInputs(values => ({ ...values, ['price']: data.price }))

            document.clientForm.o_price.value = data.o_price;
            setInputs(values => ({ ...values, ['o_price']: data.o_price }))

            document.clientForm.date_arrival.value = data.date_arrival;
            setInputs(values => ({ ...values, ['date_arrival']: data.date_arrival }))
        }
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        console.log(inputs);

        try {
            const data = new URLSearchParams({
                'product_id': inputs.product_id,
                'product_code': inputs.product_code,
                'product_name': inputs.product_name,
                'gen_name': inputs.gen_name,
                'supplier': inputs.supplier,
                'qty': inputs.qty,
                'onhand_qty': inputs.onhand_qty,
                'price': inputs.price,
                'o_price': inputs.o_price,
                'date_arrival': inputs.date_arrival
            })

            // If it's a new product
            if (inputs.product_id === undefined) {
                data.delete("product_id");

                productsService.postProduct(data.toString())
                    .then((res) => {
                        if (res.status === 'success') {
                            console.log("Producto agregado");
                            window.location.reload();
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            } else {
                // If a Product is being edited
                productsService.putProduct(data.toString())
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
            <form className='popup-client-card' onSubmit={handleSubmit} name='clientForm'>

                <div className='input-container' >
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Product Code: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="product_code" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Product: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="product_name" required />
                    </div>
                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Generic name: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="gen_name" required />
                    </div>

                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Supplier: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="supplier" required />
                    </div>

                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Quantity: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="qty" required />
                    </div>

                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Quantity on-hand: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="onhand_qty" required />
                    </div>

                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Sales price: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="price" required />
                    </div>

                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Original price: </span>
                        <input className='input-form-popup' onChange={handleChange} type="text" name="o_price" required />
                    </div>

                    <div className="input-add-client-container">
                        <span style={{ fontSize: 16 }}>Date of reception: </span>
                        <input className='input-form-popup' onChange={handleChange} type="date" name="date_arrival" required />
                    </div>

                </div>

                <div className="submit-container">
                    <button className="submit-button shadow" type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default PopupProducts;