import React from 'react';
import {
  RouteObject, useRoutes
} from "react-router-dom";
import ExampleHome from './components/examples/ExampleHome';
import ExampleAbout from './components/examples/ExampleAbout';
import ExampleNav from './components/examples/ExampleNav';
import ExampleUserLink from './components/examples/ExampleUserLink';
import ExampleUserIndex from './components/examples/ExampleUserIndex';
import ExampleUserPage from './components/examples/ExampleUserPage';
import Example404 from './components/examples/Example404';

const test: string = "name";
test = 5;


export default function App() {

  const routes: RouteObject[] = [
      {
          path: "/",
          element: <ExampleNav />,
          children: [
              { index: true, element: <ExampleHome /> },
              { path: "/about", element: <ExampleAbout /> },
              {
                  path: "/users", element: <ExampleUserLink />,
                  children: [
                      { index: true, element: <ExampleUserIndex /> },
                      { path: "/users/:id", element: <ExampleUserPage /> }
                  ]
              },
              { path: "*", element: <Example404 /> }
          ],
      },
  ];

  const element = useRoutes(routes);

  return (
    <div className="App">
      {element}
    </div>
  );
}