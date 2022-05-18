import { useContext, useEffect, useState } from 'react';

import './SuppliersPage.scss';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import Supplier from '../../api/Supplier';

import { Context, initialGlobalState } from '../../Store';

import { Button, Container } from '@mui/material';

import { Add } from '@mui/icons-material';

import { FORMS_DIALOG_TITLES, FORMS_NAMES } from '../../Constants';
import { CimHeaderbar } from '../../components/common/cim-headerbar/CimHeaderbar.lazy';

import EditIcon from '@mui/icons-material/Edit';
import { buildErrorMessages } from '../../CimHelpers';

const SuppliersPage = (props) => {
    const [globalState, setGlobalState] = useContext(Context);
    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'number',
            headerName: 'Number',
            width: 200
        },
        {
            field: 'name',
            headerName: 'Supplier',
            width: 200
        },
        {
            id: 'suppliers-actions',
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: (row) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => openEditForm(row.row)}
                        color="inherit"
                    />
                ];
            }
        }
    ];

    useEffect(() => {

        loadData();
    }, []);

    const loadData = () => {
        setGlobalState({
            ...globalState,
            globalLoader: {
                ...globalState?.globalLoader,
                open: true
            }
        });

        Supplier.getList().then((response) => {
            let suppliers = response?.data?.suppliers.map((item, key) => {
                return {
                    id: 'supplier-row-' + key,
                    ...item
                };
            });

            setRows(suppliers);
        }).catch((error) => {
            let message = buildErrorMessages(error?.response?.data?.message);

            setGlobalState({
                notificationBar: {
                    ...globalState?.notificationBar,
                    open: true,
                    text: message,
                    severity: "error"
                },
                globalLoader: globalState?.globalLoader
            });
        }).finally(() => {

            setGlobalState({
                ...globalState,
                globalLoader: initialGlobalState?.globalLoader
            });
        });
    }

    const openAddForm = () => {
        setGlobalState({
            ...globalState,
            dialog: {
                ...initialGlobalState?.dialog,
                title: FORMS_DIALOG_TITLES.supplierAddForm,
                open: true,
                form: {
                    ...globalState?.dialog?.form,
                    id: FORMS_NAMES.supplierAddForm,
                    submitCallback: loadData,
                }
            }
        });
    }

    const openEditForm = (row) => {
        setGlobalState({
            ...globalState,
            dialog: {
                ...initialGlobalState?.dialog,
                title: FORMS_DIALOG_TITLES.supplierEditForm,
                open: true,
                form: {
                    ...globalState?.dialog?.form,
                    id: FORMS_NAMES.supplierEditForm,
                    data: row,
                    submitCallback: loadData,
                }
            }
        });
    }

    return (
        <Container
            maxWidth={false}
            className="no-padding-h"
        >
         <CimHeaderbar />
            <Container
                maxWidth={false}
                className="btns-container no-padding-h"
            >
                <Button
                    className="add-btn"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => openAddForm()}
                >
                    Add
                </Button>
            </Container>
            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                />
            </div>
        </Container>
    );
}

export default SuppliersPage;