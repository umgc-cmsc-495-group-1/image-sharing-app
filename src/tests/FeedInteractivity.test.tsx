import React from 'react';
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import Feed from '../components/Feed';
import { UserPost } from '../components/UserPost';
import HootUser from '../components/HootUser';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';


beforeEach(() => {
  const location = {
    pathname: "/feed",
    search: "",
    hash: "",
    state: {
      uid: '1',
      pid: '1'
    },
    key: "r9qntrej",
  }
  act(() => {
    render(
      <MemoryRouter initialEntries={['/user/1/profile/1']}>
        <Routes location={location}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/user/:uid/profile" element={<HootUser />} />
          <Route path="/user/:uid/profile/:pid" element={<UserPost />} />
        </Routes>
      </MemoryRouter>
    );
  })
});
afterEach(() => cleanup());

//Only first one needs to be tested as the same code is repeated :)
describe('Feed Page Functionality', () => {
  it('Like button increases count when clicked', () => {
    // get the like buttons
    const likeButton = screen.getAllByRole('button', { name: 'like' });
    const currLike = parseInt(likeButton[0].textContent!);
    fireEvent.click(likeButton[0]);
    // userEvent.click(likeButton[0]);
    const newLike = parseInt(likeButton[0].textContent!);
    expect(newLike === (currLike + 1));
  });

  it('Clicking on comment boxes lead to correct page', () => {

    const commentBox = screen.getAllByRole('button', { name: 'comment' });

    //expect commentBox to exist, then click
    expect(commentBox[0]).toBeInTheDocument();
    expect(commentBox[0]).not.toBeDisabled();
    fireEvent.click(commentBox[0]);

    const username = screen.getAllByRole('username');
    //Test comments are on screen
    expect(username[0]).toBeInTheDocument();
    expect(username[0]).toHaveTextContent('Angel Egotrip')
  });
});