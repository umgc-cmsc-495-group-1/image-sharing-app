import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootNav from '../components/HootNav';
import HootHome from '../components/HootHome';
import HootLogin from '../components/HootLogin';
import HootSignup from '../components/HootSignup';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

// interface IMakeRoutes {
//   component: JSX.Element;
//   path: string | "";
//   key: string;
// }

// const currentRoutes: IMakeRoutes[] = [
//   { component: <HootNav/>, path: "/", key: "nav" },
//   { component: <HootHome/>, path: "/", key: "home" },
//   { component: <HootLogin/>, path: "/login", key: "login" },
//   { component: <HootSignup/>, path: "/signup", key: "signup" },
// ]

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
afterAll(() => {
  cleanup();
})

describe('App Navigation', () => {
  it('Navigation Renders properly and sidebar operational', () => {
    const navMenuButton = screen.getByLabelText('menu');
    fireEvent.click(navMenuButton);
    setTimeout(() => { console.log('wait half a second') }, 500);
    const navHome = screen.getByRole('navigation-home');
    const navLogin = screen.getByRole('navigation-login');
    const navSignup = screen.getByRole('navigation-signup');
    // check for the home information
    expect(navHome).toBeInTheDocument();
    expect(navHome).toHaveTextContent('Home');
    // expect(navHome).toHaveAttribute('href', '/');
    // check for the login information
    expect(navLogin).toBeInTheDocument();
    expect(navLogin).toHaveTextContent('Login');
    // expect(navLogin).toHaveAttribute('href', '/login');
    // check for the signup information
    expect(navSignup).toBeInTheDocument();
    expect(navSignup).toHaveTextContent('Sign Up');
    // expect(navSignup).toHaveAttribute('href', '/signup');
  })
  it('Navigates to the Sign Up Page', () => {
    // open nav bar
    const navMenuButton = screen.getByLabelText('menu');
    fireEvent.click(navMenuButton);

    const navSignup = screen.getByRole('navigation-signup');
    // navigate to the signup page
    fireEvent.click(navSignup);
    setTimeout(() => { console.log('wait half a second') }, 500);
    const signupForm = screen.getByRole('signup-form');
    expect(signupForm).toBeInTheDocument();
  })
  it('Navigates to the Login Page', () => {
    // open nav bar
    const navMenuButton = screen.getByLabelText('menu');
    fireEvent.click(navMenuButton);

    const navLogin = screen.getByRole('navigation-login');
    // navigate to the login page
    fireEvent.click(navLogin);
    setTimeout(() => { console.log('wait half a second') }, 500);
    
    const loginForm = screen.getByRole('login-form');
    expect(loginForm).toBeInTheDocument();
  })
})