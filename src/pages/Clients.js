import React, { useState, useEffect } from 'react'
import registerService from '../services/registerService';
import { useNavigate } from 'react-router-dom';

function Clients() {

  const [clientsRegistered, setClientsRegistered] = useState([]);

  useEffect(() => {
    // Cargando sólo una vez los clientes que hay
    registerService.getClients()
      .then((clients) => {
        setClientsRegistered(clients);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);
  return (

    <div className="container-fluid">

      <div className="row-fluid">

        <div className="span10">
          <div className="contentheader">
            <i className="icon-group"></i> Clientes
          </div>

          <br /><br />

          <div style={{ marginTop: -19, marginBottom: 21 }}>
            <a href="index.php"><button className="btn btn-default btn-large" style={{ float: 'left' }}><i
              className="icon icon-circle-arrow-left icon-large"></i> Regresar</button></a>
            <div style={{ textAlign: 'center' }}>
              Numero total de clientes: {clientsRegistered.length}
            </div>
          </div>
          <input type="text" name="filter" style={{ padding: 15 }} id="filter" placeholder="Search Customer..."
            autoComplete="off" />
          <a rel="facebox" href="addcustomer.php">add client</a>

          <table className="table table-bordered" id="resultTable" data-responsive="table" style={{ textAlign: 'left' }}>
            <thead>
              <tr>
                <th width="17%"> Nombre completo </th>
                <th width="10%"> Direccion </th>
                <th width="10%"> Numero de contacto</th>
                <th width="23%"> Nombre del producto</th>
                <th width="9%"> Total </th>
                <th width="17%"> Nota </th>
                <th width="9%"> Fecha de vencimiento </th>
                <th width="14%"> Accion </th>
              </tr>
            </thead>
            <tbody>
              {
                clientsRegistered.map(client => {
                  console.log(client);
                  return (
                    <tr className="record" key={client['customer_id']}>
                      <td>{client['customer_name']}</td>
                      <td>{client['address']}</td>
                      <td>{client['contact']}</td>
                      <td>{client['prod_name']}</td>
                      <td>${client['membership_number']}.00</td>
                      <td>{client['note']}</td>
                      <td>{client['expected_date']}</td>
                      
                      <td><a title="Click To Edit Customer" rel="facebox"
                        href="editcustomer.php?id=<?php echo $row['customer_id']; ?>"><button
                          className="btn btn-warning btn-mini"><i className="icon-edit"></i> Editar </button></a>
                        <a href="#" id="<?php echo $row['customer_id']; ?>" className="delbutton"
                          title="Click To Delete"><button className="btn btn-danger btn-mini"><i
                            className="icon-trash"></i> Eliminar</button></a>
                      </td>
                    </tr>
                  );
                })

              }

            </tbody>
          </table>
          <div className="clearfix"></div>

        </div>
      </div>
    </div>
  );
}

export default Clients