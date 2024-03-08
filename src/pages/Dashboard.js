import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [token, setToken] = useState('');
  let navigate = useNavigate();
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
        navigate("/");
    }
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    setToken(null);
    navigate("/");
    // Refrescando la página
    window.location.reload(false);
  }

  return (
    <div>
      <p>Dashboard</p>
      <button onClick={handleLogout}>cerrar sesion</button>

    </div>

  )
}

export default Dashboard;