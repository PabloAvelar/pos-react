import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAuth } from './AuthContext';
import { EditButton, DeleteButton } from './Buttons';
import PopupProducts from './PopupProducts';
import productsService from '../services/productsService';


function TableProducts({ data, onProductDeleted, onProductAdded, suppliers }) {
    const [showModal, setShowModal] = useState(false);
    const [clientData, setClientData] = useState({});

    const auth = useAuth();

    useEffect(() => {
        data.map((p) => {
            p.total = p.o_price * p.qty
        })

    }, [data])

    const handleDeleteClient = (rowData) => {
        try {
            const id = rowData.product_id;

            productsService.deleteProduct(id)
                .then((res) => {
                    if (res.status === 'success') {
                        console.log("Product deleted");
                        onProductDeleted();
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

            <DataTable value={data} scrollable stripedRows editMode="row" dataKey="product_id" className='table-container'>
                <Column
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    header=""
                    style={{ minWidth: 20 }}
                    body={(rowData) => <DeleteButton onDeleteClick={() => handleDeleteClient(rowData)} />}
                >

                </Column>

                <Column headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    header=""
                    style={{ minWidth: 20 }}
                    body={(rowData) => <EditButton onEditClick={() => handleEditClient(rowData)} />}
                >

                </Column>

                <Column
                    field="product_code"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 150 }}
                    header="Code"
                >

                </Column>

                <Column
                    field="gen_name"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 120 }}
                    header="Generic name"
                >

                </Column>

                <Column
                    field="product_name"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Category/Description"
                >

                </Column>

                <Column
                    field="Supplier.supplier_name"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Supplier"
                >

                </Column>

                <Column
                    field="date_arrival"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 100 }}
                    header="Receipt date"
                >

                </Column>

                <Column field="o_price"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Original price"
                >

                </Column>
                <Column field="price"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 20 }}
                    header="Sales price"
                >

                </Column>
                <Column field="qty"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 10 }}
                    header="Quantity"
                >

                </Column>
                <Column field="onhand_qty"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 70 }}
                    header="Remaining quantity"
                >

                </Column>
                <Column field="total"
                    headerClassName='table-column1-header'
                    bodyClassName='table-column1-body'
                    style={{ minWidth: 40 }}
                    header="Total"
                >

                </Column>

            </DataTable>

            {showModal && <PopupProducts onProductAdded={onProductAdded} displayModal={setShowModal} data={clientData} suppliers={suppliers} />}
        </section>

    )
}

export default TableProducts