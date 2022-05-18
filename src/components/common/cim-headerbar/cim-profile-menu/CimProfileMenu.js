import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

import './CimProfileMenu.scss';
import { Avatar } from '@mui/material';
import { Context, initialGlobalState } from '../../../../Store';
import { useNavigate } from 'react-router';
import Authentication from '../../../../api/Authentication';
import { buildErrorMessages } from '../../../../CimHelpers';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [globalState, setGlobalState] = useContext(Context);
    const user = JSON.parse(JSON.stringify(globalState.user));
    const avatar = user.data.first_name.charAt(0) + user.data.last_name.charAt(0);
    // console.log('avatar ', avatar)
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    /**
     *
     */
    const handleLogout = (event) => {
        setGlobalState({
            ...globalState,
            globalLoader: {
                ...globalState?.globalLoader,
                open: true
            }
        });
        
        Authentication.logOut().then((response) => {
            setGlobalState({
                ...initialGlobalState,
            })
            
            sessionStorage.clear();
    
            setOpen(false);
    
            navigate("/login");
        }).catch((error) => {
            let message = buildErrorMessages(error?.response?.data?.message);

            setGlobalState({
                notificationBar: {
                    ...globalState?.notificationBar,
                    open: true,
                    text: message,
                    severity: "error"
                },
                globalLoader: globalState?.globalLoader
            });
        }).finally(() => {
            setGlobalState({
                ...globalState,
                globalLoader: initialGlobalState?.globalLoader
            });
        });
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            <div>
                <Button
                    ref={anchorRef}
                    id="profile-button"
                    aria-controls={open ? 'profile-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Avatar>{avatar}</Avatar>
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="profile-menu"
                                        aria-labelledby="profile-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem key={"header-menu-item-profile"} onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem key={"header-menu-item-logout"} onClick={handleLogout}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}