import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from './AuthContext';
import { EditButton, DeleteButton } from './Buttons';
import PopupSuppliers from './PopupSuppliers';
import suppliersService from '../services/suppliersService';

function TableProducts(data) {
    const [showModal, setShowModal] = useState(false);
    const [clientData, setClientData] = useState({});
    const auth = useAuth();

    const handleDeleteClient = (rowData) => {
        try{
            const data = new URLSearchParams({
                'suplier_id': rowData.suplier_id
            }).toString();

            suppliersService.deleteSupplier(data)
            .then((res) => {
                if (res.status === 'success'){
                    console.log("Customer deleted");
                    window.location.reload();
                }else{
                    console.log(res.status);
                }
            })
            .catch((e) => {
                console.error(e);
            })
        }catch($e){
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
        <section className='datatable-container'>

            <DataTable value={data["data"]} scrollable stripedRows editMode="row" dataKey="suplier_id" className='table-container'>
                <Column
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    header=""
                    style={{minWidth: 20}}
                    body={(rowData) => <DeleteButton onDeleteClick={() => handleDeleteClient(rowData)} />}
                >

                </Column>

                <Column
               field="suplier_address"
               headerClassName='table-column1-header'
               bodyClassName='table-column1-body'
               style={{minWidth: 20}}
               header="Brand name"
               >
                
                </Column>

                <Column
               field="suplier_address"
               headerClassName='table-column1-header'
               bodyClassName='table-column1-body'
               style={{minWidth: 20}}
               header="Generic name"
               >
                
                </Column>

                <Column
               field="suplier_address"
               headerClassName='table-column1-header'
               bodyClassName='table-column1-body'
               style={{minWidth: 20}}
               header="Category/Description"
               >
                
                </Column>

                <Column
               field="suplier_address"
               headerClassName='table-column1-header'
               bodyClassName='table-column1-body'
               style={{minWidth: 20}}
               header="Suplier"
               >
                
                </Column>

                <Column
               field="suplier_address"
               headerClassName='table-column1-header'
               bodyClassName='table-column1-body'
               style={{minWidth: 20}}
               header="Date of reception"
               >
                
                </Column>

               
                <Column
               field="suplier_address"
               headerClassName='table-column1-header'
               bodyClassName='table-column1-body'
               style={{minWidth: 100}}
               header="Expiration name"
               >
                
                </Column>


                {/* <Column headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    header=""
                    style={{minWidth: 20}}
                    body={(rowData) => <EditButton onEditClick={() => handleEditClient(rowData)} />}
                >

                </Column> */}
                
                <Column field="suplier_name"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{minWidth: 20}}
                    header="Original price"
                >

                </Column>
                <Column field="contact_person"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{minWidth: 100}}
                    header="Sales price"
                >

                </Column>
                <Column field="suplier_contact"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{minWidth: 100}}
                    header="Quantity"
                >

                </Column>
                <Column field="suplier_address"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{minWidth: 100}}
                    header="Remaining quantity"
                >

                </Column>
                <Column field="note"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{minWidth: 100}}
                    header="Total"
                >

                </Column>

                <Column field="note"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{minWidth: 100}}
                    header="Action"
                >

                </Column>
                
                
            </DataTable>

            {showModal && <PopupSuppliers closeModal={setShowModal} data={clientData} />}
        </section>

    )
}

export default TableProducts