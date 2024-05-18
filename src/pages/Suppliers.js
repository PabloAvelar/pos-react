import React, { useState, useEffect, useRef } from 'react'
import TableSuppliers from '../components/TableSuppliers';
import '../styles/clients.css';
import PopupSuppliers from '../components/PopupSuppliers';
import suppliersService from '../services/suppliersService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function Suppliers() {

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
      const getSuppliers = await suppliersService.getSuppliers();
      setSuppliers(getSuppliers)
      setDataLoaded(true);

    } catch (error) {
      console.log(error)
      // Aquí pudieras poner una notificación para cuando no carguen los datos

    }
  }

  useEffect(() => {
    getData()
  }, []);

  const handleSupplierAdded = async (title, message, type, duration) => {
    await getData();
    showNotification(title, message, type, duration);
    setShowModal(false);
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
            <span className='page-title'>Suppliers</span>
          </div>
          <div className='add-customer-content'>
            <div className='add-customer-container'>
              <a className='add-customer' onClick={() => {
                setShowModal(true);
              }}>+ Add Supplier</a>
            </div>
          </div>
        </section>
        {dataLoaded ? <TableSuppliers data={suppliers} onSupplierAdded={handleSupplierAdded} /> : <p>cargando datos</p>}
      </article>

      {showModal && <PopupSuppliers displayModal={setShowModal} onSupplierAdded={handleSupplierAdded} />}

    </main>
  );
}

export default Suppliers