import React from "react";
import {useLocation} from "react-router-dom";

export default function ExampleUserPage() {
    const location = useLocation();
    return (
        <>
            <main>
                <h2>Welcome, {location.state.first} {location.state.last}!</h2>
                <p>You are the Number {location.state.id} user on the application!</p>
            </main>
        </>
    );
}
