import React from 'react';
import { Component } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

class HootAppBar extends Component {

    render() {
       return(
           <Box sx={{ flexGrow: 1 }}>
               <AppBar position="static">
                   <Toolbar>
                       <IconButton
                           size="large"
                           edge="start"
                           color="inherit"
                           aria-label="menu"
                           sx={{ mr: 2  }}
                       >
                           <MenuIcon />
                       </IconButton>
                       <Box
                           component="img"
                           sx={{
                               height: 64,
                           }}
                           alt="Hoot Logo"
                           src={require('../assets/logo/png/simple-72x72.png')}
                       />
                       <Typography variant="h6">
                           Hoot!
                       </Typography>
                   </Toolbar>
               </AppBar>
           </Box>
       ) 
    }
}

export default HootAppBar;
