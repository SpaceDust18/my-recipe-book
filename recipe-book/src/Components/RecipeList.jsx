import RecipeRow from "./RecipeRow.jsx";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RecipeList({ setSelectedRecipeId, recipes, setRecipes, token, handleMoreInfo }) {
  const navigate = useNavigate();

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
  }, [setRecipes]);

  function handleFavorite(recipe) {
    if (!token) {
      alert("You must be logged in to add a recipe to your favorites.");
      return;
    }

    // Get current favorites from localStorage or initialize as empty array
    const existingFavorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

    // Check if the recipe is already in favorites
    const alreadyFavorited = existingFavorites.some((fav) => fav.idMeal === recipe.idMeal);

    if (!alreadyFavorited) {
      const updatedFavorites = [...existingFavorites, recipe];
      localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
      alert(`${recipe.strMeal} added to your favorites!`);
    } else {
      alert("This recipe is already in your favorites.");
    }

    navigate("/FavoriteRecipe");
  }

  return (
    <div className="recipe-list">
      {recipes?.map((recipe) =>
        recipe && recipe.strMeal ? (
          <RecipeRow
            key={recipe.idMeal}
            recipe={recipe}
            handleFavorite={() => handleFavorite(recipe)}
            handleMoreInfo={() => handleMoreInfo(recipe.idMeal)}
          />
        ) : null
      )}
    </div>
  );
}
