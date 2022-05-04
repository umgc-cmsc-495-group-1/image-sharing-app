import * as React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Feed from "./components/Feed";
import HootHome from "./components/HootHome";
import HootLogin from "./components/HootLogin";
import { Navigation } from "./components/Navigation";
import HootSignup from "./components/HootSignup";
import Hoot404 from "./components/Hoot404";
import HootUserSettings from "./components/HootUserSettings";
import { Profile } from "./components/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { EasterEgg } from "./components/EasterEgg";
import { Friends } from "./components/Friends";
import { Explore } from "./components/Explore";
import {LoadingBackdrop} from "./components/UploadFab/LoadingBackdrop";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";

export default function App() {

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          index: true,
          element: <HootHome />,
        },
        {
          path: "/login",
          element: <HootLogin />,
        },
        {
          path: "/signup",
          element: <HootSignup />,
        },
        {
          path: "/privacy",
          element: <PrivacyPolicy />
        },
        {
          path: "/terms-of-service",
          element: <TermsOfService />
        },
        {
          path: "/candy-mountain",
          element: <ProtectedRoute component={EasterEgg}  />,
        },
        {
          path: "/feed",
          element: <ProtectedRoute component={Feed}  />,
        },
        {
          path: "/explore",
          element: <ProtectedRoute component={Explore}  />,
        },
        {
          path: "/user",
          children: [
            {
              path: ":email",
              children: [
                {
                  index: true,
                  element: <ProtectedRoute component={Profile}  />,
                },
                {
                  path: "settings",
                  element: <ProtectedRoute component={HootUserSettings}  />,
                },
                {
                  path: "friends",
                  element: <ProtectedRoute component={Friends}  />,
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
      <React.Suspense fallback={<LoadingBackdrop />}>
        <div className="App">
          {element}
        </div>
      </React.Suspense>
    </ThemeProvider>
  );
}
