import * as React from 'react';
import {
  RouteObject, useRoutes
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExampleHome from './components/examples/ExampleHome';
import ExampleAbout from './components/examples/ExampleAbout';
import ExampleNav from './components/examples/ExampleNav';
import ExampleUserLink from './components/examples/ExampleUserLink';
import ExampleUserIndex from './components/examples/ExampleUserIndex';
import ExampleUserPage from './components/examples/ExampleUserPage';
import Example404 from './components/examples/Example404';
import HootAppBar from './components/HootAppBar';
import { CssBaseline } from '@mui/material';

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

  const theme = createTheme({
    palette: {
      primary: {
        main: '#bfa760',
      },
      secondary: {
        main: '#039be5',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HootAppBar />
      <div className="App">
        {element}
      </div>
    </ThemeProvider>
  );
}
