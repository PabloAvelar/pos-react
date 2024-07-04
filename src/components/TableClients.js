import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from './AuthContext';
import { EditButton, DeleteButton } from './Buttons';
import PopupClients from './PopupClients';
import '../styles/tableclients.css';
import clientsService from '../services/clientsService';

function TableClients({ data, onClientAdded, onClientDeleted }) {

    const [showModal, setShowModal] = useState(false);
    const [clientData, setClientData] = useState({});
    const auth = useAuth();

    const handleDeleteClient = (rowData) => {
        try {
            const id = rowData.customer_id;

            clientsService.deleteClient(id)
                .then((res) => {
                    if (res.status === 'success') {
                        onClientDeleted()
                    } else {
                        throw new Error('The operation failed. Status is not success');
                    }
                })
                .catch((e) => {
                    console.error(e);
                })
        } catch ($e) {
            console.error($e);
        }
    }

    const handleEditClient = (rowData) => {
        setClientData(rowData);
        setShowModal(true);
    }

    if (!auth.auth) {
        return <></>
    }
    return (
        <section className='datatable-container' style={{
            height: '77%',
            overflowY: 'auto',
        }}>

            <DataTable value={data} scrollable stripedRows editMode="row" dataKey="customer_id" className='table-container'>
                <Column
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header=""
                    style={{ minWidth: 20 }}
                    body={(rowData) => <DeleteButton onDeleteClick={() => handleDeleteClient(rowData)} />}
                >

                </Column>
                <Column headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header=""
                    style={{ minWidth: 20 }}
                    body={(rowData) => <EditButton onEditClick={() => handleEditClient(rowData)} />}
                >

                </Column>
                <Column field="customer_name"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 190 }}
                    header="Full Name"
                >

                </Column>
                <Column field="address"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 250 }}
                    header="Address"
                >

                </Column>
                <Column field="contact"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 100 }}
                    header="Phone"
                >

                </Column>
                <Column field="membership_number"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 130 }}
                    header="Membership"
                >

                </Column>
            </DataTable>

            {showModal && <PopupClients displayModal={setShowModal} data={clientData} onClientAdded={onClientAdded} />}
        </section>

    )
}

export default TableClients