/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

import "./CimBranchMenu.scss";
import BranchIcon from "./../../../../assets/images/branch.svg";
import { CimButton } from "../../cim-button/CimButton.lazy";

import { Context, initialGlobalState } from "../../../../Store";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Branch from '../../../../api/Branch';

export default (props) => {

    // const { id } = props;
    const [globalState, setGlobalState] = useContext(Context);

    const value = globalState?.branches?.activeBranch?.id;

    useEffect(() => {
        
    }, [globalState?.branches?.data]);

    const handleChange = (event) => {
        const activeBranchId = event.target.value;
        sessionStorage.setItem("CIM-activeBranch", activeBranchId)
        setGlobalState({
            ...globalState,
            gridToReload: true,
            branches: {
                ...globalState.branches,
                activeBranch: {
                    ...globalState.activeBranch,
                    id: activeBranchId
                }
            }
        })
    };

    const MyIcon = (props) => {
        const { style, ...otherProps } = props;
        const colorStyle = {
            color: '#1C1B19',
        };
        const styles = { ...style, ...colorStyle };
        return <KeyboardArrowDownIcon {...otherProps} style={styles} />
    }

    return (
        <FormControl fullWidth className="branch-form-control">
            <img src={BranchIcon} alt="branch" className="cim-icon cim-branch-icon" />
            {
                globalState?.branches?.data != null ? (
                    <NativeSelect
                        disableUnderline
                        IconComponent={MyIcon}
                        value={value}
                        onChange={handleChange}
                        size="small"
                        sx={{ height: 1 }}
                        autoFocus
                        inputProps={{
                            name: "branch",
                            id: "current-branch",
                            className: "current-branch",
                            classes: {
                                root: {
                                    color: '#1C1B19'
                                }
                            }
                        }}
                    >
                        {
                            globalState?.branches?.data?.map((branch, index) => (
                                <option key={"branches-menu-item-" + index} value={branch.id}>{branch.name}</option>
                            ))
                        }
                    </NativeSelect>
                )
                :
                null
            }
        </FormControl >
    );
};
