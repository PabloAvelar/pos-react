import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Table(data) {
    console.log(data["data"]);

    return (
        <div>
            <p>hola</p>
            
            <DataTable value={data["data"]} showGridlines tableStyle={{  }}>
                <Column field="customer_name" header="Full Name" style={{minWidth: '0'}}></Column>
                <Column field="address" header="Address"></Column>
                <Column field="phonenumber" header="Phone Number"></Column>
                <Column field="product" header="Product"></Column>
                <Column field="total" header="Total"></Column>
                <Column field="note" header="Note"></Column>
            </DataTable>

        </div>

    )
}

export default Table