import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ExampleUserLink() {
    return (
        <div>
            <h1>List of Users</h1>

            <Outlet />
        </div>
    );
}