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
        raw_data.forEach((dato) => {
          dato.total_records = parseInt(dato.total_records);
        });
        setClientsData(raw_data);
        console.log(raw_data[0])
      })
      .catch((e) => {
        console.log("no se pudo", e);
      });

    statisticsService.getProductsSold()
      .then((dats) => {
        dats.forEach((dato) => {
          dato.total_records = parseInt(dato.total_records);
        });
        setProductsData(dats);
      })
      .catch((e) => {
        console.log("no se pudo nuv", e);
      });

    statisticsService.getNumSales()
      .then((datss) => {
        datss.forEach((dato) => {
          dato.total_records = parseInt(dato.total_records);
        });
        setSellsData(datss);
      })
      .catch((e) => {
        console.log("no se pudo nuv", e);
      });
  }, []);

  const renderChart = (data, ChartComponent, chartProps) => {
    if (data.length === 0) {
      return <p style={{ color: 'gray' }}>No data were found for the graphs</p>;
    }

    return (
      <ChartComponent {...chartProps} >;
        {chartProps.children}
      </ChartComponent>
    )
  };

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
            {renderChart(clientsData, PieChart, {
              width: 400,
              height: 300,
              children: (
                <>
                  <Pie
                    dataKey={"total_records"}
                    isAnimationActive={false}
                    data={clientsData}
                    cx="40%"
                    cy="50%"
                    outerRadius={125}
                    fill="#8C5340"
                    nameKey="customer_name"
                  />
                  <Tooltip />
                </>
              ),
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ marginRight: 80 }}>Artículos más vendidos</h3>
            {renderChart(productsData, PieChart, {
              width: 400,
              height: 300,
              children: (
                <>
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
                </>
              ),
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ marginRight: 80 }}>Clientes</h3>
            {renderChart(clientsData, BarChart, {
              width: 470,
              height: 320,
              data: clientsData,
              margin: { top: 5, right: 90, left: 5, bottom: 20 },
              barSize: 20,
              children: (
                <>
                  <XAxis dataKey="customer_name" scale="point" padding={{ left: 40, right: 40 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="total_records" fill="#8C5340" background={{ fill: '#eee' }} />
                </>
              ),
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Ventas totales</h3>
            {renderChart(sellsData, BarChart, {
              width: 470,
              height: 320,
              data: sellsData,
              margin: { top: 5, right: 90, left: 5, bottom: 20 },
              barSize: 20,
              children: (
                <>
                  <XAxis dataKey="date" scale="point" padding={{ left: 40, right: 40 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar name="Ventas" dataKey="total_records" fill="#8C5340" background={{ fill: '#eee' }} />
                </>
              ),
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Clientes frecuentes</h3>
            {renderChart(clientsData, ComposedChart, {
              layout: "vertical",
              width: 520,
              height: 350,
              data: clientsData,
              margin: { top: 5, right: 70, bottom: 20, left: 20 },
              children: (
                <>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis type="number" />
                  <YAxis dataKey="customer_name" type="category" scale="band" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_records" barSize={20} fill="#8C5340" />
                </>
              ),
            })}
          </div>
        </section>
      </article>
      {showModal && <PopupSuppliers closeModal={setShowModal} />}
    </main>
  );
}

export default Dashboard;
