import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Table(data) {

    return (
        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="action" header="Action"></Column>
            <Column field="fullname" header="Full Name"></Column>
            <Column field="address" header="Address"></Column>
            <Column field="phonenumber" header="Phone Number"></Column>
            <Column field="product" header="Product"></Column>
            <Column field="total" header="Total"></Column>
            <Column field="note" header="Note"></Column>
        </DataTable>
    )
}

export default Table