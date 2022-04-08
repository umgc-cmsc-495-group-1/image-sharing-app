import React from 'react';
import { Typography } from '@mui/material';
import { useParams, Outlet } from 'react-router-dom';

export default function HootUser() {
  const { uid } = useParams();
  return (
    <>
      <Typography>
        This is user {uid} profile
      </Typography>
      <Outlet />
    </>
  );
}
