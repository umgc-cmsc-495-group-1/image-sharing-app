import React from "react";
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
// import "@testing-library/react/dont-cleanup-after-each";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import PostPage from "../PostPage";

const totalPosts = [
  '4e0b164f-8895-4a8c-8ea0-775cef8750f2',
  '49717c37-fe75-4df7-9db1-3a2a0726af96',
  '469ea46c-549f-487f-8587-59eb5a1f97a7',
  '503bac0d-7996-40c6-a27b-3f16c2f12262'
]

const testPost = totalPosts[Math.floor(Math.random() * totalPosts.length)];

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={[`/post/${testPost}`]}>
      <Routes>
        <Route path="/post/:pid" element={<PostPage />} />
      </Routes>
    </MemoryRouter>
  );
})

describe('Renders the Post Page component', () => {
  it('Generates a random post from the database', () => {
    expect(screen.getByRole('post-header')).toBeInTheDocument();
  })
  it('Generates another post and confirms that the buttons are active', () => {
    expect(screen.getByRole('post-header')).toBeInTheDocument();
    expect(screen.getByRole('like-button')).toBeInTheDocument();
    expect(screen.getByRole('comment-button')).toBeInTheDocument();
  })
})
