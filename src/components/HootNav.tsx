import React, { useState } from 'react';
import { AppBar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useWindowDimensions from '../hooks/useWindowDimensions';

export default function HootNav() {
    const { width, height } = useWindowDimensions();
    const [isOpen, setIsOpen] = useState(false);
    // toggle drawer function
    function toggleDrawer(open: boolean, event: React.KeyboardEvent | React.MouseEvent): void {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key == 'Tab' ||
                (event as React.KeyboardEvent).key == 'Shift')
        ) {
            return;
        }
        console.info(width, height);
        setIsOpen(open);
    }

    return (
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
                            sx={{ mr: 2 }}
                            onClick={(event) => { toggleDrawer(!isOpen, event) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            component="img"
                            sx={{
                                height: 64,
                            }}
                            alt="Hoot Logo"
                            src={require('../assets/logo/png/simple-72x72.png')} />
                        <Typography variant="h6">
                            Hoot!
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={() => { setIsOpen(false) }}
            >
                <Toolbar>
                </Toolbar>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={(event) => { toggleDrawer(false, event) }}
                    onKeyDown={(event) => { toggleDrawer(false, event) }}
                >
                    <List role="navigation-list-container">
                        <ListItem button component={Link} to="/" role="navigation-home">
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/login" role="navigation-login">
                            <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button component={Link} to="/signup" role="navigation-signup">
                            <ListItemText primary="Sign Up" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Outlet />
        </div>
    )

}
