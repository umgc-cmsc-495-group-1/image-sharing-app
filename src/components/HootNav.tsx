import React from 'react';
import { Component } from "react";
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';

interface State {
    isOpen: boolean
}

type Props = Record<string, unknown>;

class HootNav extends Component<Props, State>{

    constructor(props: Props) {
        super(props);
        this.state = {isOpen: false};
    }

    toggleDrawer = 
        (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key == 'Tab' ||
            (event as React.KeyboardEvent).key == 'Shift')
        ) {
            return;
        }

        this.setState({ ...this.state, isOpen: open});
    }

    render() {
        return(
            <div
                className="class.navigation"
            > 
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2  }}
                                onClick={this.toggleDrawer(!this.state.isOpen)}
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
                <Drawer
                    anchor="left"
                    open={this.state.isOpen}
                    onClose={this.toggleDrawer(false)}
                >
                    <Toolbar>
                    </Toolbar>
                    <Box
                        sx={{ width: 250}}
                        role="presentation"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        <List>
                            <ListItem button component={Link} to="/" >
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button component={Link} to="/login">
                                <ListItemText primary="Login" />
                            </ListItem>
                            <ListItem button component={Link} to="/signup">
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                <Outlet />
            </div>
        ) 
    }
}

export default HootNav;
