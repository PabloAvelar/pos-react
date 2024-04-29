import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ComposedChart } from "recharts";
import TableSuppliers from '../components/TableSuppliers';
import '../styles/clients.css';
import PopupSuppliers from '../components/PopupSuppliers';
import suppliersService from '../services/suppliersService';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import statisticsService from '../services/statisticsService';

function Dashboard() {
  const [suppliers, setSuppliers] = useState([]);
  const [_data1, set_Data1] = useState([]);
  const [_data2, set_Data2] = useState([]);
  const [_data3, set_Data3] = useState([]);
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
        set_Data1(tilin);
      })
      .catch((e) => {
        console.log("no se pudo", e);
      });
  }, []);

  statisticsService.getProductsSold()
      .then((dats) => {
        set_Data2(dats);
      })
      .catch((e) => {
        console.log("no se pudo nuv", e);
      });

      statisticsService.getNumSales()
      .then((datss) => {
        set_Data3(datss);
      })
      .catch((e) => {
        console.log("no se pudo nuv", e);
      });


  

  console.log(suppliers);

  const data = [
    { name: "Facebook", value: 2000 },
    { name: "Instagram", value: 3000 },
    { name: "TikTok", value: 1000 },
  ];

 

  const data2 = [
    {
      name: 'Page A',
      uv: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: 'Page B',
      uv: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: 'Page C',
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: 'Page D',
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: 'Page E',
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: 'Page F',
      uv: 1400,
      pv: 680,
      amt: 1700,
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
              <h1 style={{marginRight: 80}}>Ventas</h1>
              <PieChart width={400} height={300}>
                <Pie
                  dataKey="date"
                  isAnimationActive={false}
                  data={_data3}
                  cx="40%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8C5340"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
            <div>
              
            <h1 style={{marginRight: 80}}>Artículos más vendidos</h1>
              <PieChart width={400} height={300}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx="40%"
                  cy="50%"
                  outerRadius={110}
                  fill="#8C5340"
                  label
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
                data={_data1}
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
                data={_data2}
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
                height={400}
                data={_data2}
                margin={{ top: 5, right: 70, bottom: 20, left: 20 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" />
                <YAxis dataKey="product_name" type="category" scale="band" />
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
