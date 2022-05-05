import React from 'react';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { render, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import HootSignup from "../components/HootSignup";

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path="/signup" element={<HootSignup />} />
      </Routes>
    </MemoryRouter>
  );
})

describe("Module: HootSignup Component Test", () => {
  afterEach(() => cleanup())
  it('1.Test to validate all form fields should be blank when the page is first rendered.', () => {
    const signupForm = screen.getByRole('sign-up-page-container');
    const displayNameField = screen.getByRole('display-name-input');
    const emailField = screen.getByRole('email-input');
    const passwordField = screen.getByRole('password-input');
    const verifyPasswordField = screen.getByRole('verify-password-input');
    expect(signupForm).toBeInTheDocument();
    // get the Display Name Field
    expect(displayNameField).toBeInTheDocument();
    expect(displayNameField).not.toHaveTextContent('John');
    // get the email address Field
    expect(emailField).toBeInTheDocument();
    expect(emailField).not.toHaveTextContent('jsmith@email.com');
    // get the password  Field
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).not.toHaveTextContent('password');
    // get the verify password  Field
    expect(verifyPasswordField).toBeInTheDocument();
    expect(verifyPasswordField).not.toHaveTextContent('password');
  });
});
