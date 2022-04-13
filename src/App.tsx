import * as React from 'react';
import {
  RouteObject, useRoutes
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Feed from './components/Feed';
import UserPost from './components/UserPost';
import HootHome from './components/HootHome';
import HootLogin from './components/HootLogin';
import HootNav from './components/HootNav';
import HootSignup from './components/HootSignup';
import HootUser from './components/HootUser';
import Hoot404 from './components/Hoot404';
import HootUserSettings from './components/HootUserSettings';
import { CssBaseline } from '@mui/material';

export default function App() {
  console.log('test');

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <HootNav />,
      children: [
        {
          index: true,
          element: <HootHome />
        },
        {
          path: "/login",
          element: <HootLogin />
        },
        {
          path: "/signup",
          element: <HootSignup />
        },
        {
          path: "/feed",
          element: <Feed />
        },
        {
          path: "/user",
          children: [
            {
              path: ":uid",
              children: [
                {
                  path: "profile",
                  children: [
                    { index: true, element: <HootUser /> },
                    {
                      path: ":pid",
                      children: [
                        { index: true, element: <UserPost /> },
                      ],
                    },
                  ],
                },
                {
                  path: "settings",
                  element: <HootUserSettings />
                },
              ]
            },
          ],
        },
        {
          path: "*",
          element: <Hoot404 />
        },
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
      info: {
        main: '#ABABAB',
      },
      warning: {
        main: '#EB2D0B',
      },
      grey: {
        "200": '#F7F7F7',
        "300": '#EBEBEB',
        "500": '#DADAD9',
        "700": '#ABABAB',
        "900": '#6B6B6B'
      }

    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {element}
      </div>
    </ThemeProvider>
  );
}
