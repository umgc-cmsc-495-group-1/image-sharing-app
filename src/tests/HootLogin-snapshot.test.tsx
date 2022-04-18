import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootLogin from '../components/HootLogin';
import { create } from 'react-test-renderer';

it('Renders correctly', () => {
  const renderer = create(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path='/login' element={<HootLogin />} />
      </Routes>
    </MemoryRouter>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
});