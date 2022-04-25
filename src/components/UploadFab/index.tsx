import React, { useState } from 'react';
import { styled, Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { CreatePost } from './CreatePost';

const UploadFab: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { width, height } = useWindowDimensions();
  const StyledFab = styled(Fab)({
    position: 'fixed',
    backgroundColor: 'rgba(217, 214, 199, 0.95)',
    zIndex: 1,
    top: height - 150,
    left: width - 150,
    margin: '0 auto',
  })

  return (
    <Box>
      <StyledFab
        aria-label='new-post'
        onClick={handleOpen}
      >
        <AddIcon />
      </StyledFab>
      <CreatePost
        open={open}
        handleClose={handleClose}
      />
    </Box>
  )
}

export {
  UploadFab
}