import { useState } from 'react'
// fetch and POST
export default function LogIn({ setToken }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('https://fsa-recipe.up.railway.app/api/users/login',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password })
                })
            const result = await response.json();
            if (response.ok && result.token) {
                setToken(result.token);
            } else {
                console.error("Login failed:", result.message || "Invalid Credentials");
                alert("Login failed:" + (result.message || "Invalid Credentials"));
            }
        } catch (error) {
            console.error('Login Error:', error)
        }
    }

<LogIn setToken={setToken} />
return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button type="submit">Log In</button>
    </form>
);
}