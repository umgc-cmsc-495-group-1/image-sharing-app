import React from 'react';
import {Link} from 'react-router-dom';
import { getUsers } from '../../tests/test_data'

export interface User {
    id: number,
    first: string,
    last: string
}

export default function ExampleUserIndex() {
    const users = getUsers();
    return (
        <div>
            {users.map((user: User) => (
                <li key={`${user.id}-${user.first}-${user.last}`}>
                    <Link
                        to={`/users/${user.id - 1}`}
                        state={{
                            id: user.id,
                            first: user.first,
                            last: user.last
                        }}
                    >{user.first} {user.last}</Link>
                </li>
            ))}
        </div>
    );
}