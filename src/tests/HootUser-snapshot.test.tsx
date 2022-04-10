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

function renderWithMemoryRouter(component: JSX.Element) {
  return create(
    <MemoryRouter initialEntries={['/user']}>
      <Routes>
        <Route path='/user' element={component} />
      </Routes>
    </MemoryRouter>
  );
}

it('Renders correctly',() => {
  const renderer = renderWithMemoryRouter(<HootUser/>);
  expect(renderer.toJSON()).toMatchSnapshot();
});