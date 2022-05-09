import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { fireEvent,render, screen, cleanup,getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import HootSignup from "../components/HootSignup";



beforeEach(() => {
  const location = {
    pathname: "/",
    search: "",
    hash: "",
    state: {
      uid: '1',
      pid: '1'
    },
    key: "r9qntrej",
  }
  act(() => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
          <Routes>
            <Route path="/signup" element={<HootSignup />} />
          </Routes>
        </MemoryRouter>
    );
  })
});
afterEach(() => cleanup());


/** 
* @description - HootSignup Component Test Plan Scope   
*  Module: Sign Up
*  Roles: Guests/Users
*  Tests: 
   1. Test to validate all form fields should be blank when the page is first rendered. 
   2. Test to sign up user via sign up form 
*/
describe("Module: HootSignup Component Test", () => {
  it('1.Test to validate all form fields should be blank when the page is first rendered.', () => {
   
    const signupForm = screen.getByRole('signup-form');
    const displayNameField = screen.getByRole('display-name-input');
    //const userField = screen.getByRole('username-input');
    const emailField = screen.getByRole('email-input');
    const passwordField = screen.getByRole('password-input');
    const verifyPasswordField = screen.getByRole('verify-password-input');
    expect(signupForm).toBeInTheDocument();
    // get the Display Name Field 
    expect(displayNameField).toBeInTheDocument();
    expect(displayNameField).not.toHaveTextContent('John');
    // get the user Name Field 
    //expect(userField).toBeInTheDocument();
    //expect(userField).not.toHaveTextContent('jsmith');
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
  
   // const {getByTestId} = screen;
    //const signupForm = screen.getByRole('signup-form');
    const displayNameField = screen.getByLabelText(/Display Name/i);
    const emailField = screen.getByLabelText(/Email Address/i);
    const passwordField = screen.getByRole('password-input').querySelector('input') as HTMLInputElement;
    const verifyPasswordField = screen.getByRole('verify-password-input').querySelector('input') as HTMLInputElement;
    const checkbox = screen.getByRole('check-box');
    await act(async() => {
      fireEvent.change(displayNameField , { target: { value: 'John Doe' } });
     });
     
    // get the Display Name Field 
    expect(displayNameField).toBeInTheDocument();
    expect(displayNameField).toHaveValue('JohnDoe');

    await act(async() => {
      fireEvent.change(emailField , { target: { value: 'John.Doe@mail.com' } });
     });
    // get the email address Field 
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveValue('John.Doe@mail.com');
    await act(async() => {
      fireEvent.change(passwordField , { target: { value: 'mypassword' } });
     });
    // userEvent.type(passwordField,'Password');
     setTimeout(() => { console.log('wait half a second') }, 500);
    console.log(passwordField.value);
    // get the password  Field 
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveValue('mypassword');

    await act(async() => {
      fireEvent.change(verifyPasswordField , { target: { value: 'mypassword' } });
     });
   // userEvent.type(verifyPasswordField,'Password');
    // get the verify password  Field 
    expect(verifyPasswordField).toBeInTheDocument();
    expect(verifyPasswordField).toHaveValue('mypassword');

    expect(checkbox).not.toBeChecked();
    //checkbox
    await act(async() => {
      fireEvent.change(checkbox , { target: { checked: true } });
       
     });
     expect(checkbox).toHaveProperty('checked', true)
    const submitBtn = screen.getByTestId('submit-input');
   //   submitBtn?.focus();
   //   userEvent.click(submitBtn);
   //   setTimeout(() => { console.log('wait half a second') }, 500);
    //  expect(submitBtn).not.toBeDisabled();


  });
}); 