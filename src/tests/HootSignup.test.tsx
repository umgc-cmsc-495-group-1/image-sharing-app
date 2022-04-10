import {act, render,screen, queryByAttribute,cleanup,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import HootNav from '../components/HootNav';
import HootHome from '../components/HootHome';
import HootLogin from '../components/HootLogin';
import HootSignup from "../components/HootSignup";
import { 
    MemoryRouter,
    Routes,
    Route
  } from 'react-router-dom';

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
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HootNav />} />
          <Route path="/" element={<HootHome />} />
          <Route path="/login" element={<HootLogin />} />
          <Route path="/signup" element={<HootSignup />} />
        </Routes>
      </MemoryRouter>
    );
  }

  beforeAll(() => {
    renderWithMemoryRouter();
})
afterEach(cleanup);

describe("Module: HootSignup Component Test", () => {
    it('1: Should be able to access the sign up page', () => {
        const navMenuButton = screen.getByLabelText('menu');
        // click on the menu icon
        act(() => {
          fireEvent.click(navMenuButton);
        });
        setTimeout(() => { console.log('wait half a second') }, 500);
        const navSignup = screen.getByRole('navigation-signup');
        // navigate to the signup page
        act(() => {
          fireEvent.click(navSignup);
       });
        setTimeout(() => { console.log('wait half a second') }, 500);
        const signupForm = screen.getByRole('signup-form');
        expect(signupForm).toBeInTheDocument();
        expect(navSignup).toHaveTextContent('Sign Up');
    });
    it('2.Test to validate all form fields should be blank when the page is first rendered.', () => {
      renderWithMemoryRouter(); 
       const navMenuButton = screen.getByLabelText('menu');
        // click on the menu icon
        act(() => {
          fireEvent.click(navMenuButton);
        });
        //setTimeout(() => { console.log('wait half a second') }, 500);
        const navSignup = screen.getByRole('navigation-signup');
        // navigate to the signup page
        act(() => {
          fireEvent.click(navSignup);
        });
        setTimeout(() => { console.log('wait half a second') }, 500);
        const signupForm = screen.getByRole('signup-form');
        const getById = queryByAttribute.bind(null, 'id');
        // get the Display Name Field 
        const nameField = getById(signupForm, 'displayName');
        expect(nameField).toHaveTextContent("");
         // get the user Name Field 
         const userField = getById(signupForm, 'username');
         expect(userField).toHaveTextContent("");
        // get the email address Field 
        const emailField = getById(signupForm, 'email');
        expect(emailField).toHaveTextContent("");
        // get the password  Field 
        const passwordField = getById(signupForm, 'password');
        expect(passwordField).toHaveTextContent("");
        // get the verify password  Field 
        const verifyPasswordField = getById(signupForm, 'verifyPassword');
        expect(verifyPasswordField).toHaveTextContent("");          
    });
    it('3. Test to sign up user that does not exist', () => {
      // to be added        
    });
    it('4. Test for valid password during sign up', () => {
      // to be added        
    });

});