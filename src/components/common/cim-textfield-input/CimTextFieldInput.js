import React, { useState } from 'react';

import './CimTextFieldInput.scss';

import { FormControl, FormGroup, TextField } from '@mui/material';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    var stateKey = props?.stateKey ?? '';
    var valueFromProp = props?.value ?? '';

    const [value, setValue] = useState(valueFromProp);

    const handleChange = (e) => {
        e.persist();

        setValue(e?.target?.value);

        props.handleChange(e, stateKey);
    };

    return (
        <FormGroup  sx={{ m: 1 }}>
            <FormControl>
                <TextField
                    {...props}
                    variant="outlined"
                    value={value}
                    onChange={(e) => handleChange(e)}
                    sx={{ m: 1}}
                />
            </FormControl>
        </FormGroup>
    );
};
