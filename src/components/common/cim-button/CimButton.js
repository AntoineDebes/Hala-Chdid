import * as React from 'react';

import './CimButton.scss';

import Button from '@mui/material/Button';

export default (props) => {
    // console.log(props);
    
    return (
        <Button
            id={props?.id}
            onClick={props?.onClick}
            className={props?.id + "-class"}
        >
            {
                props?.iconType === 'material' ? props?.icon: 
                    <img
                    src={props?.icon}
                    className={ props?.id + "-icon"}
                />
            }
         
        </Button>
    );
}