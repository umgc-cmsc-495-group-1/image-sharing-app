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

function renderWithMemoryRouter(component: JSX.Element) {
  return create(
    <MemoryRouter initialEntries={['/user/settings']}>
      <Routes>
        <Route path='/user/settings' element={component} />
      </Routes>
    </MemoryRouter>
  );
}

it('Renders correctly',() => {
  const renderer = renderWithMemoryRouter(<HootUserSettings/>);
  expect(renderer.toJSON()).toMatchSnapshot();
});