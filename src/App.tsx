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
          path: "/candy-mountain",
          element: <ProtectedRoute component={EasterEgg} path="/candy-mountain"/>,
        },
        {
          path: "/feed",
          element: <ProtectedRoute component={Feed} path="/feed"/>,
        },
        {
          path: "/explore",
          element: <ProtectedRoute component={Explore} path="/explore" />,
        },
        {
          path: "/user",
          children: [
            {
              path: ":email",
              children: [
                {
                  index: true,
                  element: <ProtectedRoute component={Profile} path="/user"/>,
                },
                {
                  path: "settings",
                  element: <ProtectedRoute component={HootUserSettings} path="/user/settings"/>,
                },
                {
                  path: "friends",
                  element: <ProtectedRoute component={Friends} path="/user/friends"/>,
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
      <div className="App">
        {element}
      </div>
    </ThemeProvider>
  );
}

//         <Routes>
//           <Route path="/" element={<Navigation />} >
//             <Route element={<HootHome />}>
//               <Route path="login" element={<HootLogin />} />
//               <Route path="signup" element={<HootSignup />} />
//               <Route path="candy-mountain" element={<EasterEgg />} />
//               <Route path="feed" element={<ProtectedRouteRewrite {...defaultProtectedRouteProps} outlet={<Feed />} />} />
//                 {/*<Route path="explore" element={<ProtectedRoute component={Explore} path="/explore" />} />*/}
//                 {/*<Route path="user" element={<ProtectedRoute component={Profile} path="/user" />}>*/}
//                 {/*  <Route path="settings" element={<ProtectedRoute component={HootUserSettings} path="/user/settings" />} />*/}
//                 {/*  <Route path="friends" element={<ProtectedRoute component={Friends} path="/user/friends" />} />*/}
//                 {/*</Route>*/}
//               <Route path="*" element={<Hoot404 />} />
//             </Route>
//           </Route>
//         </Routes>
