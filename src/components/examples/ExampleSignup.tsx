import React from "react";
//import { useNavigate } from "react-router-dom";
import { signup, logout } from "../../data/authFunctions";
import { useFirebaseAuth } from "../../context/AuthContext";
import { useCurrentUser } from "../../hooks/useCurrentUser";
//import { deleteUser } from "../../data/userData";

/****************************************************
* fake form for testing user sign up with emulator *
*****************************************************/



function ExampleSignupPage() {

  //const [email, setEmail] = useState({email: ''});
  //const [password, setPassword] = useState({password:''});

  const userLogout = async () => {
    await logout();
    //navigate('/login', { replace: true });
    //history.push('/signup');
  };

  // Deleting an account should require repeating
  // authentication
  const deleteAccount = async () => {
    //await deleteUser(user.uid);
    //navigate('/login', { replace: true });
    //history.push('/signup');
  };

  const currentUser = useCurrentUser();
  const user = (useFirebaseAuth() || "not authenticated");

  console.log("user: ", user);



  return (
    <>
      <main>
        <>
        {currentUser ?
            <h1>{currentUser.username}</h1>  : <h1>The current user is null</h1>}
          <form
            onSubmit={async (e: React.SyntheticEvent) => {
              e.preventDefault();
              const user = e.target as typeof e.target & {
                first: { value: string };
                last: { value: string };
                username: { value: string };
                email: { value: string };
                password: { value: string };
              };

              const first = user.first.value;
              const last = user.last.value;
              const username = user.username.value;
              const email = user.email.value; // typechecks!
              const password = user.password.value; // typechecks!
              const newUser = {
                first: first[0].toUpperCase() + first.substring(1),
                last: last[0].toUpperCase() + last.substring(1),
                username: username,
                email: email,
                password: password
              }
              // etc...
              try {
                await signup(newUser);

              } catch (error) {
                console.log(JSON.stringify(newUser));
                console.log(error);
                alert(`signup failed: ${error}`);
              } finally {

                alert("signed up");
              }
            }}
          >

            <input
              type="text"
              name="first"
              placeholder="first name"

            />

            <input
              type="text"
              name="last"
              placeholder="last name"
            >
            </input>

            <input
              type="text"
              name="username"
              placeholder="username"
            >
            </input>

            <input
              type="password"
              name="password"
              placeholder="password"
            >
            </input>

            <input
              type="email"
              name="email"
              placeholder="email"
            >
            </input>

            <button
              type="submit"
              //onClick={onSubmit}
              value="sign up">
              Sign Up
            </button>

          </form>
          <br />

          <button
            onClick={deleteAccount}>
            delete account
          </button>
          <br />
          {user != 'not authenticated' ?
            <button onClick={userLogout}>Logout</button> : <button>Login</button>}
        </>
        <form>

          <input
            type="email"
            name="email"
            placeholder="email"
          >
          </input>
          <input
            type="password"
            name="password"
            placeholder="password"
          >
          </input>

          <button
            type="submit"
            //onClick={onSubmit}
            value="login">
            Log In
          </button>

        </form>
      </main>
    </>
  );
}
export default ExampleSignupPage;