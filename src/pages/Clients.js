import React, { useState, useEffect } from 'react'
import registerService from '../services/registerService';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import '../styles/clients.css';
import PopupClients from '../components/PopupClients';
import clientsService from '../services/clientsService';

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
      <section className='clients-container'>
        <div className='page-title-container'>
          <span className='page-title'>Customers</span>
        </div>
        <div className='add-customer-content'>
          <div className='add-customer-container'>
            <a className='add-customer' onClick={()=>{
              setShowModal(true);
            }}>+ Add Customer</a>
          </div>
        </div>
      </section>

      {dataLoaded ? <Table data={clientsRegistered} /> : <p>cargando datos</p>}
      {showModal && <PopupClients closeModal={setShowModal}/>}

    </main>
  );
}

export default Clients