import React from 'react';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';
import { 
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import HootNav from '../components/HootNav';
import { create } from 'react-test-renderer';

function renderWithMemoryRouter(component: JSX.Element) {
  return create(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={component} />
      </Routes>
    </MemoryRouter>
  );
}

it('Renders correctly',() => {
  const renderer = renderWithMemoryRouter(<HootNav/>);
  expect(renderer.toJSON()).toMatchSnapshot();
})

