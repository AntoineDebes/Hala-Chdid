import React from 'react';

import './App.scss';

import './assets/styles/style.scss';

import { CimLoader } from './components/primary/cim-loader/CimLoader.lazy';

import Store from './Store';

export default () => {
    return (
        <Store>
            <CimLoader />
        </Store>
    );
};
