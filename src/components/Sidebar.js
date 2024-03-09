import React from 'react';
import '../styles/sidebar.css';

function Sidebar() {
  return (
    <div className="container-fluid">
      <div className="row-fluid">
        <div className="span2">
          <div className="well sidebar-nav">
            <ul className="nav nav-list">
              <li className="active">
                <a href="#">Panel</a>
              </li>
              <li>
                <a href="products.php">Productos</a>
              </li>
              <li>
                <a href="customer.php">Clientes</a>
              </li>
              <li>
                <a href="supplier.php">Proveedores</a>
              </li>
              <li>
                <a href="salesreport.php?d1=0&d2=0">Reporte de ventas</a>
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
