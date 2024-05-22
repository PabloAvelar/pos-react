import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from './AuthContext';
import { EditButton, DeleteButton } from './Buttons';
import PopupSuppliers from './PopupSuppliers';
import '../styles/tableclients.css';

function TableSales({data, handleDeleteProduct}) {
    const [showModal, setShowModal] = useState(false);
    const [clientData, setClientData] = useState({});
    const auth = useAuth();

    const handleDeleteClient = (rowData) => {
        // console.log(handleDeleteProduct);
        handleDeleteProduct(rowData.product_id);
    }

    if (!auth.auth) {
        return <></>
    }

    return (
        <section className='datatable-container' style={{
            height: '40%',
            overflowY: 'auto',
        }}>

            <DataTable value={data} scrollable stripedRows editMode="row" dataKey="product_id" className='table-container'>
                <Column
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    header=""
                    style={{ minWidth: 20 }}
                    body={(rowData) => <DeleteButton onDeleteClick={() => handleDeleteClient(rowData)} />}
                >

                </Column>
                <Column field="product_name"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 160 }}
                    header="Product"
                >

                </Column>
                <Column field="gen_name"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 140 }}
                    header="Gen. Name"
                >

                </Column>
                <Column field="product_code"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 50 }}
                    header="Product Code"
                >

                </Column>
                <Column field="price"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 50 }}
                    header="Price"
                >

                </Column>
                <Column field="quantity"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 50 }}
                    header="Quantity"
                >

                </Column>

                <Column field="amount"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 50 }}
                    header="Amount"
                >

                </Column>

            </DataTable>
            
            {showModal && <PopupSuppliers closeModal={setShowModal} data={clientData} />}
            
        </section>

    )
}

export default TableSales