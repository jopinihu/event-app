import { ChangeEvent, useState } from 'react'
import { User } from './Login';
// import { Link } from 'react-router-dom';

export const initialState: User = {
    name: "",
    email: "",
    username: "",
    password: ""
}
const RegisterNewUser = () => {

    const [newUser, setNewUser] = useState<User>(initialState);
    const [userData, setUserData] = useState<User | null>(null);
    const { name, email, username, password } = newUser
    const registerUser = async () => {

        try {
            const response = await fetch("/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                alert('User registered successfully.');
                setUserData(newUser);
                setNewUser(initialState)

            } else if (response.status === 401) {
                setNewUser(initialState)
                alert("Username already exists.");
            } else {
                setNewUser(initialState)
                throw new Error("Something went wrong!");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUser(() => ({
            ...newUser, [name]: value
        }))
    };

    return (
        <div >
            <div className="user_register">
                <label>
                    Name
                    <br />
                    <input
                        type="text"
                        placeholder="your name"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <label>
                    Email
                    <br />
                    <input
                        type="email"
                        placeholder="your email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <label>
                    Username
                    <br />
                    <input
                        type="text"
                        placeholder="enter a username"
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                <label>
                    Password
                    <br />
                    <input
                        type="password"
                        placeholder="enter a password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </label>

                <br />
                <br />

                <button onClick={registerUser}>Register</button>
            </div>
            <div>
                {userData && (
                    <div>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Username: {userData.username}</p>
                        <p>Password: {userData.password}</p>
                    </div>
                )}
            </div>

        </div>
    )
}


export default RegisterNewUser
