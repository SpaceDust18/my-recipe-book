import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn({ setToken, setAuthUser, handleBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    try {
      console.log("Attempting login with:", username, password);

      const response = await fetch(
        "https://fsa-recipe.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
setAuthUser(data.user)

        console.log("Stored authToken:", data.token);
        console.log("Stored user:", JSON.stringify(data.user));

        setToken(data.token);
        setAuthUser(data.user);
        navigate("/");
      } else {
        console.error("Login failed:", data.error || "Invalid Credentials");
        alert("Login failed: " + (data.error || "Invalid credentials, have you registered?"));
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password (8+ characters)"
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
}
