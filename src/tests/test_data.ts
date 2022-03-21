import { User } from "../components/examples/ExampleUserIndex";

const users = [
    {
        id: 1,
        first: "John",
        last: "Doe",
    },
    {
        id: 2,
        first: "Jane",
        last: "Doe",
    },
    {
        id: 3,
        first: "Adam",
        last: "Roberts",
    },
    {
        id: 4,
        first: "Samantha",
        last: "Smith",
    },
    {
        id: 5,
        first: "John",
        last: "Smith",
    },
    {
        id: 6,
        first: "Rebecca",
        last: "Roberts",
    }
]

export function getUsers() {
    return users;
}

export function getUserById(id: string | undefined): User {
    if (id === undefined) {
        throw new Error("Id cannot be undefined");
    }
    const parsedValue: number = parseInt(id);
    return users[parsedValue];
}
