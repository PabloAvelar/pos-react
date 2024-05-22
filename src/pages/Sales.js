import React, { useState, useEffect, useRef } from 'react'
import '../styles/clients.css';
import '../styles/uniqueStyleSales.css';
import PopupSales from '../components/PopupSales';
import productsService from '../services/productsService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TableSales from '../components/TableSales';
import { useAuth } from '../components/AuthContext';
import clientsService from '../services/clientsService';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function Sales() {

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  const [productsCart, setProductsCart] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const auth = useAuth();
  const notificationShownRef = useRef(false); // Referencia para notificación

  const showNotification = (title, message, type) => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 10000,
        onScreen: true
      }
    });
  };


  const getData = async () => {
    try {
      const getproducts = await productsService.getProducts();
      const getClients = await clientsService.getClients();
      setProducts(getproducts);
      setCustomers(getClients);

      // asignando el primer producto en el select por defecto
      setProductSelected(getproducts[0])

      // Checando nivel inventario en cantidad de productos
      let stock_qty = getproducts.length;
      // Verifica si la notificación ya se mostró
      if (!notificationShownRef.current) {
        if (stock_qty > 0 && stock_qty < 7) {
          showNotification("¡Pocos productos en stock!", "Quedan " + stock_qty + " productos.", "warning");
        } else if (stock_qty === 0) {
          showNotification("¡No hay productos en stock!", "Es necesario ingresar nuevos productos", "danger");
        }

        // Marca que la notificación se ha mostrado
        notificationShownRef.current = true;
      }

      setDataLoaded(true);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData()
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
  }

  const deleteProduct = (id) => {
    const newObjects = productsCart.filter(p => p.product_id !== id);

    // Actualizando productos en carrito
    setProductsCart(newObjects);
  }


  return (

    <main className="page-container">
      <ReactNotifications />
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
              {
                productSelected !== undefined &&
                <input type="number" className='selection' id="quantity" name="quantity" min="1" max={productSelected.onhand_qty} onChange={(e) => setProductsQuantity(e.target.value)} />
              }
            </div>

          </div>
          <div className='add-customer-content'>
            {productSelected !== undefined &&
              <div className='add-customer-container'>
                <a className='add-customer' onClick={handleAddCart}>+ Add to Cart</a>

              </div>
            }
          </div>
        </section>
        {dataLoaded ? <TableSales data={productsCart} handleDeleteProduct={deleteProduct} /> : <p>cargando datos</p>}
        <section className='total-sale'>
          <span>Total: ${productsCart.reduce((total, p) => total + p.amount, 0)}</span>

        </section>

        {
          productsCart.length > 0 && productSelected !== undefined &&
          <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: 15
          }}>
            <div className='add-customer-container save-sale'
            style={{
            }}>
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