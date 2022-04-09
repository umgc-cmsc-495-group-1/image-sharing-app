import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import { 
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import Hoot404  from '../components/Hoot404';
import { create } from 'react-test-renderer';

function renderWithMemoryRouter(component: JSX.Element) {
  return create(
    <MemoryRouter>
      <Routes>
        <Route path='*' element={component} />
      </Routes>
    </MemoryRouter>
  );
}
it('Renders correctly',() => {
  const renderer = renderWithMemoryRouter(<Hoot404 />);
  expect(renderer.toJSON()).toMatchSnapshot();
})

