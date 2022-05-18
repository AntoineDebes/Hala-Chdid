import React from 'react';
import Reducer from "./Reducer";
import {
    createContext,
    useReducer,
} from "react";

export const initialGlobalState = {
    user: {
        loggedIn: sessionStorage.getItem("CIM-accessToken") ? true : false,
        data: sessionStorage.getItem("CIM-user") ? JSON.parse(sessionStorage.getItem("CIM-user")) : {}
    },
    branches: {
        activeBranch: { 
            id: sessionStorage.getItem("CIM-activeBranch") ? sessionStorage.getItem("CIM-activeBranch") : 2,
            name: ''
        },
        data: null
    },
    dialog: {
        title: '',
        open: false,
        showSaveButton: true,
        form: {
            id: '',
            name: '',
            submitCallback: '',
            openedFromMainMenu: false,
            data: {},
            targetGrid: null
        }
    },
    globalLoader: {
        open: false
    },
    mainMenu: {
        activeTab: sessionStorage.getItem("CIM-main-menu-activeTab") ?? 0
    },
    footerTabs: {
        activeTab: '',
        activeTabValue: sessionStorage.getItem("CIM-footerbar-activeTab") ?? 0
    },
    notificationBar: {
        horizontal: 'right',
        vertical: 'bottom',
        open: false,
        text: '',
        severity: 'error'
    },
    broadCastChannel: null,
    gridToReload: null,
    inventory: {
        suppliers: null,
        product_categories: null,
        product_type: [{
            value: "food",
            label: "Food"
        },
        {
            value: "non-food",
            label: "Non Food"
        }
        ],
    },
    InvBarcodeOrDescChange: {
        barcode: false,
        desc: false
    }
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialGlobalState);

    return (
        <Context.Provider
            value={[state, dispatch]}
        >
            {children}
        </Context.Provider>
    );
};

export const Context = createContext(initialGlobalState);
export default Store;
