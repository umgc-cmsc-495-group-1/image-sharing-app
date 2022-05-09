import {
  MemoryRouter,
  Routes,
  Route
} from 'react-router-dom';
import { fireEvent,render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import {LoggedIn } from "../components/Navigation/LoggedIn";
import {Friends} from "../components/Friends/index";


const location = {
  pathname: "/user/max@test.com/friends",
  search: "",
  hash: "",
  state: {
    uid: 'max@test.com',
    pid: '1'
  },
  key: "ac3df4",
}
 

function renderMenuWithMemoryRouter() {
  return render(
    <MemoryRouter initialEntries={['/user/:uid/friends']}>
    <Routes location={location}>
      
      <Route path="/user/:uid/friends" element={<LoggedIn email={'max@test.com'} />} />
      <Route path="/user/max@test.com/friends" element={<Friends />} />
    </Routes>
  </MemoryRouter>
  );
}


/** 
* @description - Friends Test   
*  Module: LoggedIn
*  Roles: Protected Routes
*  Tests: 
   1. Test to validate Friends page renders
   2. Test to Add a friend 
*/
describe("Module: Friends Route Test", () => {
  afterEach(() => cleanup())
  it('1.Test to validate Friends page renders.', () => {
    act(() => {
      renderMenuWithMemoryRouter();
    })

   const navMenuButton = screen.getByRole ('friends');
   expect(navMenuButton).toBeInTheDocument();
  });
  it('2. Test to Add a friend  ', async () => {
    
  });
}); 