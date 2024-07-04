import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import '../styles/popuproducts.css';
import productsService from '../services/productsService';
import DOMPurify from 'dompurify';

function PopupProducts({ displayModal, data, suppliers, onProductAdded  }) {
    const [inputs, setInputs] = useState({});
    const [supplierSelected, setSupplierSelected] = useState(suppliers === undefined ? "" : suppliers[0]);
    
    useEffect(() => {
        // Setting data to edit a product
        if (data) {
            setInputs(values => ({ ...values, ['product_id']: data.product_id }))

            const sanitizedProductCode = DOMPurify.sanitize(data.product_code);
            document.clientForm.product_code.value = sanitizedProductCode;
            setInputs(values => ({ ...values, ['product_code']: sanitizedProductCode }))

            const sanitizedProductName = DOMPurify.sanitize(data.product_name);
            document.clientForm.product_name.value = sanitizedProductName;
            setInputs(values => ({ ...values, ['product_name']: sanitizedProductName }))

            const sanitizedGenName = DOMPurify.sanitize(data.gen_name);
            document.clientForm.gen_name.value = sanitizedGenName;
            setInputs(values => ({ ...values, ['gen_name']: sanitizedGenName }))

            const sanitizedSupplier = DOMPurify.sanitize(data.supplier);
            document.clientForm.supplier.value = sanitizedSupplier;
            setInputs(values => ({ ...values, ['supplier_id']: sanitizedSupplier }))

            const sanitizedQty = DOMPurify.sanitize(data.qty);
            document.clientForm.qty.value = sanitizedQty;
            setInputs(values => ({ ...values, ['qty']: sanitizedQty }))

            const sanitizedOnHandQty = DOMPurify.sanitize(data.onhand_qty);
            document.clientForm.onhand_qty.value = sanitizedOnHandQty;
            setInputs(values => ({ ...values, ['onhand_qty']: sanitizedOnHandQty }))

            const sanitizedPrice = DOMPurify.sanitize(data.price);
            document.clientForm.price.value = sanitizedPrice;
            setInputs(values => ({ ...values, ['price']: sanitizedPrice }))

            const sanitizedOPrice = DOMPurify.sanitize(data.o_price);
            document.clientForm.o_price.value = sanitizedOPrice;
            setInputs(values => ({ ...values, ['o_price']: sanitizedOPrice }))

            const sanitizedDateArrival = DOMPurify.sanitize(data.date_arrival);
            document.clientForm.date_arrival.value = sanitizedDateArrival;
            setInputs(values => ({ ...values, ['date_arrival']: sanitizedDateArrival }))
        }
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = DOMPurify.sanitize(event.target.value);

        setInputs(values => ({ ...values, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const sanitizedData = {
                'product_id': inputs.product_id,
                'product_code': DOMPurify.sanitize(inputs.product_code),
                'product_name': DOMPurify.sanitize(inputs.product_name),
                'gen_name': DOMPurify.sanitize(inputs.gen_name),
                'supplier_id': supplierSelected.supplier_id,
                'qty': DOMPurify.sanitize(inputs.qty),
                'onhand_qty': DOMPurify.sanitize(inputs.onhand_qty),
                'price': DOMPurify.sanitize(inputs.price),
                'o_price': DOMPurify.sanitize(inputs.o_price),
                'date_arrival': DOMPurify.sanitize(inputs.date_arrival)
            }

            // If it's a new product
            if (inputs.product_id === undefined) {
                delete sanitizedData.product_id;


                const res = await productsService.postProduct(sanitizedData);
                
                if (res.status === 'success') {
                    console.log("Producto agregado");
                    onProductAdded(
                        "¡Producto registrado!",
                        "Se ha registrado " + inputs.product_name,
                        "success",
                        5000
                      );

                    displayModal(false);
                }

            } else {
                // If a Product is being edited
                const res = await productsService.putProduct(sanitizedData);
                if (res.status === 'success') {
                    console.log("cliente editado");
                    window.location.reload();
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
                        <select name='supplier' className='input-form-popup' onChange={(e) => { setSupplierSelected(JSON.parse(e.target.value)) }}>
                            { suppliers !== undefined &&
                                suppliers.map((supp) => (
                                    <option key={supp.supplier_id} value={JSON.stringify(supp)}>{supp.supplier_name}</option>
                                ))

                            }
                        </select>
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