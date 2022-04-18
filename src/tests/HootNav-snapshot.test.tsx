import React from 'react';
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootNav from '../components/HootNav';
import { create } from 'react-test-renderer';

it('Renders correctly', () => {
  const renderer = create(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<HootNav />} />
      </Routes>
    </MemoryRouter>
  )

  expect(renderer.toJSON()).toMatchSnapshot();
});