import React, { useState, useEffect } from 'react'
import '../styles/clients.css';
import '../styles/uniqueStyleSales.css';
import PopupSales from '../components/PopupSales';
import productsService from '../services/productsService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TableSales from '../components/TableSales';
import { useAuth } from '../components/AuthContext';
import clientsService from '../services/clientsService';

function Sales() {

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  const [productsCart, setProductsCart] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const auth = useAuth();

  useEffect(() => {
    // Cargando sólo una vez los clientes que hay
    productsService.getProducts()
      .then((prod) => {
        setProducts(prod);
        // asignando el primer producto en el select por defecto
        try {
          setProductSelected(prod[0])
        } catch (error) {}
        setDataLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      })

      // Cargando customers
      clientsService.getClients()
      .then((clients) => {
        setCustomers(clients);
      })
      .catch((e) => {
        console.error(e);
      })
  }, []);

  const handleAddCart = () => {
    // Nuevo producto para mostrar en la tabla
    const newProduct = {
      product_id: productSelected.product_id,
      product_name: productSelected.product_name,
      gen_name: productSelected.gen_name,
      product_code: productSelected.product_code,
      price: productSelected.price,
      quantity: productsQuantity,
      amount: productsQuantity * productSelected.price
    };

    // Agregando el nuevo producto al carrito con los demás
    setProductsCart([...productsCart, newProduct]);
  }

  const handleSave = () => {
    setShowModal(true);
    // const todaysDate = new Date();
    // const date = `${todaysDate.getFullYear()}-${(todaysDate.getMonth() + 1).toString().padStart(2, '0')}-${todaysDate.getDate().toString().padStart(2, '0')}`;

    // const infoForSalesTable = {
    //   cashier: auth.auth.username,
    //   amount: productsCart.reduce((total, p) => total + p.amount, 0),
    //   date: date,
    // }

    // const infoForSalesOrderTable = {
    //   amount: productsCart.reduce((total, p) => total + p.amount, 0),
    //   date: date,
    // }
  }

  const deleteProduct = (id) => {
    const newObjects = productsCart.filter(p => p.product_id !== id);

    // Actualizando productos en carrito
    setProductsCart(newObjects);
  }


  return (

    <main className="page-container">

      <aside>
        <Sidebar />
      </aside>

      <article className='page-content-container'>
        <Header />
        <section className='clients-container'>
          <div className='page-title-container'>
            <span className='page-title'>Sales</span>
          </div>

          <div className='selects-container'>
            <div className='select-container select-products'>
              <label htmlFor='select' className='label-select-product'>Select a Product</label>
              <select name='select' className='selection' onChange={(e) => { setProductSelected(JSON.parse(e.target.value)) }}>
                {
                  products.map((p) => (
                    <option key={p.product_id} value={JSON.stringify(p)}>{p.product_name}</option>
                  ))

                }
              </select>
            </div>

            <div className='select-container select-qty'>
              <label htmlFor='quantity' className='label-select-product'>Quantity</label>
              <input type="number" className='selection' id="quantity" name="quantity" min="1" max={productSelected.onhand_qty} onChange={(e) => setProductsQuantity(e.target.value)} />
            </div>

          </div>
          <div className='add-customer-content'>
            <div className='add-customer-container'>
              <a className='add-customer' onClick={handleAddCart}>+ Add to Cart</a>
            </div>
          </div>
        </section>
        {dataLoaded ? <TableSales data={productsCart} handleDeleteProduct={deleteProduct} /> : <p>cargando datos</p>}
        <section className='total-sale'>
          <span>Total: ${productsCart.reduce((total, p) => total + p.amount, 0)}</span>

        </section>

        {
          productsCart.length > 0 &&
          <div className='add-customer-content'>
            <div className='add-customer-container save-sale'>
              <a className='add-customer' onClick={handleSave}>Save</a>
            </div>
          </div>
        }


      </article>
      {showModal &&
        <PopupSales
          closeModal={setShowModal} data={productsCart} customers={customers}
          />}
    </main >
  );
}

export default Sales