import React, { useState, useEffect } from 'react'
import '../styles/receipt.css';
// import '../styles/clients.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../components/AuthContext';
import logo from '../images/logo.png';
import TableReceipt from '../components/TableReceipt';
import { useLocation } from 'react-router-dom';

function Receipt({ route, navigate }) {
  const location = useLocation();
  const data = location.state
  const [total, setTotal] = useState(0);
  const auth = useAuth();

  useEffect(() => {
    let totalMoney = 0;
    data.map((element) => {
      totalMoney += element.amount
    })
    setTotal(totalMoney);

  }, [])

  const handlePrint = () => {
    window.print()
  }

  return (

    <main className="page-container">

      <aside>
        {/* <Sidebar /> */}
      </aside>

      <article className='page-content-container'>
        {/* <Header /> */}
        <section className='recepit-container'>
          <div className='page-title-container'>
            <span className='page-title'>Thank you for your purchase!</span>
          </div>

          <div className='recepit-header'>
            <img src={logo} style={{ width: '10em', height: '10em' }} />
            <div className='receipt-description'>
              <p style={{ fontWeight: 'bold', fontSize: '1.5em', color: "#593325" }}>Sale Receipt</p>
              <p style={{ color: "#593325", fontWeight: '600' }}>Base D</p>
              <p style={{ color: "#593325", fontWeight: '600' }}>SIT WITH LUXURY</p>
            </div>

          </div>

        </section>
        <section className='recepit-info'>
          <a
            style={{
              background: '#bf8339',
              color: 'white',
              width: 100,
              cursor: 'pointer',
              borderRadius: 15,
              padding: 5}}
              
              onClick={handlePrint}>
                
                Imprimir</a>
          {/* <p>Date: {dataForSalesOrder.date}</p> */}
        </section>
        {data ? <TableReceipt data={data} /> : <p>cargando datos</p>}

        <section className='cash-container'>
          <div className='cash'>
            <div className='cash-item'>
              <p>Total: </p>
              <p>${total}</p>
            </div>

            <div className='cash-item'>
              <p>Cash Tendered: </p>
              <p>${data[0].customerMoney}</p>
            </div>

            <div className='cash-item cash-change'>
              <p>Change: </p>
              <p>${data[0].customerMoney - total}</p>
            </div>
          </div>
        </section>

      </article>
    </main >
  );
}

export default Receipt