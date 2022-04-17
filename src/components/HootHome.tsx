import React from 'react';
import { Typography } from '@mui/material';
import { auth } from '../firebaseSetup'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useFirebaseAuth } from '../context/AuthContext';
// import { AppUserInterface } from '../types/authentication';
// import Cookies from 'js-cookie';

export default function HootHome() {
  // const user = auth.currentUser?.displayName ? auth.currentUser.displayName : 'no user'
  console.log(`user: ${JSON.stringify(auth.currentUser)}`)
  console.log(window.location.hostname);
  // const userId = (useFirebaseAuth()?.uid || 'not authenticated')
  // let currentUser: appUser
  // const currentUser = 
  const userId: string = (useFirebaseAuth()?.uid || 'not authenticated')
  const currentUser: string = (useCurrentUser(userId)?.username || 'no current user')


  return (
    <Typography>
      This is the homepage for {useCurrentUser(userId)?.username || ' no current user '}
      {(currentUser !== null) ? currentUser : " no current user "}
    </Typography>
  )
}
