import React from 'react'
import firebase from 'firebase/compat/app'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseSetup'

/*************************************************
 * React Context and Provider for Current User
 * Make Firebase Authentication state available
 * globally
 ************************************************/

// Firebase.User returned by onAuthStateChanged, if
// there isn't a current authenticated user the onAuthStateChanged
// callback called with null value
type appUser = firebase.User | null
type ContextState = { user: appUser }

export const FirebaseAuthContext = React.createContext<ContextState | undefined>(undefined)

// Encapsulates FirebaseAuthContext.Provider and onAuthStateChanged listener
const FirebaseAuthProvider: React.FC = ({ children }) => {
  // State for current firebase.User
  const [user, setUser] = React.useState<appUser>(null)
  const value = { user }

  // Register callback
  React.useEffect( () => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser)
    return unsubscribe
  }, [])
  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}
// Custom hook to to access Context and give the value
// of the authenticated user to components
// can be used by any child component of FirebaseAuthProvider
function useFirebaseAuth() {
  const context = React.useContext(FirebaseAuthContext)
  if (context === undefined) {
    throw new Error(
      'useFirebaseAuth must be used within a FirebaseAuthProvider'
    )
  }
  return context.user
}
export { FirebaseAuthProvider, useFirebaseAuth }


/* USAGE:
* Parent:
*   function Parent() {
*      return (
*         <FirebaseAuthProvider>
*            <Username />
*         </FirebaseAuthProvider>
*       );
*     }
*   Child:
*      function Username() {
*         return (
*          const user = useFirebaseAuth();
*          return <div>(user?.displayName || 'not authenticated')}</div>;
*         );
*       }
* References:
* https://dev.to/dchowitz/react-firebase-a-simple-context-based-authentication-provider-1ool
*
* https://kentcdodds.com/blog/how-to-use-react-context-effectively
*/