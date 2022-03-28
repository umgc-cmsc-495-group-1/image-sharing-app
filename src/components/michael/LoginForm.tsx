import React from 'react';
import TextField from '@mui/material/TextField';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
  }

export default function LoginForm() {
    return (
        <div>
        <TextField
            required
            id="outlined-required"
            label="Email"
        />
        <TextField
            required
            id="outlined-required"
            label="Password"
            type="password"
        />
        <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
        </div>
    )
}