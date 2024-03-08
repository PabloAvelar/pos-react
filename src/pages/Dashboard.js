import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';


function Dashboard() {
  let navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  }

  if (!auth.auth){
    return <></>
  }
  return (
    <div>
      <p>Dashboard</p>
      <p>hola {auth.auth.username}</p>
      <button onClick={handleLogout}>cerrar sesion</button>

    </div>

  )
}

export default Dashboard;