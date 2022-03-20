import React from "react";
import {Link} from "react-router-dom";

export default function UserIndex(props) {
    return (
        <div>
            {props.users.map((user) => (
                <li key={`${user.id}-${user.first}-${user.last}`}>
                    <Link
                        to={`/users/${user.first.toLowerCase()}-${user.last.toLowerCase()}`}
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
