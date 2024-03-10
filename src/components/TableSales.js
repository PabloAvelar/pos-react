import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from './AuthContext';
import { EditButton, DeleteButton } from './Buttons';
import PopupSuppliers from './PopupSuppliers';
import '../styles/tableclients.css';

function TableSales(data) {
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

            <DataTable value={data["data"]} scrollable stripedRows editMode="row" dataKey="suplier_id" className='table-container'>
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
                <Column field="suplier_name"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 190}}
                    header="Supplier"
                >

</Column>
                <Column field="contact_person"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 100}}
                    header="Contact Name"
                >

</Column>
                <Column field="suplier_contact"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 100}}
                    header="Contact"
                >

                </Column>
                <Column field="suplier_address"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{minWidth: 250}}
                    header="Address"
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

            {showModal && <PopupSuppliers closeModal={setShowModal} data={clientData} />}
        </section>

    )
}

export default TableSales