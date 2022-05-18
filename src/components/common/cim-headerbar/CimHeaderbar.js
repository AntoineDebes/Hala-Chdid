import React from 'react';

import './CimHeaderbar.scss';

import { LeftMenu } from './left-menu/LeftMenu.lazy';

import { RightMenu } from './right-menu/RightMenu.lazy';

export default (props) => {

    return (
        <header className='inventory-header'>
            <LeftMenu buttons={props?.buttons} />
            <RightMenu />
        </header>
    );
}