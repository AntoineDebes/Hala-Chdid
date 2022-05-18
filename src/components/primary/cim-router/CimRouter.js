import React, {
    useContext, useEffect, useState
} from 'react';

import { Container, Box, Typography } from '@mui/material';

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from 'react-router-dom';

import { BROADCAST_CHANNEL, SESSION_KEYS, APP_NAME } from '../../../Constants';

import { Context, initialGlobalState } from '../../../Store';

import CimSidebar from './../cim-sidebar/CimSidebar';


import Login from '../../../pages/login/Login';
import InventoryPage from '../../../pages/inventory/InventoryPage';
import InventoryInPage from '../../../pages/inventory-in/InventoryInPage';
import InventoryOutPage from '../../../pages/inventory-out/InventoryOutPage';
import SuppliersPage from '../../../pages/suppliers/SuppliersPage';
import ProductCategoriesPage from '../../../pages/product-categories/ProductCategoriesPage';

export default () => {
    const [globalState, globalStateDispatcher] = useContext(Context);

    useEffect(() => {
        var bcChannel = new BroadcastChannel(BROADCAST_CHANNEL.channelName + APP_NAME);

        globalStateDispatcher({ broadCastChannel: bcChannel });

        // // if accessToken is not set, ask the other tabs to share you the accessToken & other data
        // if (sessionStorage.getItem(SESSION_KEYS.accessToken) === null || sessionStorage.getItem(SESSION_KEYS.accessToken).length <= 0) {
        //     bcChannel.postMessage({
        //         'cmd': BROADCAST_CHANNEL.requestUserAuthenticationData
        //     });
        // }

        // bcChannel.onmessage = (e) => {
        //     if (e.data.cmd === BROADCAST_CHANNEL.logoutUser) {
        //         deAuthenticateUser()
        //     }

        //     if (e.data.cmd === BROADCAST_CHANNEL.requestUserAuthenticationData) {
        //         sendUserAuthenticationData(bcChannel);
        //     } else if (e.data.cmd === BROADCAST_CHANNEL.responseUserAuthenticationData) {
        //         recieveUserAuthenticationData(e.data.data);
        //     }
        // }
    }, []);

    const deAuthenticateUser = () => {
        sessionStorage.removeItem(SESSION_KEYS.accessToken);
        sessionStorage.removeItem(SESSION_KEYS.refreshToken);
        sessionStorage.removeItem(SESSION_KEYS.user);

        globalStateDispatcher({
            user: {
                ...initialGlobalState.user,
                loggedIn: false,
                data: null
            }
        });
    }

    const recieveUserAuthenticationData = (data) => {
        if (data[SESSION_KEYS.accessToken] == null || data[SESSION_KEYS.accessToken] === 'null') {
            return false;
        }

        sessionStorage.setItem(SESSION_KEYS.accessToken, data[SESSION_KEYS.accessToken]);
        sessionStorage.setItem(SESSION_KEYS.refreshToken, data[SESSION_KEYS.refreshToken]);
        sessionStorage.setItem(SESSION_KEYS.user, data[SESSION_KEYS.user]);

        globalStateDispatcher({
            user: {
                ...globalState?.user,
                loggedIn: true,
                data: JSON.parse(data[SESSION_KEYS.user])
            }
        });
    }

    const sendUserAuthenticationData = (bcChannel) => {
        // bcChannel.postMessage({
        //     cmd: BROADCAST_CHANNEL.responseUserAuthenticationData,
        //     data: {
        //         [SESSION_KEYS.accessToken]: sessionStorage.getItem(SESSION_KEYS.accessToken),
        //         [SESSION_KEYS.refreshToken]: sessionStorage.getItem(SESSION_KEYS.refreshToken),
        //         [SESSION_KEYS.user]: sessionStorage.getItem(SESSION_KEYS.user),
        //     }
        // });
    }

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                {
                    globalState?.user?.loggedIn ?
                        <CimSidebar />
                        :
                        null
                }
                <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                    <Routes>
                        <Route
                            path={`${process.env.PUBLIC_URL}/`}
                            element={globalState?.user?.loggedIn ?
                                <Navigate
                                    to={`${process.env.PUBLIC_URL}/inventory`}
                                />
                                :
                                <Navigate
                                    to={`${process.env.PUBLIC_URL}/login`}
                                />
                            }
                        />

                        <Route
                            path={`${process.env.PUBLIC_URL}/inventory`}
                            element={globalState?.user?.loggedIn ?
                                <InventoryPage />
                                :
                                <Navigate
                                    to={`${process.env.PUBLIC_URL}/login`}
                                />
                            }
                        />

                        <Route
                            path={`${process.env.PUBLIC_URL}/inventory-in`}
                            element={globalState?.user?.loggedIn ?
                                <InventoryInPage />
                                :
                                <Navigate
                                    to={`${process.env.PUBLIC_URL}/login`}
                                />
                            }
                        />
                        <Route
                            path={`${process.env.PUBLIC_URL}/inventory-out`}
                            element={globalState?.user?.loggedIn ?
                                <InventoryOutPage />
                                :
                                <Navigate
                                    to={`${process.env.PUBLIC_URL}/login`}
                                />
                            }
                        />
                        <Route
                            path={`${process.env.PUBLIC_URL}/suppliers`}
                            element={globalState?.user?.loggedIn ?
                                <SuppliersPage />
                                :
                                <Navigate
                                    to={`${process.env.PUBLIC_URL}/login`}
                                />
                            }
                        />
                        <Route
                            path={`${process.env.PUBLIC_URL}/product-categories`}
                            element={globalState?.user?.loggedIn ?
                                <ProductCategoriesPage />
                                :
                                <Navigate
                                    to={`${process.env.PUBLIC_URL}/login`}
                                />
                            }
                        />
                        <Route
                            path={`${process.env.PUBLIC_URL}/login`}
                            element={!globalState?.user?.loggedIn ?
                                <Login />
                                :
                                <Navigate
                                    to={`${process.env.PUBLIC_URL}/inventory`}
                                />
                            }
                        />
                    </Routes>
                </Box>
            </Box>
        </BrowserRouter>
    );
};
