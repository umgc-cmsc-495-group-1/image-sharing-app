import React from 'react';
import { Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';

const EasterEgg = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowDimensions();
  return (
    <Container
      component="main"
      sx={{
        my: 2
      }}
    >
      <Box>
        <iframe
          width={width - (width / 3)}
          height={height - 250}
          src="https://www.youtube.com/embed/CsGYh8AacgY?start=121&autoplay=1"
          title="You Discovered Our Secret... Shun the Non-Believers..."
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}
        ></iframe>
      </Box>
      <Box>
        <Button
          type="button"
          variant="contained"
          sx={{
            my: 3,
            width: width - (width / 3),
          }}
          onClick={() => navigate(-1)}
        >Go Back</Button>
      </Box>
    </Container>
  )
}

export {
  EasterEgg
}