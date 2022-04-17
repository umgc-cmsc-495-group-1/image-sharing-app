import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootUser from '../components/HootUser';
import { create } from 'react-test-renderer';

it('Renders correctly', () => {
  const renderer = create(
    <MemoryRouter initialEntries={['/user']}>
      <Routes>
        <Route path='/user' element={<HootUser />} />
      </Routes>
    </MemoryRouter>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
});