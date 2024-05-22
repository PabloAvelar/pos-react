import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from './AuthContext';
import { EditButton, DeleteButton } from './Buttons';
import PopupSuppliers from './PopupSuppliers';
import '../styles/tableclients.css';

function TableReceipt({ data }) {
    const auth = useAuth();

    if (!auth.auth) {
        return <></>
    }

    return (
        <section className='datatable-container' style={{
            height: '77%',
            overflowY: 'auto',
        }}>

            <DataTable value={data} scrollable stripedRows editMode="row" dataKey="product_id" className='table-container'>

                <Column field="product_code"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 50 }}
                    header="Product Code"
                >

                </Column>
                <Column field="product_name"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 80 }}
                    header="Product Name"
                >

                </Column>
                <Column field="qty"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 50 }}
                    header="Quantity"
                >

                </Column>
                <Column field="customer"
                    headerClassName='table-column-header'
                    bodyClassName='table-column-body'
                    style={{ minWidth: 50 }}
                    header="Customer"
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

        </section>

    )
}

export default TableReceipt