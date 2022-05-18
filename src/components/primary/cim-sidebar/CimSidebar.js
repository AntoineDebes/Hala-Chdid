import React, { useContext, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CategoryIcon from '@mui/icons-material/Category';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
// import { Link } from 'react-router-dom';
import Logo from './../../../assets/images/logo.svg';
import InventoryLogo from './../../../assets/images/inventory.svg';
import './CimSidebar.scss';
import { Link } from 'react-router-dom';
import { Context } from '../../../Store';
import { useNavigate } from 'react-router';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const theme = useTheme();
    const [globalState, setGlobalState] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(globalState?.mainMenu?.activeTab);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLinkClick = (e, url, tabIndex) => {
        e.preventDefault();

        navigate(url);

        setActiveTabIndex(tabIndex);

        setGlobalState({
            ...globalState,
            mainMenu: {
                ...globalState?.mainMenu,
                activeTab: tabIndex
            }
        });

        sessionStorage.setItem("CIM-main-menu-activeTab", tabIndex);
    }

    return (
        <Drawer variant="permanent" open={open} id="cim-sidebar" >
            <DrawerHeader >
                <div className="sidebar-logo">
                    <img
                        src={Logo}
                        alt="Chedid Inventory"
                    />
                </div>
            </DrawerHeader>
            <Divider sx={{ borderColor: 'white' }} />
            <List>
                <Link to="/inventory" tabIndex={0} onClick={(e) => handleLinkClick(e, "/inventory", 0)}>
                    <ListItemButton
                        key='inventory'
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        selected={activeTabIndex == 0}
                    >
                        <ListItemIcon
                            sx={{
                                color: 'red',
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <img className='cim-icon' src={InventoryLogo} alt="Icon" />
                        </ListItemIcon>
                        <ListItemText primary='inventory' sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </Link>
                <Link to="/suppliers" tabIndex={1} onClick={(e) => handleLinkClick(e, "/suppliers", 1)}>
                    <ListItemButton
                        key='suppliers'
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        selected={activeTabIndex == 1}
                    >
                        <ListItemIcon
                            sx={{
                                color: 'red',
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <AccessibilityNewIcon color="white" />
                        </ListItemIcon>
                        <ListItemText primary='suppliers' sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </Link>
                <Link to="/product-categories" tabIndex={2} onClick={(e) => handleLinkClick(e, "/product-categories", 2)}>
                    <ListItemButton
                        key='product-categories'
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        selected={activeTabIndex == 2}
                    >
                        <ListItemIcon
                            sx={{
                                color: 'red',
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <CategoryIcon color="white" />
                        </ListItemIcon>
                        <ListItemText primary='product-categories' sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </Link>
            </List>
        </Drawer>
    );
}