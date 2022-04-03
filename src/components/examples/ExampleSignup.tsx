import React from "react";
//import { useNavigate } from "react-router-dom";
import { signup } from "../../data/authFunctons";


/****************************************************
* fake form for testing user sign up with emulator *
*****************************************************/



function ExampleSignupPage(props: any) {
    //const useForm form react-hook-form?
   // const [isLoading, setLoading] = useState(false);
    //let navigate = useNavigate();
    console.log(props);

    const onSubmit = async (data: any) => {
        let newUser;
        //setLoading(true);
        console.log("loading");
        try {
            newUser = await signup(data);
            console.log(JSON.stringify(data));
            //reset();
        } catch (error) {
            console.log(error);
        }
        if (newUser) {
            //navigate(`/ExampleUserPage/${newUser.uid}`, { replace: true });
        } else {
            //setLoading(false);
        }
    };
    //const formClassName = `ui form ${isLoading ? 'loading' : ''}`;

    return (
        <>
            <main>
                <form
                    onSubmit={async (e: React.SyntheticEvent) => {
                        e.preventDefault();
                        const user = e.target as typeof e.target & {
                            first: { value: string };
                            last: { value: string };
                            username: { value: string };
                            email: { value: string };
                            password: { value: string };
                        };

                        const first = user.first.value;
                        const last = user.last.value;
                        const username = user.username.value;
                        const email = user.email.value; // typechecks!
                        const password = user.password.value; // typechecks!
                        const newUser = {
                            first: first[0].toUpperCase() + first.substring(1),
                            last: last[0].toUpperCase() + last.substring(1),
                            username: username,
                            email: email,
                            password: password
                        }
                        // etc...
                        try {
                            console.log(JSON.stringify(newUser));
                            await signup(newUser);
                        } catch (error) {
                            console.log(JSON.stringify(newUser));
                            console.log(error);
                            alert("signup failed");
                        } finally {

                            alert("signed up");
                        }
                    }}
                >

                    <input
                        type="text"
                        name="first"
                        placeholder="first name"

                    />

                    <input
                        type="text"
                        name="last"
                        placeholder="last name"
                    >
                    </input>

                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                    >
                    </input>

                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                    >
                    </input>

                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                    >
                    </input>

                    <button
                        type="submit"
                        onCanPlay={onSubmit}
                        value="sign up">
                        Sign Up
                    </button>

                </form>
            </main>
        </>
    );
}
export default ExampleSignupPage;