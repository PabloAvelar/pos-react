import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from './AuthContext';
import { EditButton, DeleteButton } from './Buttons';
import PopupProducts from './PopupProducts';
import productsService from '../services/productsService';

function TableReports({ data }) {
    const [showModal, setShowModal] = useState(false);
    const [clientData, setClientData] = useState({});
    const auth = useAuth();

    if (!auth.auth) {
        return <></>
    }

    return (
        <section className='datatable-container' style={{
            height: '77%',
            overflowY: 'auto',
        }}>

            <DataTable value={data} scrollable stripedRows editMode="row" dataKey="transaction_id" className='table-container'>

                <Column
                    field="transaction_id"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="ID"
                >

                </Column>

                <Column
                    field="Customer.customer_name"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Customer"
                >

                </Column>

                <Column
                    field="Product.product_name"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Product"
                >

                </Column>

                <Column
                    field="qty"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Quantity"
                >

                </Column>

                <Column
                    field="amount"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Amount"
                >

                </Column>

                <Column
                    field="price"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Price"
                >

                </Column>

                <Column field="date"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Date"
                >

                </Column>

            </DataTable>

            {showModal && <PopupProducts closeModal={setShowModal} data={clientData} />}
        </section>

    )
}

export default TableReports