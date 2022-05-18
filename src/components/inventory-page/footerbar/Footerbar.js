import {useContext, useState} from 'react';

import { Box, Tabs, Tab } from '@mui/material';

import { useNavigate } from 'react-router';

import { Context } from '../../../Store';

import './Footerbar.scss';

function LinkTab(props) {
    const navigate = useNavigate();
    
    return (
        <Tab
            component="a"
            onClick={(e) => {
                e.preventDefault();

                navigate(props?.href);
            }}
            {...props}
        />
    );
}

export default (props) => {
    const [globalState, setGlobalState] = useContext(Context);
    const [value, setValue] = useState(parseInt(globalState?.footerTabs?.activeTabValue));

    const handleChange = (event, newValue) => {
        setValue(newValue);

        setGlobalState({ 
            ...globalState,
            footerTabs: {
                activeTabValue: newValue,
            }
        })

        sessionStorage.setItem("CIM-footerbar-activeTab", newValue);
    };

    return (
        <footer className='inventory-footer'>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="nav tabs"  textColor="secondary" indicatorColor="secondary">
                    <LinkTab label="Inventory" href="/inventory" />
                    <LinkTab label="In" href="/inventory-in" />
                    <LinkTab label="Out" href="/inventory-out" />
                </Tabs>
            </Box>
        </footer>
    );
}