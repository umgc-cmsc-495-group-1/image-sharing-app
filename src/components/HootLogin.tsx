import React, { Component } from 'react';
import { Typography } from '@mui/material';

type State = Record<string, unknown>;
type Props = Record<string, unknown>;


class HootLogin extends Component<Props, State>{
   render() {
       return(
           <Typography>
               This is the login page
           </Typography>
       )
   }
}

export default HootLogin;
