import * as React from 'react';
import {
	RouteObject, useRoutes
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import HootFeed from './components/HootFeed';
import Feed from './components/Feed';
import UserPost from './components/UserPost';
import TestComment from './components/TestComment';
import HootHome from './components/HootHome';
import HootLogin from './components/HootLogin';
import HootNav from './components/HootNav';
import HootSignup from './components/HootSignup';
import HootUser from './components/HootUser';
import Hoot404 from './components/Hoot404';
import HootUserSettings from './components/HootUserSettings';
import { CssBaseline } from '@mui/material';

export default function App() {

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
							path: ":userId",
							children: [
								{
									path: "profile",
									children: [
										{ index: true, element: <HootUser /> },
										{
											path: "/user/:userId/profile/:pid",
											element: <UserPost />
										},
										{
											path: "/user/:userId/profile/:pid/comments",
											element: <TestComment />
										}
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
