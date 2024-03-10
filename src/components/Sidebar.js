import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faCashRegister, faUsers, faTruck, faChartLine, faLongArrowAltUp, faAnchorLock, faBacteria, faPowerOff, faAnkh, faGaugeMed, faBookSkull } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css';
import logo from '../images/logo.png';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
function Sidebar() {
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
    <div className="container-fluid">
      <div className="row-fluid">
        <div className="span2">
          <div className="well sidebar-nav">
            <ul className="nav nav-list">
            <li>
            <img className='fixed-logo' src={logo} style={{width: '120px', height: '120px'}} />
                <p style={{color: '#', fontSize: '35px'}}>BaseD</p>
              
              </li>
            <hr />
              <li>
                <FontAwesomeIcon icon={faChartLine} /> 
                <a href="#">Panel</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faCubes} /> 
                <a href="products.php">Productos</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faCashRegister} /> 
                <a href="sales.php">Ventas</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faUsers} /> 
                <a href="customer.php">Clientes</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faTruck} /> 
                <a href="supplier.php">Proveedores</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faChartLine} /> 
                <a href="salesreport.php?d1=0&d2=0">Reportes</a>
              </li>
             
             
              <hr />
              <li>
                <FontAwesomeIcon icon={faPowerOff} /> 
                <a onClick={handleLogout}>Cerrar Sesión</a>
              </li>
              <br/><br/><br/><br/><br/><br/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
