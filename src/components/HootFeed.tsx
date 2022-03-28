import React, { Component } from 'react';
import { Typography } from '@mui/material';

type State = Record<string, unknown>;
type Props = Record<string, unknown>;


class HootFeed extends Component<Props, State>{
   render() {
       return(
           <Typography>
               This is the feed page
           </Typography>
       )
   }
}

export default HootFeed;
