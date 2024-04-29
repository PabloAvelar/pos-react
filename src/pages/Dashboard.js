import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ComposedChart } from "recharts";
import TableSuppliers from '../components/TableSuppliers';
import '../styles/clients.css';
import PopupSuppliers from '../components/PopupSuppliers';
import suppliersService from '../services/suppliersService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import statisticsService from '../services/statisticsService';
import clientsService from '../services/clientsService';

function Dashboard() {
  const [suppliers, setSuppliers] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [sellsData, setSellsData] = useState([]);
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
      });

    statisticsService.getFrequentCostumers()
      .then((tilin) => {
        setClientsData(tilin);
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

  const data1 = [
    { name: "Facebook", value: 2000 },
    { name: "Instagram", value: 900 },
    { name: "TikTok", value: 1000 },
    { name: "XDXD", value: 1000 },
  ];

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];



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
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '80vh' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h1 style={{ marginRight: 80 }}>Ventas</h1>
              <PieChart width={400} height={300} data={sellsData}>
                <Pie
                  dataKey={"total_records"}
                  isAnimationActive={false}
                  data={sellsData}
                  cx="40%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8C5340"
                  nameKey='date'
                />
                <Tooltip />
              </PieChart>
            </div>
            <div>

              <h1 style={{ marginRight: 80 }}>Artículos más vendidos</h1>
              <PieChart width={400} height={300} data={productsData}>
                <Pie
                  dataKey="total_records"
                  isAnimationActive={false}
                  data={productsData}
                  cx="40%"
                  cy="50%"
                  outerRadius={110}
                  fill="#8C5340"
                  nameKey='product_name'
                />
                <Tooltip />
              </PieChart>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h1>Clientes </h1>
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
            <div>
              <h1>Ventas totales</h1>
              <BarChart
                width={470}
                height={320}
                data={clientsData}
                margin={{ top: 5, right: 90, left: 5, bottom: 20 }}
                barSize={20}
              >
                <XAxis dataKey="product_name" scale="point" padding={{ left: 40, right: 40 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="total_records" fill="#8C5340" background={{ fill: '#eee' }} />
              </BarChart>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div>
              <h1>Clientes frecuentes</h1>
              <ComposedChart
                layout="vertical"
                width={500}
                height={500}
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
          </div>

        </section>
      </article>
      {showModal && <PopupSuppliers closeModal={setShowModal} />}
    </main>
  );
}

export default Dashboard;
