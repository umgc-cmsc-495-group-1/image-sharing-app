import React from "react";
import {useParams} from "react-router-dom";
import { getUserById } from "../../tests/test_data";
import { User } from "./ExampleUserIndex";

export default function ExampleUserPage() {
    const { id } = useParams<"id">()
    const user: User = getUserById(id);
    return (
        <>
            <main>
                <h2>Welcome, {user.first} {user.last}!</h2>
                <p>You are the Number {user.id} user on the application!</p>
            </main>
        </>
    );
}