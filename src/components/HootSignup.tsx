import React, { Component } from 'react';
import { Typography } from '@mui/material';

type State = Record<string, unknown>;
type Props = Record<string, unknown>;


class HootSignup extends Component<Props, State>{
   render() {
       return(
           <Typography>
               This is the sign up page
           </Typography>
       )
   }
}

export default HootSignup;
