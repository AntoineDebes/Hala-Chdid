import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { GridActionsCellItem, GridToolbarContainer, useGridApiContext, useGridApiRef } from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
    randomId,
} from '@mui/x-data-grid-generator';

import './InventoryPage.scss';

import { CimHeaderbar } from '../../components/common/cim-headerbar/CimHeaderbar.lazy';
import { CimButton } from '../../components/common/cim-button/CimButton.lazy';

import ReloadIcon from './../../assets/images/reload.svg';
import SearchIcon from './../../assets/images/search.svg';
import GoToIcon from './../../assets/images/goto.svg';
import HeaderDeleteIcon from './../../assets/images/delete.svg';
import ExportToExcelIcon from './../../assets/images/export-to-excel.svg';

import { Body as InventoryBody } from '../../components/inventory-page/body/Body.lazy';
import Inventory from '../../api/Inventory';
import { Context, initialGlobalState } from '../../Store';
import { Footerbar } from '../../components/inventory-page/footerbar/Footerbar.lazy';

import MoveUpIcon from '@mui/icons-material/MoveUp';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { buildErrorMessages, isFunction } from '../../CimHelpers';
import { Button, Select } from '@mui/material';
import { RenderSupplierColumn } from '../../components/inventory-page/RenderColums/RenderSupplierColumn/RenderSupplierColumn.lazy';
import { RenderProductTypeColumn } from '../../components/inventory-page/RenderColums/RenderProductTypeColumn/RenderProductTypeColumn.lazy';
import { RenderProductCategoryColumn } from '../../components/inventory-page/RenderColums/RenderProductCategoryColumn/RenderProductCategoryColumn.lazy';
import { RenderExpiryDateColumn } from '../../components/inventory-page/RenderColums/RenderExpiryDateColumn/RenderExpiryDateColumn.lazy';
import moment from 'moment';

function useApiRef(columnsProp) {
    const apiRef = useGridApiRef();
    const columns = useMemo(
        () =>
            columnsProp.concat({
                // hide: true,
                // initialHide: true,
                field: '__HIDDEN__',
                width: 1,
                renderCell: (params) => {
                    apiRef.current = params?.api;
                    return null;
                },
            }),
        [columnsProp],
    );

    return { apiRef, columns };
}

function EditToolbar(props) {
    const { apiRef } = props;

    const handleClick = () => {
        // const id = randomId();
        const id = 'new-column';
        const field = 'barcode';
        if (isFunction(apiRef.current.updateRows)) {
            apiRef.current.updateRows([{ id, isNew: true }]);
            // apiRef.current.startRowEditMode({ id });
            apiRef.current.setCellMode(
                id,
                field,
                'edit',
            );
            apiRef.current.setRowMode(id, 'edit');
            // Wait for the grid to render with the new row
            setTimeout(() => {
                apiRef.current.scrollToIndexes({
                    rowIndex: apiRef.current.getRowsCount() - 1,
                });

                apiRef.current.setCellFocus(id, field);
            });
        };
    }
    return null;
    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add New
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    apiRef: PropTypes.shape({
        current: PropTypes.object.isRequired,
    }).isRequired,
};


