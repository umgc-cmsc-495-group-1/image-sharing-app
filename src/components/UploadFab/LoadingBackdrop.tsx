import React, { useState } from 'react'
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingBackdrop = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(!open)
  }
  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>

  )
}

export {
  LoadingBackdrop
}