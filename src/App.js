import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Reports from './pages/Reports';
import ProtectedRoute from './components/ProtectedRoute';
import React, { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(null);

  // Cargar el token al inicio
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Para el login */}
          <Route path="/" element={<Dashboard />} />

          {/* Otras rutas protegidas */}
          <Route path="/sales" element={<Sales />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
