import "@testing-library/react/dont-cleanup-after-each";
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import HootSignup from "../components/HootSignup";


//
//  Module: Sign Up
//  Roles: Guests/Users
//  Tests: 
//  1. Should be able to access the sign up page
//  2. All form fields should be blank when the page is first rendered.
//  3. Test to sign up user that does not exist
//  4. Test for valid password during sign up
//
//


function renderWithMemoryRouter() {
  return render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path="/signup" element={<HootSignup />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeAll(() => {
  renderWithMemoryRouter();
})
afterAll(() => cleanup())

describe("Module: HootSignup Component Test", () => {
  it('1.Test to validate all form fields should be blank when the page is first rendered.', () => {
    const signupForm = screen.getByRole('signup-form');
    const firstNameField = screen.getByRole('first-name-input');
    const lastNameField = screen.getByRole('first-name-input');
    const userField = screen.getByRole('username-input');
    const emailField = screen.getByRole('email-input');
    const passwordField = screen.getByRole('password-input');
    const verifyPasswordField = screen.getByRole('verify-password-input');
    expect(signupForm).toBeInTheDocument();
    // get the First Name Field 
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField).not.toHaveTextContent('John');
    // get the Last Name Field 
    expect(lastNameField).toBeInTheDocument();
    expect(lastNameField).not.toHaveTextContent('Smith');
    // get the user Name Field 
    expect(userField).toBeInTheDocument();
    expect(userField).not.toHaveTextContent('jsmith');
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