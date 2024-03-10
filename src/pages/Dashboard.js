import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Sidebar from '../components/Sidebar';
import '../styles/sidebar.css';
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
    
    
    <Sidebar>
    <p>Dashboard</p>
      <p>PINCHES VIEJAS PUTAS {auth.auth.username}</p>
      
      
      </Sidebar>
    </div>

  )
}

export default Dashboard;