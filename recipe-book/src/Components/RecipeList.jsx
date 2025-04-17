import RecipeRow from "./RecipeRow.jsx"
import React, { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom" 

export default function RecipeList({ setSelectedRecipeId, recipes, setRecipes }) {
    const navigate = useNavigate();
    function handleFavorite(recipe) {
        console.log("Adding to Favorites:", recipe.strMeal);
    }

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await fetch("https://fsa-recipe.up.railway.app/api/recipes");
                const data = await response.json();
                setRecipes(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipes();
    }, []);

    function handleMoreInfo(idMeal) {
        setSelectedRecipeId(idMeal);
        navigate(`/SelectedRecipe/${idMeal}`)
    }

    return (
        <>

            <div className="recipe-list">
                {recipes &&
                    recipes.map((recipe) => (
                        <RecipeRow
                        key={recipe.idMeal}
                        recipe={recipe}
                        handleFavorite={handleFavorite}
                        handleMoreInfo={() => handleMoreInfo(recipe.idMeal)} 
                      />
                    ))}
            </div>
        </>
    );
}