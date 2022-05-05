export {}
// todo: need to implement this test

// import React from "react";
// import {
//   MemoryRouter,
//   Routes,
//   Route
// } from 'react-router-dom';
// import "@testing-library/react/dont-cleanup-after-each";
// import {fireEvent, render, screen} from '@testing-library/react';
// import "@testing-library/"
// import '@testing-library/jest-dom';
// import Feed from "../index";
// import {Login} from "@mui/icons-material";
// import {Navigation} from "../../Navigation";
// import HootHome from "../../HomePage";
//
// beforeAll(() => {
//   render(
//     <MemoryRouter initialEntries={['/']}>
//       <Routes>
//         <Route path="/" element={<Navigation/>} />
//         <Route path="/" element={<HootHome/>} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/feed" element={<Feed />} />
//       </Routes>
//     </MemoryRouter>
//   );
// })
//
//
// describe('Feed Interactivity Tests', () => {
//   it('Open the menu - Navigate to Login', function () {
//     // open menu button
//     const menuButton = screen.getByRole('menu-icon');
//     fireEvent.click(menuButton);
//
//     expect(menuButton).toBeInTheDocument();
//   });
// })
//
//
