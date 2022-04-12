import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function Hoot404() {
    const navigate = useNavigate();
    return (
        <Container component="main" maxWidth="md" data-testid="hoot-404-container">
            <Box sx={{
                marginTop: 8,
                padding: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography variant='h2'>Uh Oh! It looks like there is nothing here...</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(-1)}
                    data-testid="hoot-404-button"
                    sx={{
                        marginTop: 5,
                        padding: '0, 1.5rem. 0 1.5rem',
                        fontSize: '1.5rem'
                    }}
                >Go Back</Button>
            </Box>
        </Container>
    )
}
