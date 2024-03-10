import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from './AuthContext';
import { EditButton, DeleteButton } from './Buttons';
import PopupClients from './PopupClients';
import '../styles/tableclients.css';

function TableClients(data) {
    const [showModal, setShowModal] = useState(false);
    const [clientData, setClientData] = useState({});
    const auth = useAuth();

    const handleDeleteClient = (rowData) => {
        console.log(rowData)
    }

    const handleEditClient = (rowData) => {
        setClientData(rowData);
        setShowModal(true);
    }

    if (!auth.auth) {
        return <></>
    }
    return (
        <section className='datatable-container'>

            <DataTable value={data["data"]} scrollable stripedRows editMode="row" dataKey="customer_id" className='table-container'>
                <Column
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header=""
                    style={{minWidth: 20}}
                    body={(rowData) => <DeleteButton onDeleteClick={() => handleDeleteClient(rowData)} />}
                >

                </Column>
                <Column headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header=""
                    style={{minWidth: 20}}
                    body={(rowData) => <EditButton onEditClick={() => handleEditClient(rowData)} />}
                >

                </Column>
                <Column field="customer_name"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 190}}
                    header="Full Name"
                >

                </Column>
                <Column field="address"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 250}}
                    header="Address"
                >

                </Column>
                <Column field="contact"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 100}}
                    header="Phone"
                >

                </Column>
                <Column field="membership_number"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 130}}
                    header="Membership"
                >

                </Column>
                <Column field="prod_name"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 130}}
                    header="Product"
                >

                </Column>
                <Column field="note"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 330}}
                    header="Note"
                >

                </Column>
            </DataTable>

            {showModal && <PopupClients closeModal={setShowModal} data={clientData} />}
        </section>

    )
}

export default TableClients