import React, { Component } from 'react';
import { Typography } from '@mui/material';

type State = Record<string, unknown>;
type Props = Record<string, unknown>;


class HootTemplate extends Component<Props, State>{
   render() {
       return(
           <Typography>
               Test
           </Typography>
       )
   }
}

export default HootTemplate;
