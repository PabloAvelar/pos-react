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

  if (!auth.auth) {
    return <></>
  }

  return (

    <div className="container-fluid">

      <div className="span2">
        <div className="sidebar-nav">

          <ul className="nav-list">

            <li>
              <img className='fixed-logo' src={logo} style={{ width: '5em', height: '5em' }} />
              <p style={{ color: '#fff', fontSize: '1.2em' }}>BaseD</p>

            </li>
            <hr/>
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faChartLine} />
              <a href="#">Panel</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon icon={faCubes} className='icon-sidebar'/>
              <a href="products.php">Productos</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faCashRegister} />
              <a href="sales.php">Ventas</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faUsers} />
              <a href="customer.php">Clientes</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faTruck} />
              <a href="supplier.php">Proveedores</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faChartLine} />
              <a href="salesreport.php?d1=0&d2=0">Reportes</a>
            </li>


            <hr />
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faPowerOff} />
              <a onClick={handleLogout}>Cerrar Sesión</a>
            </li>

          </ul>

        </div>

      </div>
    </div>
  );
}

export default Sidebar;