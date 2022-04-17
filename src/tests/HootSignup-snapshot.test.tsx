import React from 'react';
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootSignup from '../components/HootSignup';
import { create } from 'react-test-renderer';

it('Renders correctly', () => {
  const renderer = create(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path='/signup' element={<HootSignup />} />
      </Routes>
    </MemoryRouter>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
});