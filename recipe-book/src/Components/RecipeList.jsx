import RecipeRow from "./RecipeRow.jsx"
import React, { useState } from "react"
import { useEffect } from "react"



export default function RecipeList({ setSelectedRecipeId, recipes, setRecipes }) {
    function handleFavorite(recipe) {
        console.log("Adding to Favorites:", recipe.strMeal)
    }
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
function handleFavorite(recipe) {
    console.log("Add to Favorites:", recipe);
}
    function handleMoreInfo(id) {
        setSelectedRecipeId(id);
    }
    return (
        <>
            <div className="recipe-list">
                {recipes && recipes.map((recipe) => (
                    <RecipeRow key={recipe.idMeal} recipe={recipe} setSelectedRecipeId={setSelectedRecipeId} handleFavorite={handleFavorite} handleMoreInfo={handleMoreInfo}/>
                )
                )}

            </div>
        </>
    )
}
