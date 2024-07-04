import React, { useState, useEffect, useRef } from 'react'
import TableClients from '../components/TableClients';
import '../styles/clients.css';
import PopupClients from '../components/PopupClients';
import clientsService from '../services/clientsService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function Clients() {

  const [clientsRegistered, setClientsRegistered] = useState([]);
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
      const getClients = await clientsService.getClients();
      setClientsRegistered(getClients)
      setDataLoaded(true);

    } catch (error) {
      console.log(error)
      // Aquí pudieras poner una notificación para cuando no carguen los datos

    }
  }

  useEffect(() => {
    getData()
  }, []);

  const handleSupplierDeleted = async () => {
    await getData();
    showNotification('Deleted!', 'The customer has been deleted successfully', 'success', 5000);
  }

  const handleClientAdded = async (title, message, type, duration) => {
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
            <span className='page-title'>Customers</span>
          </div>
          <div className='add-customer-content'>
            <div className='add-customer-container'>
              <a className='add-customer' onClick={() => {
                setShowModal(true);
              }}>+ Add Customer</a>
            </div>
          </div>
        </section>
        {dataLoaded ? <TableClients data={clientsRegistered} onClientDeleted={handleSupplierDeleted} onClientAdded={handleClientAdded} /> : <p>cargando datos</p>}
      </article>


      {showModal && <PopupClients displayModal={setShowModal} onClientAdded={handleClientAdded} />}

    </main>
  );
}

export default Clients