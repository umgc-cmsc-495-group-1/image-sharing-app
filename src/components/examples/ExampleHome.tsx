import React from "react";
import LoginForm from "../michael/LoginForm";

/**
 * This is just and example to show how components can work together
 */
export default function ExampleHome() {
    return (
        <div>
            <main>
                <h2>Home</h2>
                <p>This is the Home page</p>
                <LoginForm />
            </main>
        </div>
    );
}