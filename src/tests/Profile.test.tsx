import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { fireEvent,render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import {Profile} from "../components/Profile/index";

const location = {
  pathname: "/user/max%40test-com",
  search: "",
  hash: "",
  state: {
    uid: '1',
    pid: '1'
  },
  key: "ac3df4",
}
 

function renderMenuWithMemoryRouter() {
  return render(
    <MemoryRouter initialEntries={['/user/max@%40test-com']}>
    <Routes location={location}>
      
      <Route path="/user/:email" element={<Profile />} />
      
    </Routes>
  </MemoryRouter>
  );
}


/** 
* @description - Profile Test   
*  Module: Profile
*  Roles: Protected Routes
*  Tests: 
   1. Test to validate Profile page renders
*/
describe("Module: Profile Page Test", () => {
  afterEach(() => cleanup())
  it('1.Test to validate Profile page renders', async () => {
    act(() => {
      renderMenuWithMemoryRouter();
    })
     const profileEmail = screen.getByRole("length-friends");
     expect(profileEmail).toBeInTheDocument();
     expect(profileEmail).toHaveTextContent('0 Posts | 0 Friends');

  });

 
}); 