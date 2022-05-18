import React, { useState, useContext, useEffect } from 'react';

import { Grid,Paper,Avatar, TextField, Button, Checkbox, FormControlLabel, Container } from '@mui/material'
import Form from "react-hook-form";
import {
    useNavigate
} from 'react-router-dom';

import './LoginForm.scss';
import Logo from './../../../assets/images/logo.svg';
import Authentication from '../../../api/Authentication';
import { Context, initialGlobalState } from '../../../Store';
import { buildErrorMessages } from '../../../CimHelpers';


const LoginFrom=()=>{
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: ''});
    const [globalState, setGlobalState] = useContext(Context);

    const onChangeForm = (e, fieldName) => {
        // console.log(fieldName)
        setForm(prevState => ({...prevState, [fieldName]: e.target.value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        setGlobalState({
            ...globalState,
            globalLoader: initialGlobalState?.globalLoader,
        });

        if (form?.email && form?.password) {
            Authentication.login({ email: form?.email, password: form?.password }).then( response => {
                var data = response.data.data
                // console.log('response ' , data)

                setGlobalState({
                    ...globalState,
                    user: {
                        ...globalState.user,
                        loggedIn : true,
                        data: data.user
                    }
                })

                sessionStorage?.setItem("CIM-accessToken" , data.access_token)
                sessionStorage?.setItem("CIM-user" , JSON.stringify(data.user))

             }).catch((error) => {
                let message = buildErrorMessages(error?.response?.data?.message);
    
                setGlobalState({
                    notificationBar: {
                        ...globalState?.notificationBar,
                        horizontal: 'center',
                        vertical: 'top',
                        open: true,
                        text: 'Login Faild',
                        severity: "error"
                    },
                    globalLoader: globalState?.globalLoader
                });
            }).finally(() => {
                setGlobalState({
                    globalLoader: initialGlobalState?.globalLoader
                });
            });
        }
    }
    return(
        <Grid>
            <Paper elevation={10} className="paper-style">
                <Grid align='center'>
                <Avatar className="logo-box">
                <img
                    src={Logo}
                    alt="Chedid Inventory"
                />
                </Avatar>
                    <h2>Login</h2>
                </Grid>
                <form name="form" onSubmit={handleSubmit}>

                <Container className="input-group">
                    <TextField label='Email' placeholder='Enter email' fullWidth required onChange={(e) => onChangeForm(e, 'email')} />
                </Container>
                <Container className="input-group">
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={(e) => onChangeForm(e, 'password')}/>
                </Container>
                <Container className="input-group">
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" className="btn-login" fullWidth>Sign in</Button>
                </Container>
                </form>
            </Paper>
        </Grid>
    )
}

export default LoginFrom