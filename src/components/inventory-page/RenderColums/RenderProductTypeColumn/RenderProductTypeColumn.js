import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './RenderProductTypeColumn.scss';

import { Select } from '@mui/material';

import { useGridApiContext } from '@mui/x-data-grid';
import { Context } from '../../../../Store';



function SelectEditInputProductTypeColumn(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const [globalState, setGlobalState] = useContext(Context);

    const handleChange = async (event) => {
        await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
        //   apiRef.current.stopCellEditMode({ id, field });
    };

    // console.log('field', field);
    // console.log('inventory', globalState?.inventory);


    return (
        <div>
        {
            globalState?.inventory?.suppliers.length > 0 && (
                <Select
                    value={value}
                    onChange={handleChange}
                    size="small"
                    sx={{ height: 1 }}
                    native
                    autoFocus
                >
                     <option value="">None</option>
                    {
                          globalState?.inventory?.product_type?.map((type, index) => (
                            <option key={"product-type-select-item-" + index} value={type.value}  >{type.label}</option>
                        ))
                    }
                </Select>
            )
        }
    </div>
    );
}

SelectEditInputProductTypeColumn.propTypes = {
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


const RenderProductTypeColumn = (params) => {

    return <SelectEditInputProductTypeColumn {...params} />;
};

export default RenderProductTypeColumn
