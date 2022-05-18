import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './RenderWareHouseColumn.scss';

import { Checkbox, FormControlLabel, Select } from '@mui/material';

import { useGridApiContext } from '@mui/x-data-grid';
import { Context } from '../../../../Store';



function SelectEditInputWareHouseColumn(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const [globalState, setGlobalState] = useContext(Context);
    const activeBranch = globalState?.branches?.activeBranch?.id;
    const values = {
        1: 2,
        2:1
    }
    const [checkedValue, setCheckedValue] = useState(activeBranch == 1 && props.warehouse == 2 ? true : activeBranch == 2 && props.warehouse == 1);

  
  
    const handleChange = async (event) => {// mtayleb
        console.log('event ',event);
        if (event.target.checked) {
            setCheckedValue(true);
            await apiRef.current.setEditCellValue({ id, field, value: values[activeBranch] });
        }else{
            setCheckedValue(false);
            await apiRef.current.setEditCellValue({ id, field, value: 0 });
        }
    };

    return (
        <div>
            {
                <FormControlLabel control={<Checkbox checked={checkedValue} onChange={handleChange} />} />
            }
        </div>
    );
}

SelectEditInputWareHouseColumn.propTypes = {
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


const RenderWareHouseColumn = (params) => {

    return <SelectEditInputWareHouseColumn {...params} />;
};

export default RenderWareHouseColumn
