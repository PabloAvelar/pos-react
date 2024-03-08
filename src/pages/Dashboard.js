import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [token, setToken] = useState('');
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
    }
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    setToken(null);
    // Otras acciones de cierre de sesión si es necesario
  }

  return (
    <div>
      <p>Dashboard</p>
      <button onClick={handleLogout}>cerrar sesion</button>

    </div>

  )
}

export default Dashboard;