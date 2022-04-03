import React from "react";

/**
 * This is just and example to show how components can work together
 */
export default function ExampleAbout() {
    return (
        <div data-testid="main-div">
            <main data-testid="main-container">
                <h2>About</h2>
                <p data-testid="paragraph">This is the about page</p>
            </main>
        </div>
    );
}