import React, { useState, useEffect } from 'react'
import TableSuppliers from '../components/TableSuppliers';
import '../styles/clients.css';
import PopupSuppliers from '../components/PopupSuppliers';
import suppliersService from '../services/suppliersService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Dashboard() {

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

      <aside>
        <Sidebar />
      </aside>

      <article className='page-content-container'>
        <Header />
        <section className='clients-container'>
          <div className='page-title-container'>
            <span className='page-title'>Dashboard</span>
          </div>
          
        </section>
        <section style={{width: '100wv'}}>
          <p>¡Proximamente!</p>
        </section>
      </article>
      
      {showModal && <PopupSuppliers closeModal={setShowModal} />}

    </main>
  );
}

export default Dashboard