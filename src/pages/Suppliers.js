import React, { useState, useEffect } from 'react'
import TableSuppliers from '../components/TableSuppliers';
import '../styles/clients.css';
import PopupClients from '../components/PopupClients';
import suppliersService from '../services/suppliersService';

function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Cargando sólo una vez los clientes que hay
    suppliersService.getSuppliers()
      .then((clients) => {
        setSuppliers(clients);
        setDataLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  console.log(suppliers);
  return (

    <main className="page-container">
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

      {dataLoaded ? <TableSuppliers data={suppliers} /> : <p>cargando datos</p>}
      {showModal && <PopupClients closeModal={setShowModal} />}

    </main>
  );
}

export default Suppliers