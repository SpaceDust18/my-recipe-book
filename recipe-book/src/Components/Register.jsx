import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register({ setToken, setAuthUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const response = await fetch('https://fsa-recipe.up.railway.app/api/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.trim().toLowerCase(),
                    password
                })
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem('authToken', data.token);
                setToken(data.token);
                setAuthUser(data.user);
                alert("Registered successfully!");
                navigate('/'); // Go to home or login
            } else {
                alert("Registration failed: " + (data.message || "Unknown error"));
                console.error("Register error:", data);
            }

        } catch (err) {
            console.error("Error registering:", err);
            alert("Error during registration.");
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}