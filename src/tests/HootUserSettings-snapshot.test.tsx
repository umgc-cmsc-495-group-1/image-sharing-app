import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootUserSettings from '../components/HootUserSettings';
import { create } from 'react-test-renderer';

it('Renders correctly', () => {
  const renderer = create(
    <MemoryRouter initialEntries={['/user/settings']}>
      <Routes>
        <Route path='/user/settings' element={<HootUserSettings />} />
      </Routes>
    </MemoryRouter>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
});