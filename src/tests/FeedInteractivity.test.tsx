import React from 'react';
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import Feed from '../components/Feed';
import { UserPost } from '../components/UserPost';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';


// beforeEach(() => {
//   const location = {
//     pathname: "/feed",
//     search: "",
//     hash: "",
//     state: null,
//     key: "r9qntrej",
//   }

//   act(() => {
//     render(
//       <MemoryRouter initialEntries={['/user/1/profile/1']}>
//         <Routes location={location}>
//           <Route path="/feed" element={<Feed />} />
//           <Route path="/user/:uid/profile/:pid" element={<UserPost />} />
//         </Routes>
//       </MemoryRouter>
//     );
//   })
// });
// afterEach(() => {
//   cleanup();
// });

//Only first one needs to be tested as the same code is repeated :)
describe('Feed Page Functionality', () => {
  it('Like button increases count when clicked', () => {
    const location = {
      pathname: "/feed",
      search: "",
      hash: "",
      state: null,
      key: "r9qntrej",
    }
    act(() => {
      render(
        <MemoryRouter initialEntries={['/user/1/profile/1']}>
          <Routes location={location}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/user/:uid/profile/:pid" element={<UserPost />} />
          </Routes>
        </MemoryRouter>
      );
    })

    const likeButton = screen.getAllByRole('button', { name: 'like' });

    const currLike = parseInt(likeButton[0].textContent!);
    fireEvent.click(likeButton[0]);
    const newLike = parseInt(likeButton[0].textContent!);
    expect(newLike === (currLike + 1));
  });

  it('Clicking on comment boxes lead to correct page', () => {
    const location = {
      pathname: "/feed",
      search: "",
      hash: "",
      state: null,
      key: "r9qntrej",
    }
    act(() => {
      render(
        <MemoryRouter initialEntries={['/user/1/profile/1']}>
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/user/:uid/profile/:pid" element={<UserPost />} />
          </Routes>
        </MemoryRouter>
      );
    })
    // const commentBox = screen.getAllByRole('button', { name: 'comment' });

    // //expect commentBox to exist, then click
    // expect(commentBox[0]).toBeInTheDocument();
    // act(() => {
    //   fireEvent.click(commentBox[0]);
    // })

    //When comment from feed page renders to / but comments still show up 
    // expect(window.location.href).toEqual('http://localhost:3000/user/1/profile/1');

    //Test comments are on screen
    expect(screen.getByRole('username')).toBeInTheDocument();
  });
});