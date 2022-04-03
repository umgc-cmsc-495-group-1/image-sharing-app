import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ExampleAbout from '../components/examples/ExampleAbout';

describe('About page tests', () => {
  afterAll(() => {
    cleanup()
  })

  it('Renders H2 heading with about in title', () => {
    render(<ExampleAbout />);
    // screen.debug();
    const heading = screen.getByText('About');
    expect(heading).toBeInTheDocument();
  })

  it('Renders paragraph with about in text', () => {
    // screen.debug();
    const paragraph = screen.getByTestId('paragraph');
    expect(paragraph).toHaveTextContent(/about/i);
  })

  it('Ensures that About page has main container', () => {
    // screen.debug();
    const mainContainer = screen.getByTestId('main-container');
    expect(mainContainer).toBeVisible();
  })
})
