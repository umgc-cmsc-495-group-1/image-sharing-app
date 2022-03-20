# Image Sharing App

## Environment Setup

### Nodejs

If you do not have nodejs installed, then head to the following link and download the LTS version of [node](https://nodejs.org/).

The current LTS version as of writing this is `16.14.2` but any stable version should work `16.14.x`

To check if you have node installed run the following command `node -v`

### Cloning the Repo and Install Modules

`git clone https://github.com/umgc-cmsc-495-group-1/image-sharing-app.git`

`cd image-sharing-app`

`npm install`

### Launch the Application

`npm start`

Open your browser and go to [http://localhost:3000](http://localhost:3000)

### Errors

If you get any errors, try deleting `package-lock.json` and running `npm install`, then `npm start` again.

## How to Contribute

[Read the Contributing Guidelines](https://github.com/umgc-cmsc-495-group-1/image-sharing-app/blob/master/CONTRIBUTING.md)

## Understanding the Example Components

These are not part of the application plan, I have just placed them in the app for you to play with and understand 
how components work within a React application.

### Naming Conventions

All Components require PascalCase naming convention - `ExampleHome` or `AnotherExampleComponent`.

This is to distinguish them from variables in JavaScript, which have camelCase naming conventions - `exampleOne` or `anotherExample`.

### ExampleHome.jsx

This is our `Home Page` component, it will render the following html to the DOM when the router determines 
this component has been called. 

```jsx
import React from "react";

export default function ExampleHome() {
    return (
        <div>
            <main>
                <h2>Homepage</h2>
                <p>This is the home page</p>
            </main>
        </div>
    );
}
```

### ExampleAbout.jsx

This is the same as the previous example, except it is our `About Page`, and the link will send us back to the `Home Page`.

```jsx
import React from "react";

export default function ExampleAbout() {
    return (
        <>
            <main>
                <h2>About</h2>
                <p>This is the about page</p>
            </main>
        </>
    );
}
```

### ExampleUserLink.jsx

Here we are generating links for the user to click on, there is a `prop` called users which gets its data from the constant
`users`.

```jsx
import React from "react";
import UserIndex from "./ExampleUserIndex"
import {getUsers} from "../../__tests__/test_data";

export default function ExampleUserLink() {
    const users = getUsers();
    return (
        <div>
            <h1>List of Users</h1>
            <ul>
                <UserIndex
                    users={users}
                />
            </ul>
        </div>
    );
}
```

### ExampleUserIndex.jsx

We can see the result of passing the props to the component in the previous example. We are mapping the data 
dynamically generating individual list items based on the length of the list. Each link will have a unique path which
will create a unique url for routing. 

```jsx
import React from "react";
import {Link} from "react-router-dom";

export default function UserIndex(props) {
    return (
        <div>
            {props.users.map((user) => (
                <li key={`${user.id}-${user.first}-${user.last}`}>
                    <Link
                        to={`/users/${user.first.toLowerCase()}-${user.last.toLowerCase()}`}
                        state={{
                            id: user.id,
                            first: user.first,
                            last: user.last
                        }}
                    >{user.first} {user.last}</Link>
                </li>
            ))}
        </div>
    );
}
```



### ExampleUserPage.jsx

This is a simple User Page, we can see the information which can be gathered from location state. This is passed through
the routes by links.

```jsx
import React from "react";
import {useLocation} from "react-router-dom";

export default function ExampleUserPage() {
    const location = useLocation();
    return (
        <>
            <main>
                <h2>Welcome, {location.state.first} {location.state.last}!</h2>
                <p>You are the Number {location.state.id} user on the application!</p>
            </main>
        </>
    );
}
```

### Example404.jsx

This is just a simple 404-page example - but we keep this at the bottom of the routes, for route cannot be found it will render.

```jsx
import React from "react";

export default function Example404 () {
    return (
        <main>
            <h2>404 Nothing found!</h2>
            <p>There is nothing here!</p>
        </main>
    );
}
```


### App.js

This is where we will import all of our components for routing. We build the routing structure of the application here.
Notice how the `:name` slug for the user comes before the `users` route. This is to ensure when routing to an individual
user it will get hit first. React routes from the index page first, and all paths are exact, but using `:something` can 
assist with dynamic routing.

```js
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import ExampleHome from "./components/examples/ExampleHome";
import ExampleAbout from "./components/examples/ExampleAbout";
import ExampleUserLink from "./components/examples/ExampleUserLink";
import Example404 from "./components/examples/Example404";
import ExampleUserPage from "./components/examples/ExampleUserPage";

function App() {
    return (
        <div>
            <Router>
                <nav>
                    <Link to="/">Home</Link>
                    <br/>
                    <Link to="/about">About</Link>
                    <br/>
                    <Link to="/users">Users</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<ExampleHome />} />
                    <Route path="/about" element={<ExampleAbout />} />
                    <Route path="/users/:name" element={<ExampleUserPage />} />
                    <Route path="/users" element={<ExampleUserLink />} />
                    <Route path="*" element={<Example404 />} />
                </Routes>
            </Router>
        </div>
    );
}
```

### Index.js

This component is the base of the component tree, it will render all the components passed to the App component.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

## Documentation Links

[React Router](https://reactrouter.com/docs/en/v6) - Used for navigating between pages

[Material UI](https://mui.com/getting-started/installation/) - Used for Components and simplifying CSS

[Jest](https://jestjs.io/docs/tutorial-react) - Testing framework to ensure component structure

[Firebase](https://firebase.google.com/docs/web/setup) - Used for our backend data storage and User authentication

[Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) - Used for testing backend locally without needing to deploy to the cloud

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
