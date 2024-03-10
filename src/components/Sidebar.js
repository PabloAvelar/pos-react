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
              <a onClick={(e) => navigate('/')} style={{cursor: 'pointer'}}>Dashboard</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon icon={faCubes} className='icon-sidebar'/>
              <a onClick={(e) => navigate('/products')} style={{cursor: 'pointer'}}>Products</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faCashRegister} />
              <a onClick={(e) => navigate('/sales')} style={{cursor: 'pointer'}}>Sales</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faUsers} />
              <a onClick={(e) => navigate('/clients')} style={{cursor: 'pointer'}}>Clients</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faTruck} />
              <a onClick={(e) => navigate('/suppliers')} style={{cursor: 'pointer'}}>Suppliers</a>
            </li>
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faChartLine} />
              <a onClick={(e) => navigate('/reports')} style={{cursor: 'pointer'}}>Reports</a>
            </li>


            <hr />
            <li className='page-ref'>
              <FontAwesomeIcon className='icon-sidebar' icon={faPowerOff} />
              <a onClick={handleLogout} style={{cursor: 'pointer'}} >Logout</a>
            </li>

          </ul>

        </div>

      </div>
    </div>
  );
}

export default Sidebar;