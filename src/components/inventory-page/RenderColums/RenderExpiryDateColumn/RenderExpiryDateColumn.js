import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './RenderExpiryDateColumn.scss';

import { Select } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useGridApiContext } from '@mui/x-data-grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';



function SelectEditInputExpiryDateColumn(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const [dateValue, setDateValue] = useState(new Date(props.expiry_date));
    const handleChange = async (newDate) => {
        // props.expiry_date = newDate; 
        setDateValue(newDate);
        await apiRef.current.setEditCellValue({ id, field, value: moment(newDate).format('YYYY-MM-DD') });

        // await apiRef.current.setEditCellValue({ id, field, value: newDate });
        //   apiRef.current.stopCellEditMode({ id, field });
    };

    // console.log('field', field);
    // console.log('inventory', globalState?.inventory);


    return (
        <div>
            {
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <DesktopDatePicker
                        inputFormat="MM-yy"
                        value={dateValue}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                        views= {['year', 'month']}
                    />
                </LocalizationProvider>

            }
        </div>
    );
}

SelectEditInputExpiryDateColumn.propTypes = {
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


const RenderExpiryDateColumn = (params) => {

    return <SelectEditInputExpiryDateColumn {...params} />;
};

export default RenderExpiryDateColumn
