import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ComposedChart } from "recharts";
import '../styles/clients.css';
import PopupSuppliers from '../components/PopupSuppliers';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import statisticsService from '../services/statisticsService';

function Dashboard() {
  const [clientsData, setClientsData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [sellsData, setSellsData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    statisticsService.getFrequentCostumers()
      .then((raw_data) => {
        // Para transformar total_records a entero
        raw_data.forEach((dato) => {
          dato.total_records = parseInt(dato.total_records)
        })
        setClientsData(raw_data);
      })
      .catch((e) => {
        console.log("no se pudo", e);
      });

    statisticsService.getProductsSold()
      .then((dats) => {
        // Para transformar total_records a entero
        dats.forEach((dato) => {
          dato.total_records = parseInt(dato.total_records)
        })
        setProductsData(dats);
      })
      .catch((e) => {
        console.log("no se pudo nuv", e);
      });

    statisticsService.getNumSales()
      .then((datss) => {
        // Para transformar total_records a entero
        datss.forEach((dato) => {
          dato.total_records = parseInt(dato.total_records)
        })

        setSellsData(datss);
      })
      .catch((e) => {
        console.log("no se pudo nuv", e);
      });

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
            <span className='page-title'>Dashboard</span>
          </div>
        </section>
        <section
          style={{
            height: '77%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            justifyContent: 'center',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ marginRight: 80 }}>Clientes frecuentes</h3>
            <PieChart width={400} height={300} data={clientsData}>
              <Pie
                dataKey={"total_records"}
                isAnimationActive={false}
                data={clientsData}
                cx="40%"
                cy="50%"
                outerRadius={125}
                fill="#8C5340"
                nameKey='customer_name'
              />
              <Tooltip />
            </PieChart>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ marginRight: 80 }}>Artículos más vendidos</h3>
            <PieChart width={400} height={300} data={productsData}>
              <Pie
                dataKey="total_records"
                isAnimationActive={false}
                data={productsData}
                cx="40%"
                cy="50%"
                outerRadius={125}
                fill="#8C5340"
                nameKey='product_name'
              />
              <Tooltip />
            </PieChart>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ marginRight: 80 }}>Clientes</h3>
            <BarChart
              width={470}
              height={320}
              data={clientsData}
              margin={{ top: 5, right: 90, left: 5, bottom: 20 }}
              barSize={20}
            >
              <XAxis dataKey="customer_name" scale="point" padding={{ left: 40, right: 40 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="total_records" fill="#8C5340" background={{ fill: '#eee' }} />
            </BarChart>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Ventas totales</h3>
            <BarChart
              width={470}
              height={320}
              data={sellsData}
              margin={{ top: 5, right: 90, left: 5, bottom: 20 }}
              barSize={20}
            >
              <XAxis dataKey="date" scale="point" padding={{ left: 40, right: 40 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar name="Ventas" dataKey="total_records" fill="#8C5340" background={{ fill: '#eee' }} />
            </BarChart>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Clientes frecuentes</h3>
            <ComposedChart
              layout="vertical"
              width={520}
              height={350}
              data={clientsData}
              margin={{ top: 5, right: 70, bottom: 20, left: 20 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number" />
              <YAxis dataKey="customer_name" type="category" scale="band" />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_records" barSize={20} fill="#8C5340" />
            </ComposedChart>
          </div>

        </section>
      </article>
      {showModal && <PopupSuppliers closeModal={setShowModal} />}
    </main>
  );
}

export default Dashboard;
