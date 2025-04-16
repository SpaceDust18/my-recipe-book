import React, { useState, useEffect } from "react"
//will show the selected recipe with directions, possible button to add to favorites here vs recipe list? await fetch using ID
export default function SelectedRecipe({ selectedRecipeId, setSelectedRecipeId, setView }) {
    const [recipe, setRecipe] = useState()

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await fetch(
                    'https://fsa-recipe.up.railway.app/api/recipes/:id')
                const data = await response.json();
                setRecipe(data);
                console.log(data)

            } catch (error) {
                console.error(error);
            }
        }
        fetchRecipes()
    }, [selectedRecipeId]);

    const handleBack = () => {
        setSelectedRecipeId(null);  // Resets selected recipes
        setView("astronauts");  // Switches view back to recipes list
    };
    return
    <div className="selected-recipe">
        {recipe.image?.image_url && (
            <img
                src={recipe.strMealThumb || "/public/AdobeStock_581847170.png"}
                onError={(e) => e.target.src = "/public/AdobeStock_581847170.png"}
                alt={recipe.meal}
            />
        )}
        <div className="recipe-details">

            <p><strong>Meal:</strong>{recipe.strMeal}</p>
            <p><strong>Cuisine Type:</strong> {recipe.strArea}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.strInstructions}</p>
            <p><strong>Cook along with YouTube:</strong> {recipe.strYoutube}</p>
            <div className="back-button">
                <button onClick={handleBack}>Back to Astronauts</button>
            </div>

        </div>
    </div>
}
