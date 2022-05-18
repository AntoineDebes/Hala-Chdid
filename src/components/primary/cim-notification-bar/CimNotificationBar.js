import React, { useContext } from 'react';

import './CimNotificationBar.scss';

import CloseIcon from '@mui/icons-material/Close';

import { Context } from './../../../Store';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    snackBarAnchor: {
        left: 'unset',
        right: 30,
        bottom: 'unset',
        top: 40,
        transform: 'none'
    },
    snackBarRoot: {
        alignItems: 'start',
        justifyContent: 'flex-end'
    },
    notificationText: {
        margin: 0,
        marginRight: 20,
        display: 'inline-block'
    }
});

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [globalState, setGlobalState] = useContext(Context);

    const handleNotificationBarClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setGlobalState({
            ...globalState,
            notificationBar: {
                ...globalState?.notificationBar,
                open: false
            }
        });
    };

    const classes = useStyles();

    return (
        <Snackbar
            id='CimNotificationBar'
            open={globalState?.notificationBar?.open}
            autoHideDuration={6000}
            onClose={handleNotificationBarClose}
            classes={{
                root: classes.snackBarRoot + ' snackbar-static-style',
                anchorOriginBottomCenter: classes.snackBarAnchor
            }}
            anchorOrigin={{
                horizontal: globalState?.notificationBar?.horizontal,
                vertical: globalState?.notificationBar?.vertical,
            }}
        >
            <Alert
                severity={globalState?.notificationBar?.severity ?? 'error'}
                variant="filled"
            >
                <p
                    className={classes.notificationText}
                >
                    {globalState?.notificationBar?.text}
                </p>
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    className={"close-notification " + globalState.domDirection}
                    onClick={handleNotificationBarClose}
                >
                    <CloseIcon
                        fontSize="small"
                    />
                </IconButton>
            </Alert>
        </Snackbar>
    );
};
