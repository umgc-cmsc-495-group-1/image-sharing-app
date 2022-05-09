// todo: need to implement this test

import React from "react";
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import "@testing-library/react/dont-cleanup-after-each";
import {fireEvent, render, screen} from '@testing-library/react';
// import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import {Navigation} from "../../Navigation";
import HootHome from "../../HomePage";
import HootLogin from "../../HootLogin";
import Feed from "../index";

// beforeAll(() => {
//   render(
//     <MemoryRouter initialEntries={['/']}>
//       <Routes>
//         <Route path="/" element={<Navigation />} />
//         <Route path="/" element={<HootHome />} />
//         <Route path="/login" element={<HootLogin />} />
//         <Route path="/feed" element={<Feed />} />
//       </Routes>
//     </MemoryRouter>
//   );
// })

const setup = () => {
  const utils = render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/" element={<HootHome />} />
        <Route path="/login" element={<HootLogin />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </MemoryRouter>
  );
  const emailInput = utils.getByRole('email-login');
  const passwordInput = utils.getByRole('password-login');
  const emailPasswordSubmit = utils.getByRole('login-email-password-submit');
  return {
    emailInput,
    passwordInput,
    emailPasswordSubmit,
    ...utils,
  }
};

describe('Feed Interactivity Tests', () => {
  it('should fail to submit and display errors', () => {
    const { emailPasswordSubmit} = setup();
    expect(emailPasswordSubmit).toBeInTheDocument();
    fireEvent.click(emailPasswordSubmit);
    expect(screen.getByLabelText('submit-error-container')).toBeInTheDocument();
  });
  it('logs the test user into the app',  () => {
    const {emailInput, passwordInput, emailPasswordSubmit} = setup();
    // const simulateClick = jest.fn();
    // const emailInput = screen.getByRole('email-login');
    // const passwordInput = screen.getByRole('password-login');
    // checks for components
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    // fills in the form
    fireEvent.change(emailInput, {value: 'max@test.com'});
    fireEvent.change(passwordInput, {value: 'Password18!'});

    // checks for the submit button
    expect(emailPasswordSubmit).toBeInTheDocument();
    fireEvent.submit(emailPasswordSubmit);

    const feedContainer = screen.getByRole('feed-container');
    expect(feedContainer).toBeInTheDocument();
  });
})
