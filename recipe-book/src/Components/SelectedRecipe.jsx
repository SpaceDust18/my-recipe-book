import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import RecipeRow from "./RecipeRow";
import RecipeCard from "./RecipeCard";

export default function SelectedRecipe({ selectedRecipeId, setSelectedRecipeId, setView }) {
  const [recipe, setRecipe] = useState(null)
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
    setView("recipes");
  };
  return (
    <>
 {recipe && (
        <div className="selected-recipe">
          <RecipeCard recipe={recipe} />         
          <div className="recipe-details">
            <p>{recipe?.strMeal}</p>
            <p><strong>Cuisine Type:</strong>
              <br />
              {recipe?.strArea}</p>
            <strong>Ingredients:</strong>
            <ul>
              {recipe?.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p><strong>Instructions:</strong>
              <br />
              {recipe?.strInstructions}</p>
          </div>
        </div>
      )}
    </>
  )
}