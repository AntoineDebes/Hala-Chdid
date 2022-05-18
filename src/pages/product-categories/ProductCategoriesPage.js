import { useContext, useEffect, useState } from 'react';

import './ProductCategoriesPage.scss';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import { Context, initialGlobalState } from '../../Store';

import ProductCategory from '../../api/ProductCategory';

import { Button, Container } from '@mui/material';

import { Add } from '@mui/icons-material';

import { FORMS_DIALOG_TITLES, FORMS_NAMES } from '../../Constants';

import { CimHeaderbar } from '../../components/common/cim-headerbar/CimHeaderbar.lazy';

import EditIcon from '@mui/icons-material/Edit';
import { buildErrorMessages } from '../../CimHelpers';

const ProductCategoriesPage = (props) => {
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
            headerName: 'Category',
            width: 200
        },
        {
            id: 'product-categories-actions',
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

        ProductCategory.getList().then((response) => {
            let data = response?.data?.['product-categories'].map((item, key) => {
                return {
                    id: 'product-category-row-' + key,
                    ...item
                };
            });

            setRows(data);
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
            dialog: {
                ...initialGlobalState?.dialog,
                title: FORMS_DIALOG_TITLES.productCategoryAddForm,
                open: true,
                form: {
                    ...globalState?.dialog?.form,
                    id: FORMS_NAMES.productCategoryAddForm,
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
                title: FORMS_DIALOG_TITLES.productCategoryEditForm,
                open: true,
                form: {
                    ...globalState?.dialog?.form,
                    id: FORMS_NAMES.productCategoryEditForm,
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

export default ProductCategoriesPage;