import { useEffect } from 'react';

export default function Auth({ token, setToken, setAuthUser }) {
    useEffect(() => {
        async function handleCheck() {
            try {
                const response = await fetch("https://fsa-recipe.up.railway.app/api/auth/me", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` 
                    }
                });

                const data = await response.json();

                if (data.error) {
                    console.error("Auth error:", data.error);
                    setToken(null); 
                    localStorage.removeItem("authToken"); 
                } else {
                    setAuthUser(data); 
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            }
        }

        if (token) {
            handleCheck(); 
        }
    }, [token, setToken, setAuthUser]);

    return null; 
}