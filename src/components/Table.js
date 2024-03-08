import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useAuth} from '../components/AuthContext';

function Table(data) {
    console.log(data["data"]);
    const auth = useAuth();

    if (!auth.auth){
        return <></>
    }
    return (
        <div>
            <p>hola {auth.auth.username}</p>
            
            <DataTable value={data["data"]} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="customer_id" bodyStyle={{textAlign: 'left'}} header="ID" ></Column>
                <Column field="customer_name" bodyStyle={{textAlign: 'left'}} header="Full Name" ></Column>
                <Column field="address" bodyStyle={{textAlign: 'left'}} header="Address"></Column>
                <Column field="contact" bodyStyle={{textAlign: 'left'}} header="Phone Number"></Column>
                <Column field="membership_number" bodyStyle={{textAlign: 'left'}} header="Membership Number"></Column>
                <Column field="prod_name" bodyStyle={{textAlign: 'left'}} header="Product"></Column>
                <Column field="total" bodyStyle={{textAlign: 'left'}} header="Total"></Column>
                <Column field="note" bodyStyle={{textAlign: 'left'}} header="Note"></Column>
            </DataTable>

        </div>

    )
}

export default Table