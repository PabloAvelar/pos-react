import React, { useState, useEffect } from 'react'
import TableProducts from '../components/TableProducts';
import '../styles/tableproducts.css';
import PopupProducts from '../components/PopupProducts';
import productsService from '../services/productsService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Products() {

  const [products, setProducts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    
    productsService.getProducts()
      .then((clients) => {
        setProducts(clients);
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
        {dataLoaded ? <TableProducts data={products} /> : <p>cargando datos</p>}
      </article>
      
      {showModal && <PopupProducts closeModal={setShowModal} />}

    </main>
  );
}


export default Products