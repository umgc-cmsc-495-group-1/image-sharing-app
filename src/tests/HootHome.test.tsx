import {render, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import HootHome from "../components/HootHome";

afterEach(cleanup);

describe("Hoot Home Test Suite", () => {
    test('1: Test to render main home page', () => {
        const { getByTestId } = render(<HootHome/>);
        //const mainHome = screen.getByTestId("hoot-home-typography");
        expect(getByTestId("hoot-home-typography")).toBeInTheDocument();
    });

    test("2: Test to disply default text 'This is the homepage' ", () => {
        render(<HootHome/>);
        const mainHome = screen.getByTestId("hoot-home-typography");
        expect(mainHome).toHaveTextContent("This is the homepage");
    });

});