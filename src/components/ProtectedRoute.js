import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

function ProtectedRoute({children}) {
    let navigate = useNavigate();
    const [token, setToken] = useState(null);
  
    // Cargar el token al inicio
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }else{
        navigate('/');
      }
    }, [navigate]);
    
  return <>{token !== null && children}</>;
}

export default ProtectedRoute;