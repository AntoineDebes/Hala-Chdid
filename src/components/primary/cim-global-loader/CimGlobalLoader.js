import React, { useContext } from 'react';

import './CimGlobalLoader.scss';

import {
    Backdrop,
    CircularProgress
} from '@mui/material';

import { Context } from '../../../Store';

export default (props) => {

    const [globalState] = useContext(Context);

    return (
        <Backdrop
            id="CIM-global-loader"
            open={globalState?.globalLoader?.open}
            className={globalState?.modal?.open ? 'CIM-global-loader-over-modal' : ''}
        >
            <CircularProgress
                size={50}
            />
        </Backdrop>
    );
};
