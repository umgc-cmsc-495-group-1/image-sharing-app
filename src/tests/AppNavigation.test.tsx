import React from 'react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootNav from '../components/HootNav';
import HootHome from '../components/HootHome';
import HootLogin from '../components/HootLogin';
import HootSignup from '../components/HootSignup';
import { screen, fireEvent, cleanup, render } from '@testing-library/react';

describe('App Navigation - Render/Navigate', () => {
  beforeEach(() => {
    //Render application
    act(() => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<HootNav />} />
            <Route path="/" element={<HootHome />} />
            <Route path="signup" element={<HootSignup />} />
            <Route path="login" element={<HootLogin />} />
          </Routes>
        </MemoryRouter>
      );
    })
  })

  afterEach(() => {
    cleanup();
  })
  it('Menu Opens', () => {
    // get the menu icon
    const navMenuButton = screen.getByRole('menu-icon');
    // click the menu icon
    act(() => {
      fireEvent.click(navMenuButton);
    });
    // get the links
    const navHome = screen.getByRole('navigation-home');
    const navLogin = screen.getByRole('navigation-login');
    const navSignup = screen.getByRole('navigation-signup');
    // check for the information
    expect(navHome).toBeInTheDocument();
    expect(navLogin).toBeInTheDocument();
    expect(navSignup).toBeInTheDocument();
  })

  it('Navigates to the Sign Up Page', () => {
    // get the menu icon
    const navMenuButton = screen.getByRole('menu-icon');
    act(() => {
      fireEvent.click(navMenuButton);
    });
    // navigate to the signup page
    const navSignup = screen.getByRole('navigation-signup');
    expect(navSignup).toBeInTheDocument();
    act(() => {
      fireEvent.click(navSignup);
    });
    // // check for signup form
    const signupForm = screen.getByRole('signup-form');
    expect(signupForm).toBeInTheDocument();
  })

  it('Navigates to the Login Page', () => {
    // get the menu icon
    const navMenuButton = screen.getByRole('menu-icon');
    act(() => {
      fireEvent.click(navMenuButton);
    });
    const navLogin = screen.getByRole('navigation-login');
    expect(navLogin).toBeInTheDocument();
    // navigate to the login page
    act(() => {
      fireEvent.click(navLogin);
    });
    const loginForm = screen.getByRole('login-form');
    expect(loginForm).toBeInTheDocument();
  })

})