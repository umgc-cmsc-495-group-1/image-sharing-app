import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { logout } from '../../data/authFunctions'
import { useFirebaseAuth } from '../../context/AuthContext'
import { useCurrentUser } from '../../hooks/useCurrentUser'
// import { deleteUser } from '../../data/userData'

/****************************************************
*
* fake form for testing user sign up with emulator *
*
*****************************************************/

function ExampleSignupPage() {

  // const [email, setEmail] = useState({email: ''});
  // const [password, setPassword] = useState({password:''});

  const userId = (useFirebaseAuth()?.uid || 'not authenticated')
  const currentUser = (useCurrentUser(userId)?.username || 'no current user')
  console.log('user: ', userId)

  const userLogout = async () => {
    await logout();
    // navigate('/login', { replace: true });
  }

/*

  function Form() {

    const [loginEmail, setEmail] = useState('');
    const [loginPass, setPassword] = useState('');

    const handleInputChange = (event: React.SyntheticEvent) => {
      const { loginEmail, loginPass } = event.target;
      setEmail(loginEmail);
      setPassword(loginPass);
      const user: returnUser = {
        email: loginEmail,
        password: loginPass
      }
      await loginWithPassword(user);
    };
    */


  // Deleting an account should require repeating
  // authentication
  const deleteAccount = async () => {
    // await deleteUser(user.uid);
    // navigate('/login', { replace: true });
    // history.push('/signup');
  }

  const login = async () => {
    //await signUpWithGoogle()
  }

  return (
    <>
      <main>

        <>
          <form
            onSubmit={async (e: React.SyntheticEvent) => {
              e.preventDefault();
              const user = e.target as typeof e.target & {
                first: { value: string }
                last: { value: string }
                userName: { value: string }
                email: { value: string }
                password: { value: string }
              };

              const first = user.first.value
              const last = user.last.value
              const userName = user.userName.value
              const email = user.email.value // typechecks!
              const password = user.password.value // typechecks!
              const newUser = {
                first: first[0].toUpperCase() + first.substring(1),
                last: last[0].toUpperCase() + last.substring(1),
                userName: userName,
                email: email,
                password: password
              }
              // etc...
              try {
                //await signup(newUser);

              } catch (error) {
                console.log(JSON.stringify(newUser));
                console.log(error);
                alert(`signup failed: ${error}`);
              } finally {
                alert('signed up')

              }
            }}
          >
            <input
              type='text'
              name='first'
              placeholder='first name'

            />
            <input
              type='text'
              name='last'
              placeholder='last name'
            >
            </input>
            <input
              type='text'
              name='userName'
              placeholder='userName'
            >
            </input>
            <input
              type='password'
              name='password'
              placeholder='password'
            >
            </input>
            <input
              type='email'
              name='email'
              placeholder='email'
            >
            </input>

            <button
              type='submit'
              // onClick={onSubmit}
              value='sign up'>
              Sign Up
            </button>
          </form>
          <br/>
          <button
            onClick={deleteAccount}>
            delete account
          </button>
          <br />
          {currentUser ?
           <p>{currentUser}</p> : <p>no current user</p>}
          {userId != 'not authenticated' ?
            <button onClick={userLogout}>Logout</button> : <button>Login</button>}
        </>
        <form
        // onSubmit={handleLogin}
        >
          <input
            type='email'
            name='loginEmail'
            placeholder='email'
            // value={loginEmail}
            // onChange={handleInputChange}
          >
          </input>
          <input
            type='password'
            name='loginPass'
            placeholder='password'
            // value={loginPass}
            // onChange={handleInputChange}
          >
          </input>
          <button
            type='submit'
            // value='login'
            onClick={login}
            >
            Log In With Google
          </button>
        </form>
      </main>
    </>
  );
}
export default ExampleSignupPage;