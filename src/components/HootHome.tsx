import React from 'react';
import { Typography } from '@mui/material';
import { auth } from '../firebaseSetup'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useFirebaseAuth } from '../context/AuthContext';

export default function HootHome() {
  // const user = auth.currentUser?.displayName ? auth.currentUser.displayName : 'no user'
  console.log(`user: ${JSON.stringify(auth.currentUser)}`)
  // const userId = (useFirebaseAuth()?.uid || 'not authenticated')
  // let currentUser: appUser

  const userId: string = (useFirebaseAuth()?.uid || 'not authenticated')
  const currentUser: string = (useCurrentUser(userId)?.username || 'no current user')


  return (
    <Typography>
      <>
        This is the homepage for {useCurrentUser(userId)?.username || 'no current user'}
        {currentUser ?
          <h1>{currentUser}</h1> : <h1>no current user</h1>}
      </>
    </Typography>
  )
}

/**
 *  {currentUser ?
           <p>{currentUser}</p> : <p>no current user</p>}
 */
