import * as React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Feed from "./components/Feed";
import { UserPost } from "./components/UserPost";
import HootHome from "./components/HootHome";
import HootLogin from "./components/HootLogin";
import { Navigation } from "./components/Navigation";
import HootSignup from "./components/HootSignup";
import Hoot404 from "./components/Hoot404";
import HootUserSettings from "./components/HootUserSettings";
import { CssBaseline } from "@mui/material";
import { Profile } from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeRoute from "./components/HomeRoute";

export default function App() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          index: true,
          element: (
            <HomeRoute>
              <Feed />
            </HomeRoute>
          ),
        },
        {
          path: "/login",
          element: <HootLogin />,
        },
        {
          path: "/home",
          element: <HootHome />,
        },
        {
          path: "/signup",
          element: <HootSignup />,
        },
        {
          path: "/feed",
          element: (
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          ),
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
                    {
                      index: true,
                      element: (
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      ),
                    },
                    {
                      path: ":pid",
                      children: [
                        {
                          index: true,
                          element: (
                            <ProtectedRoute>
                              <UserPost />
                            </ProtectedRoute>
                          ),
                        },
                      ],
                    },
                  ],
                },
                {
                  path: "settings",
                  element: (
                    <ProtectedRoute>
                      <HootUserSettings />
                    </ProtectedRoute>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "*",
          element: <Hoot404 />,
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#bfa760",
      },
      secondary: {
        main: "#039be5",
      },
      info: {
        main: "#ABABAB",
      },
      warning: {
        main: "#EB2D0B",
      },
      grey: {
        "200": "#F7F7F7",
        "300": "#EBEBEB",
        "500": "#DADAD9",
        "700": "#ABABAB",
        "900": "#6B6B6B",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">{element}</div>
    </ThemeProvider>
  );
}