const InventoryPage = (props) => {
    const [globalState, setGlobalState] = useContext(Context);
    const [data, setData] = useState([]);
    const apiRef = useGridApiRef();
    // console.log('globalState ', globalState);

    const deleteUser = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setData((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    );

    const toggleAdmin = React.useCallback(
        (id) => () => {
            setData((prevRows) =>
                prevRows.map((row) =>
                    row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
                ),
            );
        },
        [],
    );

    const duplicateUser = React.useCallback(
        (id) => () => {
            setData((prevRows) => {
                const rowToDuplicate = prevRows.find((row) => row.id === id);
                return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
            });
        },
        [],
    );

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id, field) => (event) => {

        event.stopPropagation();

        apiRef.current.setCellMode(
            id,
            field,
            'edit',
        );
        apiRef.current.setRowMode(id, 'edit');
    };
    const handleSaveNewClick = (id, rows) => async (event) => {
        event.stopPropagation();
        apiRef.current.commitRowChange(id);
        const activeBranch = globalState?.branches?.activeBranch?.id;
        const user = JSON.parse(JSON.stringify(globalState.user)).data;
        const row = apiRef.current.getRow(id);
        // console.log('user',user)

        const appendData = {
            operation_type: 'in',
            branch_id: activeBranch,
            created_by: user.id
        }

        const data = {
            ...appendData,
            ...row
        }

        // data['']
        setGlobalState({
            ...globalState,
            globalLoader: {
                ...globalState?.globalLoader,
                open: true
            }
        });


        console.log('data ', data)

        apiRef.current.updateRows([{ ...row, isNew: false }]);
        Inventory.create(data).then((response) => {
            setGlobalState({
                notificationBar: {
                    ...globalState?.notificationBar,
                    open: true,
                    text: "Inventory has been created successfully",
                    severity: "success"
                }
            });
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
            apiRef.current.setRowMode(id, 'view');
            setGlobalState({
                ...globalState,
                globalLoader: initialGlobalState?.globalLoader
            });
        });

    };


    const handleSaveClick = (id) => async (event) => {
        event.stopPropagation();
        apiRef.current.commitRowChange(id);
        const activeBranch = globalState?.branches?.activeBranch?.id;
        const user = JSON.parse(JSON.stringify(globalState.user)).data;
        const row = apiRef.current.getRow(id);
        // console.log('user',user)

        // const appendData = {
        //     operation_type: 'in',
        //     branch_id: activeBranch,
        //     created_by: user.id
        // }

        const data = {
            ...row
        }

        // data['']
        setGlobalState({
            ...globalState,
            globalLoader: {
                ...globalState?.globalLoader,
                open: true
            }
        });


        console.log('data ', data)

        Inventory.update(row.inventory_id, data).then((response) => {
            apiRef.current.setRowMode(id, 'view');
            setGlobalState({
                notificationBar: {
                    ...globalState?.notificationBar,
                    open: true,
                    text: "Inventory has been updated successfully",
                    severity: "success"
                }
            });
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

    };

    const handleDeleteClick = (id, params) => (event) => {
        event.stopPropagation();

        let row = params.row
        setGlobalState({
            ...globalState,
            globalLoader: {
                ...globalState?.globalLoader,
                open: true
            }
        });

        Inventory.delete(row.inventory_id).then((response) => {
            apiRef.current.updateRows([{ id, _action: 'delete' }]);
            setGlobalState({
                notificationBar: {
                    ...globalState?.notificationBar,
                    open: true,
                    text: "Inventory has been deleted successfully",
                    severity: "success"
                }
            });
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


    };


    const handleDeleteNewClick = (id) => (event) => {
        event.stopPropagation();
        // console.log(id)
        apiRef.current.updateRows([{ id, _action: 'delete' }]);
    };

    const handleCancelClick = (id, field) => (event) => {
        event.stopPropagation();

        apiRef.current.setCellMode(
            id,
            field,
            'view',
        );
        apiRef.current.setRowMode(id, 'view');
    };
    const colsWidth = {
        width: 150,
        headerClassName: 'inventory-app-theme--header',
        cellClassName: (params) => {
            
            const row = params.row;
            const field = params.field;
            const id = params.id;
           
            let randStyle= '';
            if(id % 2){
                randStyle= 'dark_green';
            }else{
                randStyle= 'light_green';
            }
            // const randStyle = Math.floor(Math.random() * 2) + 1

            let cellStyle = row?.row_format?.length != 0  ? row.row_format : randStyle;
            cellStyle = isFunction(apiRef.current.getRowMode) && apiRef.current.getRowMode(id) === 'edit' ? 'edit-mode' : cellStyle;
            // console.log('cellStyle ', cellStyle)
            switch (field) {
                case 'unit_per_case':
                    cellStyle = cellStyle + ' italic'
                    break;
                case 'quantity_pcs':
                    cellStyle = cellStyle + ' bold'
                    break;
                case 'quantity_box':
                    cellStyle = cellStyle + ' bold'
                    break;
            
                default:
                    break;
            }
            return cellStyle
        } 

    };

    const cols = [
        {
            id: 'inventory-table-1',
            field: 'id',
            headerName: 'ID',
            editable: false,
            ...colsWidth
        },
        {
            id: 'inventory-table-2',
            field: 'barcode',
            headerName: 'Barcode',
            editable: true,
            ...colsWidth
        },
        {
            id: 'inventory-table-3',
            field: 'supplier_id',
            headerName: 'Supplier',
            editable: true,
            ...colsWidth,
            renderCell: ({ row }) => {
                // console.log('row ', row)
                return row.supplier_name;
            },
            renderEditCell: RenderSupplierColumn,
        },
        {
            id: 'inventory-table-4',
            field: 'product_type',
            headerName: 'Type',
            editable: true,
            ...colsWidth,
            renderCell: ({ row }) => { return row.product_type === 'food' ? "Food" : "Non Food" },
            renderEditCell: RenderProductTypeColumn,
        },
        {
            id: 'inventory-table-5',
            field: 'product_category_id',
            headerName: 'Category',
            editable: true,
            ...colsWidth,
            renderCell: ({ row }) => { return row.category_name },
            renderEditCell: RenderProductCategoryColumn,
        },
        {
            id: 'inventory-table-6',
            field: 'description',
            headerName: 'Description',
            editable: true,
            ...colsWidth,
        },
        {
            id: 'inventory-table-7',
            field: 'expiry_date',
            type: 'text',
            headerName: 'Expiry Date',
            editable: true,
            ...colsWidth,
            renderCell: ({ row }) => {
                return row?.expiry_date == null ? '-' : moment(row?.expiry_date).format('MM-YY');
            },
            renderEditCell: RenderExpiryDateColumn
        },
        {
            id: 'inventory-table-8',
            field: 'unit_per_case',
            headerName: 'Unit/Case',
            editable: true,
            ...colsWidth
        },
        {
            id: 'inventory-table-9',
            field: 'quantity_pcs',
            type: 'number',
            headerName: 'Qty(Pcs)',
            editable: true,
            ...colsWidth,
        },
        {
            id: 'inventory-table-10',
            field: 'quantity_box',
            type: 'number',
            headerName: 'Qty(Box)',
            editable: true,
            ...colsWidth,
        },
        {
            id: 'inventory-table-11',
            field: 'notes',
            headerName: 'Notes',
            editable: true,
            ...colsWidth,
        },
        {
            id: 'inventory-actions',
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            ...colsWidth,
            renderCell: (row) => {
                // console.log(row);
                apiRef.current = row?.api;
                const id = row.id
                let field = 'barcode'
                let isInEditMode = false;
                let checkNew = false;
                if (isFunction(apiRef.current.getRowMode)) {
                    isInEditMode = apiRef.current.getRowMode(id) === 'edit'
                }
                if (isFunction(apiRef.current.getRow)) {
                    checkNew = apiRef.current.getRow(id);
                }
                if (isInEditMode) {
                    if (checkNew?.isNew) {
                        // console.log(row);
                        return [
                            <GridActionsCellItem
                                icon={<SaveIcon />}
                                key="save"
                                label="Save"
                                onClick={handleSaveNewClick(id, row)}
                                color="primary"
                            />,
                            <GridActionsCellItem
                                icon={<DeleteIcon />}
                                key="delete"
                                label="Delete"
                                onClick={handleDeleteNewClick(id)}
                                color="inherit"
                            />
                        ];
                    } else {
                        return [

                            <GridActionsCellItem
                                icon={<SaveIcon />}
                                key="save"
                                label="Save"
                                onClick={handleSaveClick(id)}
                                color="primary"
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon />}
                                key="cancel"
                                label="Cancel"
                                className="textPrimary"
                                onClick={handleCancelClick(id, field)}
                                color="inherit"
                            />,
                        ];
                    }
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        key="edit"
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id, field)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        key="delete"
                        label="Delete"
                        onClick={handleDeleteClick(id, row)}
                        color="inherit"
                    />,
                ];
            }
        }
    ];

    // const { columns, apiRef } = useApiRef(cols);
    const columns = cols;


    useEffect(() => {
        loadData();
        console.log(globalState);
        if (globalState.gridToReload === true) {
            loadData()
        }
    }, [globalState.gridToReload]);
    // Let's add a data resetter/randomizer to help

    const handleClickOpen = () => {
        setGlobalState({
            ...globalState,
            dialog: {
                ...globalState?.dialog,
                title: "Go To",
                open: true
            }
        })
    };
    const handleReloadGrid = () => {
        loadData()
    };

    const handleTransferData = () => {
        const activeBranch = globalState?.branches?.activeBranch?.id;
        const data = {
            branch_id: activeBranch
        }

        // data['']
        setGlobalState({
            ...globalState,
            globalLoader: {
                ...globalState?.globalLoader,
                open: true
            }
        });


        Inventory.transfer(data).then((response) => {
            setGlobalState({
                notificationBar: {
                    ...globalState?.notificationBar,
                    open: true,
                    text: "Inventory has been Transferred successfully",
                    severity: "success"
                }
            });
            loadData();
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
    };

    const loadData = () => {
        setGlobalState({
            ...globalState,
            globalLoader: {
                ...globalState?.globalLoader,
                open: true
            }
        });

        Inventory.getList(
            { 
                branchId: { value: globalState?.branches?.activeBranch?.id }
            }, [
                'product.supplier',
                'product.productCategory',
        ] ).then((response) => {
            let inventories = response?.data?.inventories;
            setData([])
            if (response?.data?.inventories.length == 0) {
                inventories = [{
                    "id": "inventory-row-hidden",
                    "inventory_id": 0,
                    "product_id": 0,
                    "barcode": "",
                    "product_type": "",
                    "description": "",
                    "expiry_date": "",
                    "unit_per_case": "",
                    "operation_id": 0,
                    "quantity_pcs": 0,
                    "quantity_box": 0,
                    "total_quantity_pcs": 0,
                    "total_quantity_box": 0,
                    "operation_type": "hide",
                    "notes": "notes...",
                    "operation_created_at": "",
                    "operation_updated_at": "",
                    "supplier_id": 0,
                    "supplier_number": "",
                    "supplier_name": "",
                    "product_category_id": 0,
                    "category_number": "",
                    "category_name": "",
                    "branch_id": 0,
                    "branch_name": ""
                }]
            } else {
                inventories = inventories.map((item, key) => {
                    key++;
                    return {
                        id: 'inventory-row-' + key,
                        inventory_id: item.id,
                        supplier_name: item.product.supplier.name,
                        category_name: item.product.product_category.name,
                        ...item
                    };
                });
            }
            setData(inventories);
        }).catch((error) => {

        }).finally(() => {
            setGlobalState({
                ...globalState,
                globalLoader: initialGlobalState?.globalLoader,
                gridToReload: false
            });
        });
    }

    return (
        <div>
            <CimHeaderbar
                buttons={
                    <>
                        <li>
                            <CimButton id="reload-btn" icon={ReloadIcon} onClick={handleReloadGrid}></CimButton>
                        </li>
                        <li>
                            <CimButton id="search-btn" icon={SearchIcon}></CimButton>
                        </li>
                        <li>
                            <CimButton id="goto-btn" icon={GoToIcon} onClick={handleClickOpen}></CimButton>
                        </li>
                        <li>
                            <CimButton id="delete-btn" icon={HeaderDeleteIcon}></CimButton>
                        </li>
                        <li>
                            <CimButton id="export-to-excel-btn" icon={ExportToExcelIcon}></CimButton>
                        </li>

                        <li>
                            <CimButton id="transfer-btn" icon={<MoveUpIcon />} iconType="material" onClick={handleTransferData} ></CimButton>
                        </li>
                    </>
                }
            />
            <Box
                sx={{
                    height: 400,
                    width: 1,
                    '& .MuiDataGrid-cell--editable': {
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
                    },
                }}
            >
                <InventoryBody
                    columns={columns}
                    data={data}
                    isCellEditable={({ id, field }) => {
                        if (isFunction(apiRef.current.getRowMode)) {
                            return apiRef.current.getRowMode(id) === 'edit'
                        }
                    }}
                    onCellClick={({ id, field, isEditable }) => {

                        if (isFunction(apiRef.current.getRowMode)) {
                            if (apiRef.current.getRowMode(id) === 'edit' && isEditable) {
                                apiRef.current.setCellMode(
                                    id,
                                    field,
                                    'edit',
                                );
                            }
                        }
                    }}
                    apiRef={apiRef}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    components={{
                        Toolbar: EditToolbar,
                    }}
                    componentsProps={{
                        toolbar: { apiRef },
                    }}
                    onSelectionModelChange={(id) => {
                        // setSelectionModel(id);
                        // const selectedIDs = new Set(id);
                        // const selectedRowData = estudiantes.filter((row) =>
                        //     selectedIDs.has(row.id)
                        // );
                        // setEstudiantesData(selectedRowData)
                    }}
                />
            </Box>
            <Footerbar />
        </div>
    );
};

export default InventoryPage;
