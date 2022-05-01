import React from 'react';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { fireEvent, queryByAttribute,render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import HootSignup from "../components/HootSignup";
import HootNav from "../components/HootNav";

function renderWithMemoryRouter() {
  return render(
    <MemoryRouter initialEntries={['/signup']}>
          <Routes>
            <Route path="/signup" element={<HootSignup />} />
          </Routes>
        </MemoryRouter>
  );
}

const location = {
  pathname: "/",
  search: "",
  hash: "",
  state: {
    uid: 'max@test.com',
    pid: '1'
  },
  key: "ac3df4",
}
 

function renderMenuWithMemoryRouter() {
  return render(
    <MemoryRouter initialEntries={['/']} >
      <Routes location={location}  >
      
        <Route  path="/"  element={<HootNav /> } />
        
      </Routes>
    </MemoryRouter>
  );
}

/** 
* @description - HootSignup Component Test Plan Scope   
*  Module: Sign Up
*  Roles: Guests/Users
*  Tests: 
   1. Test to validate all form fields should be blank when the page is first rendered. 
   2. Test to sign up user via sign up form 
*/


describe("Module: HootSignup Component Test", () => {
  afterEach(() => cleanup())
  it('1.Test to validate all form fields should be blank when the page is first rendered.', () => {
    act(() => {
      renderWithMemoryRouter();
    })
    const signupForm = screen.getByRole('signup-form');
    const displayNameField = screen.getByRole('display-name-input');
    const userField = screen.getByRole('username-input');
    const emailField = screen.getByRole('email-input');
    const passwordField = screen.getByRole('password-input');
    const verifyPasswordField = screen.getByRole('verify-password-input');
    expect(signupForm).toBeInTheDocument();
    // get the Display Name Field 
    expect(displayNameField).toBeInTheDocument();
    expect(displayNameField).not.toHaveTextContent('John');
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

  it('2. Test to sign up user via sign up form ', async () => {
    
    const {getByTestId} = renderWithMemoryRouter();
    const signupForm = screen.getByRole('signup-form');
   // const loginForm = screen.getByRole('login-form');
   const getById = queryByAttribute.bind(null, 'id');
    const userField = screen.getByLabelText (/Email Address/i);
    const passwordField = screen.getByTestId('password-input');
    
    // get the user Name Field 
    expect(userField).toBeInTheDocument();
    expect(userField).not.toHaveTextContent('johndoe');
    
    await act(async() => {
      fireEvent.change(userField , { target: { value: 'max@test.com' } });
     });

    // get the password  Field 
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).not.toHaveTextContent('password');
    
    await act(async() => {
      fireEvent.change(passwordField , { target: { value: 'Password18!' } });
     });

    expect(passwordField).toHaveValue('Password18!');

    const submitBtn = getById(signupForm, 'submit');
    submitBtn?.focus();

    expect(submitBtn).toBeInTheDocument();
   
    setTimeout(() => { console.log('wait half a second') }, 1500);
   
   // click on the menu icon
   await  act(async() => {
    //fireEvent.click(navMenuButton);
   });
   
 
  });
}); 