import { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RenderDescriptionColumn.scss';

import { Checkbox, FormControlLabel, Select, TextField } from '@mui/material';

import { useGridApiContext } from '@mui/x-data-grid';
import { Context } from '../../../../Store';
import {
    useDebounce
} from '../../../../CimHelpers';


function SelectEditInputDescriptionColumn(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const [globalState, setGlobalState] = useContext(Context);
    const [rowValue, setRowValue] = useState("");

    const handleChange = (event) => {
        setRowValue(event.target.value);
    };
    const [isSearching, setIsSearching] = useState(false);

    const debouncedSearchTerm = useDebounce(rowValue, 500);


    const setDataTo = async () => {
        console.log('rowValue', rowValue)
        setGlobalState({
            ...globalState,
            InvBarcodeOrDescChange: {
                ...globalState.InvBarcodeOrDescChange,
                desc: rowValue,
            }
        });
        await apiRef.current.setEditCellValue({ id, field, value: rowValue });
    };

    // Effect for API call
    useEffect(
        () => {
            console.log('use ss')
            if (debouncedSearchTerm) {
                setIsSearching(true);
                setDataTo();
            } else {
                setIsSearching(false);
            }
        },
        [debouncedSearchTerm] // Only call effect if debounced search term changes
    );

    return (
        <div>
            {
                <FormControlLabel control={<TextField onChange={handleChange} value={rowValue} />} />
            }
        </div>
    );
}

SelectEditInputDescriptionColumn.propTypes = {
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


const RenderDescriptionColumn = (params) => {

    return <SelectEditInputDescriptionColumn {...params} />;
};

export default RenderDescriptionColumn
