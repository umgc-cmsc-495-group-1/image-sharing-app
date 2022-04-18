import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import Hoot404 from '../components/Hoot404';
import { create } from 'react-test-renderer';

it('Renders correctly', () => {
  const renderer = create(
    <MemoryRouter>
      <Routes>
        <Route path='*' element={<Hoot404 />} />
      </Routes>
    </MemoryRouter>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
});