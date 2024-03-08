import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Reports from './pages/Reports';
import React, { useEffect, useState } from 'react';
import { useAuth } from './components/AuthContext';

function ProtectedRoute({children}){
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    // waiting for auth to be defined
    if (auth !== undefined && auth.auth === null){
      // if not authenticated
      navigate('/');
      window.location.reload(false);
    }
  }, [auth, navigate]);

  return <>{auth.auth !== null && children}</>
}

function App() {
  // const [token, setToken] = useState(null);
  const auth = useAuth();

  // // Cargar el token al inicio
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }else{
      
  //   }
  // }, []);



  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Para el login */}
          <Route path="/" element={auth.auth === null ? <Login/> : <Dashboard />} />

          {/* Otras rutas protegidas */}
          <Route path="/sales" element={<ProtectedRoute><Sales/></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports/></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
