import { Fragment, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RenderExpiryDateAvailableColumn.scss';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { useGridApiContext } from '@mui/x-data-grid';
import { Context, initialGlobalState } from '../../../../Store';
import {
    buildErrorMessages,
    useDebounce
} from '../../../../CimHelpers';
import Inventory from '../../../../api/Inventory';
import Product from '../../../../api/Product';
import moment from 'moment';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

function SelectEditInputExpiryDateAvailableColumn(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const [globalState, setGlobalState] = useContext(Context);
    const [rowValue, setRowValue] = useState("");
    const [expiryDateAvailable, setExpiryDateAvailable] = useState([]);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    const handleChange = async (event, newValue) => {
        
        if (newValue != null) {
            // await apiRef.current.setEditCellValue({ id, field, value: moment(newDate).format('YYYY-MM-DD') });
            await Product.get(newValue.id).then((response) => {
                // console.log(response);
                let product = response?.data?.product;
                console.log(product);
                
               let newDataInv = {
                    id: id,
                    extProduct: product.id,
                    barcode: product.barcode,
                    description: product.description,
                    expiry_date: product.expiry_date,
                    product_category_id: product.product_category_id,
                    supplier_id: product.supplier_id,
                    product_type: product.type,
                    unit_per_case: product.unit_per_case
                }
                console.log('newDataInv', newDataInv)
                apiRef.current.updateRows([newDataInv]);

                // setTimeout(() => {
                //     apiRef.current.setRowMode(id, 'edit');
                // });
                const row = apiRef.current.getRow(id);
                console.log(' row ',row);
            }).catch((error) => {
                let message = buildErrorMessages(error?.response?.data?.message);

                setGlobalState({
                    ...globalState,
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
    };


    const getExpiryDateAvailable = () => {
        // console.log('getExpiryDateAvailable ', globalState.InvBarcodeOrDescChange);
        if (globalState.InvBarcodeOrDescChange?.barcode && globalState.InvBarcodeOrDescChange?.desc) {
            setGlobalState({
                ...globalState,
                globalLoader: {
                    ...globalState?.globalLoader,
                    open: true
                }
            });
            Inventory.getList(
                {
                    expiry_date_only: 1,
                    branchId: { value: globalState?.branches?.activeBranch?.id },
                    barcode: {
                        value: globalState.InvBarcodeOrDescChange.barcode
                    },
                    description: {
                        value: globalState.InvBarcodeOrDescChange.description
                    }
                }
            ).then((response) => {
                let inventories = response?.data?.inventories;
                let options = inventories.map((item, key) => {
                    return {
                        id: item.id,
                        label: moment(item.expiry_date).format('MM-YY')
                    };
                });

                setExpiryDateAvailable(options);
            }).catch((error) => {
                let message = buildErrorMessages(error?.response?.data?.message);

                setGlobalState({
                    ...globalState,
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
    }

    // Effect for API call
    useEffect(() => {
        getExpiryDateAvailable();
    }, [globalState.InvBarcodeOrDescChange]);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...expiryDateAvailable]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: '100%' }}
            open={open}
            onChange={handleChange}
            disabled={!globalState.InvBarcodeOrDescChange?.barcode && !globalState.InvBarcodeOrDescChange?.desc}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Available Expiry Dates"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

SelectEditInputExpiryDateAvailableColumn.propTypes = {
    /**
     * The column field of the cell that triggered the event.
     */
    field: PropTypes.string.isRequired,
    /**
     * The grid row id.
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.any,
};


const RenderExpiryDateAvailableColumn = (params) => {

    return <SelectEditInputExpiryDateAvailableColumn {...params} />;
};

export default RenderExpiryDateAvailableColumn
