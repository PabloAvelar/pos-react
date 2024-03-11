import React, { useState, useEffect } from 'react'
import TableReports from '../components/TableReports';
import '../styles/tableproducts.css';
// import PopupReports from '../components/PopupReports';
import reportsService from '../services/reportsService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Reports() {

  const [reports, setReports] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Cargando sólo una vez los clientes que hay
    reportsService.getReports()
      .then((clients) => {
        setReports(clients);
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
            <span className='page-title'>Reports</span>
          </div>
        
        </section>
        {dataLoaded ? <TableReports data={reports} /> : <p>cargando datos</p>}
      </article>
      
      {/* {showModal && <PopupReports closeModal={setShowModal} />} */}

    </main>
  );
}


export default Reports