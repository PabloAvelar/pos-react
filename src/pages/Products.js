import React, { useState, useEffect, useRef } from 'react'
import TableProducts from '../components/TableProducts';
import '../styles/tableproducts.css';
import PopupProducts from '../components/PopupProducts';
import productsService from '../services/productsService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import suppliersService from '../services/suppliersService';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function Products() {

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const notificationShownRef = useRef(false); // Referencia para notificación
  

  const showNotification = (title, message, type, duration) => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: duration,
        onScreen: true
      }
    });
  };

  const getData = async () => {
    try {
      const getproducts = await productsService.getProducts();
      const getsuppliers = await suppliersService.getSuppliers();
      setProducts(getproducts);
      setSuppliers(getsuppliers);
      setDataLoaded(true);

      // Checando nivel inventario en cantidad de productos
      let stock_qty = getproducts.length;

      // Verifica si la notificación ya se mostró
      if (!notificationShownRef.current) {
        if (stock_qty > 0 && stock_qty < 7) {
          showNotification("¡Pocos productos en stock!", "Quedan " + stock_qty + " productos.", "warning", 30000);
        } else if (stock_qty === 0) {
          showNotification("¡No hay productos en stock!", "Es necesario ingresar nuevos productos", "danger", 30000);
        }

        // Marca que la notificación se ha mostrado
        notificationShownRef.current = true;
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleProductAdded = async (title, message, type, duration) => {
    await getData();
    showNotification(title, message, type, duration);
    setShowModal(false);
  };

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
            <span className='page-title'>Products</span>
          </div>
          <div className='add-customer-content'>
            <div className='add-customer-container'>
              <a className='add-customer' onClick={() => {
                setShowModal(true);
              }}>+ Add Products</a>
            </div>
          </div>
        </section>
        {dataLoaded ? <TableProducts data={products} suppliers={suppliers} /> : <p>cargando datos</p>}
      </article>

      {showModal && <PopupProducts
      displayModal={setShowModal}
      suppliers={suppliers}
      onProductAdded={handleProductAdded}
      />}

    </main>
  );
}


export default Products