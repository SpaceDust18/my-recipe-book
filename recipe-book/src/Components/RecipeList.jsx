import RecipeRow from "./RecipeRow.jsx"
import { useEffect, useState } from "react"



export default function RecipeList() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await fetch(
                    'https://fsa-recipe.up.railway.app/api/recipes')
                const data = await response.json();
                setRecipes(data);
                console.log(data)

            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipes()
    }, [])

    return (
        <>
            <div className="recipe-list">
                {recipes && recipes.map((recipe) => (
                    <RecipeRow key={recipe.idMeal} recipe={recipe} />
                )
                )}

            </div>
        </>
    )
}
