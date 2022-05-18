import React, { useContext } from 'react';

import { Context, initialGlobalState } from '../../../../Store';
import CimBranchMenu from '../cim-branch-menu/CimBranchMenu';
import { CimNotificationMenu } from '../cim-notification-menu/CimNotificationMenu.lazy';
import { CimProfileMenu } from '../cim-profile-menu/CimProfileMenu.lazy';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    const [globalState, setGlobalState] = useContext(Context);

    return (
        <ul className='right-menu system-info'>
            <li>
                <CimBranchMenu />
            </li>
            <li>
                <CimNotificationMenu />
            </li>
            <li>
                <CimProfileMenu />
            </li>
        </ul>
    )
}