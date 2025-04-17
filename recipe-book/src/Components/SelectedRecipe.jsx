import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
//will show the selected recipe with directions, possible button to add to favorites here vs recipe list? await fetch using ID


export default function SelectedRecipe({ selectedRecipeId, setSelectedRecipeId, setView }) {
    const [recipe, setRecipe] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedRecipeId)
            return;
        async function fetchRecipes() {
            try {
                const response = await fetch(
                    `https://fsa-recipe.up.railway.app/api/recipes/${selectedRecipeId}`)
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
        navigate("/RecipeList")
    };
    return (
        <>
          <div className="selected-recipe">
            {recipe && (
              <img
                src={recipe.strMealThumb || "/public/AdobeStock_581847170.png"}
                onError={(e) => (e.target.src = "/public/AdobeStock_581847170.png")}
                alt={recipe.meal}
              />
            )}
            <div className="recipe-details">
              <p><strong>Meal:</strong> {recipe?.strMeal}</p>
              <p><strong>Cuisine Type:</strong> {recipe?.strArea}</p>
              <p><strong>Ingredients:</strong> {recipe?.ingredients?.join(", ")}</p>
              <p><strong>Instructions:</strong> {recipe?.strInstructions}</p>
              <div className="back-button">
                <button onClick={handleBack}>Back to Recipe Home</button>
              </div>
            </div>
          </div>
        </>
      ) }