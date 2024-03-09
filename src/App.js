import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Reports from './pages/Reports';
import React, { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(null);

  // Cargar el token al inicio
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }else{
      
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Para el login */}
          <Route path="/" element={token ? <Dashboard/> : <Login />} />

          {/* Otras rutas protegidas */}
          <Route path="/sales" element={token ? <Sales/> : <Login />} />
          <Route path="/products" element={token ? <Products/> : <Login />} />
          <Route path="/reports" element={token ? <Reports/> : <Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
