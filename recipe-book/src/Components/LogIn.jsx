import { useState } from 'react'
// fetch and POST
export default function LogIn({setToken}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            console.log("hi")
            const response = await fetch('https://fsa-recipe.up.railway.app/api/auth/login',
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"},
                        body: JSON.stringify({
                            username: username, 
                            password: password
                        })            
                })
            const result = await response.json(
                setToken(result.token)
            )
        } catch (error) {
            
        }
        return (
            <div>
                <h1>hi</h1>
            </div>
        )
    }
}