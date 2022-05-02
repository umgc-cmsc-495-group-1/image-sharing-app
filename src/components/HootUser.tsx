import React from 'react';
import { Typography } from '@mui/material';
import { useParams, Outlet } from 'react-router-dom';

const titleStyle: React.CSSProperties = {
	fontFamily: 'Merienda', cursive;
	fontSize: 12
}

const bodyStyle: React.CSSProperties = {
	fontFamily: 'Roboto'
	fontSize: 8
}


export default function HootUser() {
  const { uid } = useParams();
  return (
    <>
      <Typography style={titleStyle} role="user-profile">
        This is user {uid} profile
      </Typography>
      <Outlet />
    </>
  );
}
