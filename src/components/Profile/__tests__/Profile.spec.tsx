import React from "react";
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
// import "@testing-library/react/dont-cleanup-after-each";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from "../index";

function encodeEmail(email: string) {
  let encodedEmail = encodeURIComponent(email);
  encodedEmail = encodedEmail.replace(".", "-");
  return encodedEmail;
}

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={[`/user/${encodeEmail("max@test.com")}`]}>
      <Routes>
        <Route path="/user/:email" element={<Profile />} />
      </Routes>
    </MemoryRouter>
  );
})

describe('Renders the Profile Page component', () => {
  it('Passes a max@test.com to the component', () => {
    expect(screen.getByRole('profile-image')).toBeInTheDocument();
  })
  it('confirms the user display name', () => {
    expect(screen.getByRole('display-name')).toBeInTheDocument()
  })
  it('confirms the first profile image loaded', () => {
    expect(screen.getAllByRole('profile-image')[0]).toBeInTheDocument();
  })
})
