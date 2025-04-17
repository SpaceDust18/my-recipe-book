import { useEffect, useState } from 'react'
//fetch and GET
export default function Auth({ token }) {
    useEffect(() => {
        if (token) {
            handleCheck();
        }
    }, [token]);


    async function handleCheck() {
        try {
            const response = await fetch('https://fsa-recipe.up.railway.app/api/auth/register', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        const result = await response.json()
if (result.error) {
    setToken(null);
}
        }catch (error) {
console.error('Auth check failed:' , error);
    }
    }
    return null; 
}