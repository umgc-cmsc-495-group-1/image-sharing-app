import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import { 
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import Feed from '../components/Feed/index';
import { create } from 'react-test-renderer';

function renderWithMemoryRouter(component: JSX.Element) {
  return create(
    <MemoryRouter initialEntries={['/feed']}>
      <Routes>
        <Route path='/feed' element={component} />
      </Routes>
    </MemoryRouter>
  );
}

it('Renders correctly',() => {
  const renderer = renderWithMemoryRouter(<Feed />);
  expect(renderer.toJSON()).toMatchSnapshot();
});