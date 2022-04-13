import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootSignup from '../components/HootSignup';
import { create } from 'react-test-renderer';

function renderWithMemoryRouter(component: JSX.Element) {
  return create(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path='/signup' element={component} />
      </Routes>
    </MemoryRouter>
  );
}

it('Renders correctly', () => {
  const renderer = renderWithMemoryRouter(<HootSignup />);
  expect(renderer.toJSON()).toMatchSnapshot();
});