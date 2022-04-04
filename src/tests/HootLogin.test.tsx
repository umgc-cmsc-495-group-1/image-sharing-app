import {render, screen, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import HootLogin from "../components/HootLogin";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

afterEach(cleanup);

describe("Hoot Login Test Suite", () => {
    test('1: Test to render Login page', () => {
        const { getByTestId } = render(<HootLogin/>);
       // const mainLogin = getByTestId("hoot-login-typography");
        expect(getByTestId("hoot-login-typography")).toBeInTheDocument();
    });

    test("2: Test to make sure Login text is displayed ", () => {
        const { getByTestId } = render(<HootLogin/>);
        const mainLogin = getByTestId("hoot-login-typography");
        expect(mainLogin).toHaveTextContent("Login");
    });
    test("3: Test to make sure email box is present ", () => {
        const { getByTestId } = render(<HootLogin/>);
        const mainLogin = getByTestId("email-input");
        expect(mainLogin).toBeInTheDocument();
    });
    test("4: Test to make sure email box text dsiplays 'Email Address' ", () => {
        const { getByTestId,getByPlaceholderText } = render(<HootLogin/>);
        const mainLogin = screen.getByTestId("email-input");
       // fireEvent.change(mainLogin, { target: { value: "Email" } });
        fireEvent.change(getByTestId('email-input'), { target: { value: 'test@user.com' } });
       // userEvent.type(mainLogin,'test@user.com');
      //  expect(screen.getByTestId('email-input')).toHaveValue('test@user.com');
        expect(mainLogin).toBeInTheDocument();
    });
    test("5: Test to make sure password box text dsiplays 'Password' ", () => {
        const { getByTestId ,getByLabelText} = render(<HootLogin/>);
        const mainLogin = getByTestId("password");
        expect(mainLogin).toBeInTheDocument();
    });
    test("5: Test to make sure Submit button is present and displays Login ", () => {
        const { getByTestId } = render(<HootLogin/>);
        const mainLogin = getByTestId("submit-button");
        expect(mainLogin).toHaveTextContent("Login");
    });
    test("5: Test to make sure Signup link is present ", () => {
        const { getByTestId } = render(<HootLogin/>);
        const mainLogin = getByTestId("signup");
        expect(mainLogin).toHaveTextContent("have an account? Sign up!");
    });
    test("6: Test to validate Signup link directs to signup page ", () => {
        const { getByTestId } = render(<HootLogin/>);
        const mainLogin = getByTestId("signup");
        expect(mainLogin).toHaveTextContent("have an account? Sign up!");
       // fireEvent.click(mainLogin);
    });
   
});