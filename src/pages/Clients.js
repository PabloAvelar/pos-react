import React, { useState, useEffect } from 'react'
import TableClients from '../components/TableClients';
import '../styles/clients.css';
import PopupClients from '../components/PopupClients';
import clientsService from '../services/clientsService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Clients() {

  const [clientsRegistered, setClientsRegistered] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Cargando sólo una vez los clientes que hay
    clientsService.getClients()
      .then((clients) => {
        setClientsRegistered(clients);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  return (

    <main className="page-container">

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
        {dataLoaded ? <TableClients data={clientsRegistered} /> : <p>cargando datos</p>}
      </article>


      {showModal && <PopupClients closeModal={setShowModal} />}

    </main>
  );
}

export default Clients