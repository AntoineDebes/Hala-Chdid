import React, {
    useContext,
    useEffect,
    useState
} from 'react';

import './EditForm.scss';

import {
    FORMS_NAMES,
} from './../../../Constants';

import {
    isFunction,
    buildErrorMessages
} from './../../../CimHelpers';

import {
    Context,
    initialGlobalState
} from './../../../Store';

import Supplier from './../../../api/Supplier';

import { CimTextFieldInput } from '../../common/cim-textfield-input/CimTextFieldInput.lazy';

export const EditForm = (props) => {
    const formId = FORMS_NAMES.supplierEditForm;

    const [globalState, setGlobalState] = useContext(Context);

    const [formData, setFormData] = useState({
        number: globalState?.dialog?.form?.data?.number ?? '',
        name: globalState?.dialog?.form?.data?.name ?? ''
    });

    const handleObjectChange = (e, stateKey) => {
        e.persist();

        setFormData(prevState => ({
            ...prevState,
            [stateKey]: e?.target?.value
        }));
    }

    const submit = (e) => {
        e.preventDefault();

        let data = prepSubmitFormData();

        setGlobalState({
            ...globalState,
            globalLoader: {
                ...globalState?.globalLoader,
                open: true
            }
        });

        Supplier.update(props?.data?.id, data).then((response) => {
            if (isFunction(globalState?.dialog?.form?.submitCallback)) {
                globalState.dialog.form.submitCallback('reload');
            }

            /**
             * Name of the grid that should be reloaded after successfull submit
             */
            let gridToReload = globalState?.dialog?.form?.targetGrid;

            setGlobalState({
                ...globalState,
                gridToReload: gridToReload,
                dialog: initialGlobalState?.dialog
            });

            setGlobalState({
                ...globalState,
                notificationBar: {
                    ...globalState?.notificationBar,
                    open: true,
                    text: "Supplier has been updated successfully",
                    severity: "success"
                }
            });
        }).catch((error) => {
            let message = buildErrorMessages(error?.response?.data?.message);

            setGlobalState({
                ...globalState,
                notificationBar: {
                    ...globalState?.notificationBar,
                    open: true,
                    text: message,
                    severity: "error"
                },
                globalLoader: globalState?.globalLoader
            });
        }).finally(() => {
            if (!isFunction(globalState?.dialog?.form?.submitCallback)) {
                setGlobalState({
                    ...globalState,
                    globalLoader: initialGlobalState?.globalLoader
                });
            }
        });
    }

    const prepSubmitFormData = () => {
        let submitFormData = {};

        for (let [key, value] of Object.entries(formData)) {
            submitFormData[key] = value;
        }

        return submitFormData;
    }

    return (
        <form
            id={formId}
            onSubmit={(e) => submit(e)}
        >
            <CimTextFieldInput
                label={"Number"}
                stateKey="number"
                value={formData.number}
                required
                handleChange={(e) => handleObjectChange(e, "number")}
            />
            <CimTextFieldInput
                label={"Supplier"}
                stateKey="name"
                value={formData.name}
                required
                handleChange={(e) => handleObjectChange(e, "name")}
            />
        </form>
    );
};
