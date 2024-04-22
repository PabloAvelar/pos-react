import React, { useState, useEffect } from 'react'
import TableProducts from '../components/TableProducts';
import '../styles/tableproducts.css';
import PopupProducts from '../components/PopupProducts';
import productsService from '../services/productsService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import suppliersService from '../services/suppliersService';

function Products() {

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getData(){
      try {
        const getproducts = await productsService.getProducts();
        const getsuppliers = await suppliersService.getSuppliers();
        setProducts(getproducts)
        setSuppliers(getsuppliers);
        setDataLoaded(true);

      } catch (error) {
        console.error(error);
      }
    }

      getData();
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
        {dataLoaded ? <TableProducts data={products} suppliers={suppliers} /> : <p>cargando datos</p>}
      </article>
      
      {showModal && <PopupProducts closeModal={setShowModal} suppliers={suppliers} />}

    </main>
  );
}


export default Products