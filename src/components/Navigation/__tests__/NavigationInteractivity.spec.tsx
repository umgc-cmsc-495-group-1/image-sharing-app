import React from "react";
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
// import "@testing-library/react/dont-cleanup-after-each";
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Navigation} from "../../Navigation";
import HootHome from "../../HomePage";
import HootLogin from "../../HootLogin";
import HootSignup from "../../HootSignup";

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Navigation/>} />
        <Route path="/" element={<HootHome/>} />
        <Route path="/login" element={<HootLogin />} />
        <Route path="/signup" element={<HootSignup />} />
      </Routes>
    </MemoryRouter>
  );
})


describe('Navigation Interactivity Tests', () => {
  it('Open the menu - Navigate to Login', function () {
    // open menu button
    const menuButton = screen.getByRole('menu-icon');
    fireEvent.click(menuButton);
    // click on login
    const loginButton = screen.getByRole('navigation-login');
    fireEvent.click(loginButton);
    // assert we have navigated to login
    const loginPage = screen.getByRole('login-page-container');
    expect(loginPage).toBeInTheDocument();
  });
  it('Navigates to the Sign-up Page', () => {
    // open menu button
    const menuButton = screen.getByRole('menu-icon');
    fireEvent.click(menuButton);
    // click on sign-up
    const signUpButton = screen.getByRole('navigation-signup');
    fireEvent.click(signUpButton);
    // assert we have navigated to sign-up
    const signUpPage = screen.getByRole('sign-up-page-container');
    expect(signUpPage).toBeInTheDocument();
  });
})


