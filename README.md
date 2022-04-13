# Hoot

[![GitHub Super-Linter](https://umgc-cmsc-495-group-1/image-sharing-app/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
![Hoot Version](https://img.shields.io/badge/Hoot-0.1.0-blue)

- [Hoot](#hoot)
  - [Environment Setup](#environment-setup)
    - [Node.js](#nodejs)
  - [How to Contribute](#how-to-contribute)
  - [Understanding the Example Components](#understanding-the-example-components)
    - [Naming Conventions](#naming-conventions)
    - [ExampleNav.tsx](#examplenavtsx)
    - [ExampleHome.jsx](#examplehomejsx)
    - [ExampleAbout.tsx](#exampleabouttsx)
    - [ExampleUserLink.jsx](#exampleuserlinkjsx)
    - [ExampleUserIndex.tsx](#exampleuserindextsx)
    - [ExampleUserPage.tsx](#exampleuserpagetsx)
    - [Example404.tsx](#example404tsx)
    - [App.tsx](#apptsx)
    - [index.tsx](#indextsx)
  - [Documentation Links](#documentation-links)
    - [React](#react)
    - [TypeScript](#typescript)
    - [React TypeScript Cheatsheet](#react-typescript-cheatsheet)
    - [React Router](#react-router)
    - [Material UI](#material-ui)
    - [Jest Testing Library](#jest-testing-library)
    - [Firebase](#firebase)
    - [Firebase Emulator Suite](#firebase-emulator-suite)
    - [TensorFlow.js](#tensorflowjs)
    - [MobileNet](#mobilenet)
  - [Available Scripts](#available-scripts)
    - [npm start](#npm-start)
    - [npm test](#npm-test)
    - [npm fix-lint-errors](#npm-fix-lint-errors)
    - [npm stage](#npm-stage)

## Environment Setup

### Node.js

If you do not have Node.js installed, then head to the following link and download the LTS version [here](https://nodejs.org/).

The current LTS version as of writing this is `16.14.2` but any stable version should work `16.14.x`

To check if you have Node.js installed run the following command `node -v`

## How to Contribute

[Read the Contributing Guidelines](https://github.com/umgc-cmsc-495-group-1/image-sharing-app/blob/master/CONTRIBUTING.md)

## Understanding the Example Components

These are not part of the application plan, I have just placed them in the app for you to play with and understand
how components work within a React application.

### Naming Conventions

All Components require PascalCase naming convention - `ExampleHome` or `AnotherExampleComponent`.

This is to distinguish them from variables in JavaScript, which have camelCase naming conventions - `exampleOne` or `anotherExample`.

### ExampleNav.tsx

This is the heading navigation component which allows for navigation throughout the app.

```tsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

/**
 * This is just and example to show how components can work together
 */
export default function ExampleNav() {
    return (
        <div>
            <nav>
                <Link to='/'>Home</Link>
                <br/>
                <Link to='/about'>About</Link>
                <br/>
                <Link to='/users'>Users</Link>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}
```

### ExampleHome.jsx

This is our `Home Page` component.

```tsx
import React from 'react';

export default function ExampleHome() {
    return (
        <div>
            <main>
                <h2>Home</h2>
                <p>This is the Home page</p>
            </main>
        </div>
    );
}
```

### ExampleAbout.tsx

This is the same as the previous example, except it is our `About Page`.

```tsx
import React from 'react';

export default function ExampleAbout() {
    return (
        <div>
            <main>
                <h2>About</h2>
                <p>This is the about page</p>
            </main>
        </div>
    );
}
```

### ExampleUserLink.jsx

Here we are giving an index for the children components to reference. This is the parent component for all the `ExampleUserPage.tsx`. This is why we need the `Outlet` component to hold the place for everything.

```tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ExampleUserLink() {
    return (
        <div>
            <h1>List of Users</h1>

            <Outlet />
        </div>
    );
}
```

### ExampleUserIndex.tsx

We are mapping the data dynamically generating individual list items based on the length of the list. Each link will have a unique path which will create a unique URL for routing. The interface here is used throughout the rest of the application for User objects, but it could be in `test_date.ts` for cleaner code.

```tsx
import React from 'react';
import {Link} from 'react-router-dom';
import { getUsers } from '../../tests/test_data'

export interface User {
    id: number,
    first: string,
    last: string
}

export default function ExampleUserIndex() {
    const users = getUsers();
    return (
        <div>
            {users.map((user: User) => (
                <li key={`${user.id}-${user.first}-${user.last}`}>
                    <Link
                        to={`/users/${user.id - 1}`}
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

### ExampleUserPage.tsx

This is a simple User Page, we can see the information which can be gathered paths. This is passed through the routes and gathered but the `useParams` method. Then with the help of a function in the example users file we are able to locate the user and assign it to a `User` object, which has specific properties.

```tsx
import React from 'react';
import {useParams} from 'react-router-dom';
import { getUserById } from '../../tests/test_data';
import { User } from './ExampleUserIndex';

export default function ExampleUserPage() {
    const { id } = useParams<'id'>()
    const user: User = getUserById(id);
    return (
        <>
            <main>
                <h2>Welcome, {user.first} {user.last}!</h2>
                <p>You are the Number {user.id} user on the application!</p>
            </main>
        </>
    );
}
```

### Example404.tsx

This is just a simple 404-page example - but we keep this at the bottom of the routes, for route cannot be found it will render.

```tsx
import React from 'react';

export default function Example404 () {
    return (
        <main>
            <h2>404 Nothing found!</h2>
            <p>There is nothing here!</p>
        </main>
    );
}
```

### App.tsx

This is where we will import all of our components for routing. We build the routing structure of the application here. Notice how the `:id` slug for the user comes before the `users` route.

This is to ensure when routing to an individual user it will get hit first. React routes from the index page first, and all paths are exact, but using `:something` can assist with dynamic routing.

The routes constant, which is a `RoutesObject` array, allows us to specifically define out routes in object form going through parent index for some components, and dynamic changing routes depending on the information passing through.

We pass this constant to the `useRoutes` method, and place it as an object in the div. This will be rendered as the app in the HTML for the page, depending on which component is rendered to the page at the time.

```tsx
import React from 'react';
import {
  RouteObject, useRoutes
} from 'react-router-dom';
import ExampleHome from './components/examples/ExampleHome';
import ExampleAbout from './components/examples/ExampleAbout';
import ExampleNav from './components/examples/ExampleNav';
import ExampleUserLink from './components/examples/ExampleUserLink';
import ExampleUserIndex from './components/examples/ExampleUserIndex';
import ExampleUserPage from './components/examples/ExampleUserPage';
import Example404 from './components/examples/Example404';


export default function App() {

  const routes: RouteObject[] = [
      {
          path: '/',
          element: <ExampleNav />,
          children: [
              { index: true, element: <ExampleHome /> },
              { path: '/about', element: <ExampleAbout /> },
              {
                  path: '/users', element: <ExampleUserLink />,
                  children: [
                      { index: true, element: <ExampleUserIndex /> },
                      { path: '/users/:id', element: <ExampleUserPage /> }
                  ]
              },
              { path: '*', element: <Example404 /> }
          ],
      },
  ];

  const element = useRoutes(routes);

  return (
    <div className='App'>
      {element}
    </div>
  );
}
```

### index.tsx

This component is the base of the component tree, it will render all the components passed to the App component. The BrowserRouter Component wraps the App component, providing the application with client-side routing.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
```

## Documentation Links

### React

[React](https://reactjs.org/docs/getting-started.html) - The framework for building UI components

### TypeScript

[TypeScript](https://www.typescriptlang.org/docs/) - TypeScript, a superset of JavaScript, but any JavaScript is valid TypeScript. This will just help catch errors, so feel free to write what you are more comfortable with.

### React TypeScript Cheatsheet

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) - Will help learn best practices and methods for working with React and TypeScript together. There are also great resources for VS Code extensions to improve workflow.

### React Router

[React Router](https://reactrouter.com/docs/en/v6) - Used for navigating between pages

### Material UI

[Material UI](https://mui.com/getting-started/installation/) - Used for Components and simplifying CSS

### Jest Testing Library

[Jest](https://jestjs.io/docs/tutorial-react) - Testing framework to ensure component structure

### Firebase

[Firebase](https://firebase.google.com/docs/web/setup) - Used for our backend data storage and User authentication

### Firebase Emulator Suite

[Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) - Used for testing backend locally without needing to deploy to the cloud

### TensorFlow.js

[TensorFlow.js](https://www.tensorflow.org/js) - machine learning library in JavaScript, will be used for recommendation engine

### MobileNet

[MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet) - Image classification model used by TensorFlow.js

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

### `npm fix-errors`

Running this will run the following command from the available scripts `eslint . --fix`. By running this command
you are checking your code for errors based on the linter I have set up. This is to help improve the codebase and
prevent any issues being pushed to the master branch.

### `npm stage`

This is similar to the previous script, where it will run a pre-commit script, checking your source code for errors
if there are any errors it will attempt to fix them. If there are too many errors it will reject the commit and tell you to correct the code before committing to the repository. There will be hints to assist with what you need to correct.

After this has run you will need to commit the files if it succeeds. `git commit -m '[FILES UPDATED AND CHANGES MADE]'`. You will not need to add the files as this script will add any files for you.
