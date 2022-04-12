import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import { 
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootLogin  from '../components/HootLogin';
import { create } from 'react-test-renderer';

function renderWithMemoryRouter(component: JSX.Element) {
  return create(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path='/login' element={component} />
      </Routes>
    </MemoryRouter>
  );
}

it('Renders correctly',() => {
  const renderer = renderWithMemoryRouter(<HootLogin/>);
  expect(renderer.toJSON()).toMatchSnapshot();
})

