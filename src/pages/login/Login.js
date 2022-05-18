import React, { useState } from 'react';

import './Login.scss';

import {
    Container,
    Typography
} from '@mui/material';

import { LoginForm } from '../../components/login-page/login-form/LoginForm.lazy';
 
export default (props) => {
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    return (
        <Container
            id="login-page"
            fixed
            maxWidth="sm"
            className="h-100 d-flex align-items-center justify-content-center"
        >
            <Container
                fixed
                maxWidth="sm"
            >
                <LoginForm/>
                {
                    isLoginFailed ? 
                    <Typography
                        variant="body1"
                        color="error"
                    >
                        {validationMessage}
                    </Typography>
                    :
                    null
                }
            </Container>
        </Container>
    );
};
