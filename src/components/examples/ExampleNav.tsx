import React from 'react'
import { Link, Outlet } from 'react-router-dom'

/**
 * This is just and example to show how components can work together
 */
export default function ExampleNav() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <br/>
                <Link to="/about">About</Link>
                <br/>
                <Link to="/users">Users</Link>
            </nav>
            <hr />

            <Outlet />
        </div>
    );
}