import React, { useContext, useEffect, useState } from "react";
import "./CimLoader.scss";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { Context, initialGlobalState } from "../../../Store";
import { CimRouter } from "../cim-router/CimRouter.lazy";
// import APGlobalLoader from '../APGlobalLoader/APGlobalLoader.lazy';
// import APNotificationBar from '../APNotificationBar/APNotificationBar.lazy';
// import i18n from "i18next";
// import { create } from 'jss';
// import axios from 'axios';
import { BROADCAST_CHANNEL, SESSION_KEYS } from "../../../Constants";
// import Authentication from '../../../api/Authentication';
import { useNavigate } from "react-router";
// import { buildInstanceURL } from '../../../APHelpers';
import { useIdleTimer } from "react-idle-timer";
import { CimDialogForm } from "../cim-dialog-form/CimDialogForm.lazy";
import { CimGlobalLoader } from "../cim-global-loader/CimGlobalLoader.lazy";
import { CimNotificationBar } from "../cim-notification-bar/CimNotificationBar.lazy";
import Supplier from "../../../api/Supplier";
import ProductCategory from '../../../api/ProductCategory';
import Branch from '../../../api/Branch';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    var theme = createTheme({
        overrides: {
            MuiFormControl: {
                root: {
                    width: "100%",
                },
            },
            MuiFormGroup: {
                root: {
                    marginBottom: "20px",
                },
            },
            MuiDialogTitle: {
                root: {
                    background: "#f5f5f5",
                    borderBottom: "1px solid #c8c8c8",
                    position: "relative",
                },
            },
            MuiDialogContent: {
                root: {
                    paddingTop: 20,
                },
            },
            MuiDialogActions: {
                root: {
                    background: "#f5f5f5",
                    borderTop: "1px solid #c8c8c8",
                },
            },
        },
        palette: {
            primary: {
                light: "#98CE74",
                main: "#70AD47",
            },
            secondary: {
                // main: '#3b7fc4',
                main: "#000",
                light: "#ccc",
            },
            white: {
                main: "#fff",
                light: "#ccc",
            },
            error: {
                main: "#c9282d",
            },
        },
        components: {
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: "black",
                        color: "white",
                    },
                },
            },
        },
        // typography: {
        //     body1: {
        //         whiteSpace: 'pre-wrap',
        //     },
        //     fontFamily: [
        //         '-apple-system',
        //         'BlinkMacSystemFont',
        //         '"Segoe UI"',
        //         'Roboto',
        //         '"Helvetica Neue"',
        //         'Arial',
        //         'sans-serif',
        //         '"Apple Color Emoji"',
        //         '"Segoe UI Emoji"',
        //         '"Segoe UI Symbol"',
        //     ].join(','),
        // },
    });

    const [globalState, setGlobalState] = useContext(Context);
    const [setupDataLoaded, setSetupDataLoaded] = useState(false);

    // const navigate = useNavigate();

    // axios.interceptors.request.use(
    //     (request) => {
    //         // we can appends the headers here instead of the components
    //         // we can handle (show) the loader view here instead of the components
    //         let accessToken = sessionStorage.getItem(SESSION_KEYS.accessToken);

    //         if (accessToken && !request.url.includes('renew-access-token')){
    //             request.headers['Authorization'] = 'Bearer ' + accessToken;
    //         }

    //         return request;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    // axios.interceptors.response.use(
    //     (response) => {
    //         // we can handle the success messages here instead of the components
    //         // we can handle (hide) the loader view here instead of the components
    //         return response;
    //     },
    //     (error) => {
    //         const originalRequest = error.config;

    //         if (error?.response?.status === 401 && originalRequest.url.includes('renew-access-token')) {
    //             invalidateSessionAndRedirectToLogin();
    //             return;
    //         }

    //         if (originalRequest.url.includes('logout')) {
    //             setGlobalState({
    //                 notificationBar: {
    //                     ...globalState?.notificationBar,
    //                     open: true,
    //                     text:  t('session_lost'),
    //                     severity: "error"
    //                 }
    //             });

    //             redirectToLogin();

    //             return;
    //         }

    //         if (error?.response?.status === 401 && !originalRequest._retry) {
    //             originalRequest._retry = true;

    //             return Authentication.renewAccessToken({ refreshToken: sessionStorage.getItem(SESSION_KEYS.refreshToken) })
    //                 .then((response) => {
    //                     if (response?.status === 200) {
    //                         let accessToken = response?.data?.access_token;
    //                         let refreshToken = response?.data?.refresh_token;
    //                         sessionStorage.setItem(SESSION_KEYS.accessToken, accessToken);
    //                         sessionStorage.setItem(SESSION_KEYS.refreshToken, refreshToken);
    //                         return axios(originalRequest);
    //                     }
    //                 });
    //         } else {
    //             // return Error object with Promise
    //             return Promise.reject(error);
    //         }
    //     }
    // );

    const handleOnIdle = (event) => {
        // console.log('user is idle', event)
        // console.log('last active', getLastActiveTime())

        invalidateSessionAndRedirectToLogin();
    };

    // const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    //     timeout: 1000 * 60 * 3, // 3 min
    //     onIdle: handleOnIdle,
    //     crossTab: {
    //         type: undefined,
    //         channelName: 'CIM-idle-timer',
    //         emitOnAllTabs: true
    //     }
    // });

    const invalidateSessionAndRedirectToLogin = () => {
        // Authentication.logOut().then((response) => {
        //     if (response?.status === 200) {
        //         redirectToLogin();
        //     }
        // }).catch((error) => {
        //     // if no response, so there is a network error
        // }).finally(() => {
        //     setGlobalState({
        //         globalLoader: {
        //             ...globalState?.globalLoader,
        //             open: false
        //         }
        //     });
        // });
    };

    const redirectToLogin = () => {
        // sessionStorage.removeItem(SESSION_KEYS.accessToken);
        // sessionStorage.removeItem(SESSION_KEYS.refreshToken);
        // sessionStorage.removeItem(SESSION_KEYS.user);
        // setGlobalState({
        //     user: {
        //         loggedIn: false,
        //         data: {}
        //     }
        // });
        // globalState.broadCastChannel.postMessage({
        //     'cmd': BROADCAST_CHANNEL.logoutUser
        // });
        // navigate?.push(`${buildInstanceURL()}/login`);
    };

    let branchData, supplierData;
    const getInitSetupData = () => {
        setGlobalState({
            ...globalState,
            globalLoader: {
                open: true
            },
        })

        Branch.getList().then((response) => {
            branchData = response?.data;
            return Supplier.getList();
        }).then((response) => {
            supplierData = response?.data?.suppliers
            return ProductCategory.getList();
        }).then((response) => {
            // console.log('inventory ', globalState?.inventory)
            setSetupDataLoaded(true);
            setGlobalState({
                ...globalState,
                globalLoader: {
                    open: false
                },
                branches: {
                    ...globalState.branches,
                    data: branchData
                },
                inventory: {
                    ...globalState.inventory,
                    suppliers: supplierData,
                    product_categories: response?.data?.['product-categories']
                }
            })
        }).catch((error) => {
            setGlobalState({
                ...globalState,
                globalLoader: {
                    open: false
                },
            })
        }).finally(() => {
        });
    }

    useEffect(() => {
        if (globalState?.user?.loggedIn && globalState.branches.data == null && globalState.inventory.suppliers == null && globalState.inventory.product_categories == null) {
            getInitSetupData()
        }
        }, [globalState?.user?.loggedIn]
    )

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={false} className="h-100 no-padding-h">
                {
                    !setupDataLoaded && globalState?.user?.loggedIn ? "" : <CimRouter />
                }
                <CimDialogForm />
                <CimNotificationBar />
                <CimGlobalLoader />
            </Container>
        </ThemeProvider>
    );
};
