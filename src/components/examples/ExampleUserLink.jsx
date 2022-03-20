import React from "react";
import UserIndex from "./ExampleUserIndex"
import {getUsers} from "../../__tests__/test_data";

export default function ExampleUserLink() {
    const users = getUsers();
    return (
        <div>
            <h1>List of Users</h1>
            <ul>
                <UserIndex
                    users={users}
                />
            </ul>
        </div>
    );
}
