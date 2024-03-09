import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from '../components/AuthContext';
import { EditButton, DeleteButton } from './Buttons';
import PopupClients from './PopupClients';
import '../styles/table.css';

function Table(data) {
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
        <div>

            <DataTable value={data["data"]} stripedRows editMode="row" dataKey="customer_id" className='table-container'>
                <Column
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header="Delete"
                    body={(rowData) => <DeleteButton onDeleteClick={() => handleDeleteClient(rowData)} />}
                >

                </Column>
                <Column headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header="Edit"
                    body={(rowData) => <EditButton onEditClick={() => handleEditClient(rowData)} />}
                >

                </Column>
                <Column field="customer_name"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header="Full Name"
                >

                </Column>
                <Column field="address"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header="Address"
                >

                </Column>
                <Column field="contact"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header="Phone Number"
                >

                </Column>
                <Column field="membership_number"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header="Membership Number"
                >

                </Column>
                <Column field="prod_name"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header="Product"
                >

                </Column>
                <Column field="note"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header="Note"
                >

                </Column>
            </DataTable>

            {showModal && <PopupClients closeModal={setShowModal} data={clientData} />}
            
        </div>

    )
}

export default Table