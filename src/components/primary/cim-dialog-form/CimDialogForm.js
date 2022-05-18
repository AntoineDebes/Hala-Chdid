import React, {
    useContext,
    useEffect,
    useState
} from 'react';

import './CimDialogForm.scss';

// import { JssProvider } from 'react-jss';

import {
    Context,
    initialGlobalState
} from './../../../Store';

import { FORMS_NAMES } from './../../../Constants';

import { isFunction } from './../../../CimHelpers';

import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery,
    useTheme
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import { Close } from '@mui/icons-material';

import { AddForm as SupplierAddForm } from '../../suppliers-page/add-form/AddForm';

import { EditForm as SupplierEditForm } from '../../suppliers-page/edit-form/EditForm';

import { AddForm as ProductCategoryAddForm } from '../../product-categories-page/add-form/AddForm';

import { EditForm as ProductCategoryEditForm } from '../../product-categories-page/edit-form/EditForm';

const useStyles = makeStyles({
    dialogContent: {
        overflowY: 'auto'
    },
    closeBtn: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)'
    }
});

// const generateClassName = createGenerateClassName({
//     dangerouslyUseGlobalCSS: true
// });

export default (props) => {
    const [globalState, globalStateDispatcher] = useContext(Context);

    const [formId, setFormId] = useState(globalState?.dialog?.form?.id);

    const [activeForm, setActiveForm] = useState('');

    useEffect(() => {

        setActiveFormHandler();
        setFormId(globalState?.dialog?.form?.id);
    }, [globalState?.dialog?.form]);

    const setActiveFormHandler = () => {
        switch (globalState?.dialog?.form?.id) {
            case FORMS_NAMES.supplierAddForm:
                setActiveForm(
                    <SupplierAddForm
                        data={globalState?.dialog?.form?.data}
                    />
                );
                break;

            case FORMS_NAMES.supplierEditForm:
                setActiveForm(
                    <SupplierEditForm
                        data={globalState?.dialog?.form?.data}
                    />
                );
                break;

            case FORMS_NAMES.productCategoryAddForm:
                setActiveForm(
                    <ProductCategoryAddForm
                        data={globalState?.dialog?.form?.data}
                    />
                );
                break;

            case FORMS_NAMES.productCategoryEditForm:
                setActiveForm(
                    <ProductCategoryEditForm
                        data={globalState?.dialog?.form?.data}
                    />
                );
                break;

            default:
                break;
        }
    };

    const closeDialog = (e, reason) => {
        if (reason == 'backdropClick') {
            return;
        }

        globalStateDispatcher({
            dialog: initialGlobalState?.dialog
        });

        if (isFunction(globalState?.dialog?.form?.closeCallback)) {
            globalState.dialog.form.closeCallback();
        }
    };

    const themeObj = useTheme();
    const fullScreen = useMediaQuery(themeObj.breakpoints.down('sm'));
    const classes = useStyles();

    return (
        <Dialog
            open={globalState?.dialog?.open}
            onClose={closeDialog}
            aria-labelledby="form-dialog-title"
            fullScreen={fullScreen}
            closeAfterTransition
            fullWidth={false}
            maxWidth={"md"}
            className="CimDialogForm"
            disableEscapeKeyDown
        >
            {/* <JssProvider
                generateClassName={generateClassName}
            > */}
                <DialogTitle
                    id="form-dialog-title"
                    className={classes.dialogTitle}
                >
                    {globalState?.dialog?.title}
                    <IconButton
                        onClick={closeDialog}
                        classes={{ root: classes.closeBtn }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Container
                        maxWidth="sm"
                    >
                        {activeForm}
                    </Container>
                </DialogContent>
                <DialogActions
                    className={classes.dialogActions}
                >
                    {
                        globalState?.dialog?.showSaveButton ?
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                form={formId}
                            >
                                save
                            </Button>
                            : null
                    }

                    <Button
                        color="secondary"
                        onClick={closeDialog}
                    >
                        cancel
                    </Button>
                </DialogActions>
            {/* </JssProvider> */}
        </Dialog>
    );
};
