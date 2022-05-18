import React, {
    useContext,
    useEffect,
    useState
} from 'react';

import './AddForm.scss';

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

import ProductCategory from './../../../api/ProductCategory';

import { CimTextFieldInput } from '../../common/cim-textfield-input/CimTextFieldInput.lazy';

export const AddForm = (props) => {
    const formId = FORMS_NAMES.productCategoryAddForm;

    const [globalState, setGlobalState] = useContext(Context);

    const [formData, setFormData] = useState({
        number: '',
        name: ''
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

        ProductCategory.create(data).then((response) => {
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
                    text: "Category has been created successfully",
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
        let submitFormData = new FormData();

        for (let [key, value] of Object.entries(formData)) {
            submitFormData.append(key, value);
        }

        return submitFormData;
    }

    return (
        <form
            className={formId}
            id={formId}
            onSubmit={(e) => submit(e)}
        >
            <CimTextFieldInput
                label={"Number"}
                stateKey={"number"}
                value={formData.number}
                required
                handleChange={handleObjectChange}
            />
            <CimTextFieldInput
                label={"Category"}
                stateKey={"name"}
                value={formData.name}
                required
                handleChange={handleObjectChange}
            />
        </form>
    );
};
