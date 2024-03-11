import React, { useState, useEffect } from 'react'
import TableProducts from '../components/TableProducts';
import '../styles/tableproducts.css';
import PopuProducts from '../components/PopuProducts';
import suppliersService from '../services/suppliersService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Products() {

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
        {dataLoaded ? <TableProducts data={suppliers} /> : <p>cargando datos</p>}
      </article>
      
      {showModal && <PopuProducts closeModal={setShowModal} />}

    </main>
  );
}


export default Products