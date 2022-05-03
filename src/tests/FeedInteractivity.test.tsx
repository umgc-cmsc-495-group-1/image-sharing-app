import React from 'react';
import '@testing-library/jest-dom';
import {
  MemoryRouter, Route,
  Routes
} from 'react-router-dom';
import Feed from '../components/Feed';
// import {login} from '../data/authFunctions'
import {signInWithEmailAndPassword, User} from 'firebase/auth';
import {ProtectedRoute} from "../components/ProtectedRoute";
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {auth} from "../firebaseSetup";

interface UserTestInterface {
  user: User | null,
  isLoading: boolean,
}

async function getUser(){
  // const currentUser = await login("max@test.com", "Password18!");
  const currentUser = await signInWithEmailAndPassword(auth, "max@test.com", "Password18!")
    .then((result) => {
      return Promise.resolve(result);
    })
  return currentUser;
}

describe('Feed Page Rendering Test', () => {
  it('lets the user pass through the protected route', async () => {
    const setCredentials = await getUser();
    const Context = React.createContext<UserTestInterface>({
      user: setCredentials.user,
      isLoading: false
    });
    const props = {
      user: setCredentials.user,
      isLoading: false
    };
    console.log(setCredentials)
    setTimeout(() => '', 1000);
    act(() => {
      render(
        <Context.Provider value={props}>
          <MemoryRouter initialEntries={['/feed']}>
            <Routes>
              <Route path="/feed" element={<ProtectedRoute component={Feed} />} />
            </Routes>
          </MemoryRouter>
        </Context.Provider>
      );
    });
    // start the test
    const newPost = screen.getByRole('like-button');
    expect(newPost).toBeInTheDocument();
  });
});

// const user: AppUserInterface = {
//   displayName: "max",
//   username: "Armor of Odd",
//   email: "max@test.com",
//   photoURL: "",
//   isVerified: false,
//   uid: "0bvvh2bbVjIuqmUpMFiQoDAebHHA",
//   friends: [
//     "63aa9oRUX0L2Q0kO3JCjcQH4GGnP",
//     "GwPShKadFHEV2W39hMgSGlxzVgzr"
//   ],
//   likes: [
//     "4e0b164f-8895-4a8c-8ea0-775cef8750f2",
//     "bfacbf58-aafd-4d7a-a293-571d2133121c",
//     "5698b634-ac71-45b0-aeef-5bdbdfa89eba",
//   ],
//   bio: "",
//   interests: [],
// }

// const [currentUser, setCurrentUser] = useState<AppUserInterface>({
//   displayName: "max",
//   username: "Armor of Odd",
//   email: "max@test.com",
//   photoURL: "",
//   isVerified: false,
//   uid: "0bvvh2bbVjIuqmUpMFiQoDAebHHA",
//   friends: [
//     "63aa9oRUX0L2Q0kO3JCjcQH4GGnP",
//     "GwPShKadFHEV2W39hMgSGlxzVgzr"
//   ],
//   likes: [
//     "4e0b164f-8895-4a8c-8ea0-775cef8750f2",
//     "bfacbf58-aafd-4d7a-a293-571d2133121c",
//     "5698b634-ac71-45b0-aeef-5bdbdfa89eba",
//   ],
//   bio: "",
//   interests: [],
// });
// const isLoading = false;
// const user = getUserByUserId("0bvvh2bbVjIuqmUpMFiQoDAebHHA").then(user => {
//   if (user !== undefined) {
//     setCurrentUser(user);
//   }
// })


// beforeEach(() => {
//   const location = {
//     pathname: "/feed",
//     search: "",
//     hash: "",
//     state: {
//       uid: '1',
//       pid: '1'
//     },
//     key: "r9qntrej",
//   }
//   act(() => {
//     render(
//       <MemoryRouter initialEntries={['/user/1/profile/1']}>
//         <Routes location={location}>
//           <Route path="/feed" element={<Feed />} />
//           <Route path="/user/:uid/profile" element={<HootUser />} />
//           <Route path="/user/:uid/profile/:pid" element={<UserPost />} />
//         </Routes>
//       </MemoryRouter>
//     );
//   })
// });
// afterEach(() => cleanup());

// describe('Feed Page Functionality', () => {
//   it('Like button increases count when clicked', () => {
//     // get the like buttons
//     const likeButton = screen.getAllByRole('button', { name: 'like' });
//     const currLike = parseInt(likeButton[0].textContent!);
//     fireEvent.click(likeButton[0]);
//     // userEvent.click(likeButton[0]);
//     const newLike = parseInt(likeButton[0].textContent!);
//     expect(newLike === (currLike + 1));
//   });
//
//   it('Clicking on comment boxes lead to correct page', () => {
//
//     const commentBox = screen.getAllByRole('button', { name: 'comment' });
//
//     //expect commentBox to exist, then click
//     expect(commentBox[0]).toBeInTheDocument();
//     expect(commentBox[0]).not.toBeDisabled();
//     fireEvent.click(commentBox[0]);
//
//     const username = screen.getAllByRole('username');
//     //Test comments are on screen
//     expect(username[0]).toBeInTheDocument();
//     expect(username[0]).toHaveTextContent('Angel Egotrip')
//   });
// });
