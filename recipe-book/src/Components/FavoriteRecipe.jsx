import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

export default function FavoriteRecipe({ token, handleMoreInfo }) {
  const [favorites, setFavorites] = useState([]);
  const [backendFavorites, setBackendFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Fetches favorites from the backend
        const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Backend favorites:", data);

        // Set backend favorites
        setBackendFavorites(data.data || []);

        // Load favorites from localStorage
        const stored = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

        // Combine both local and backend favorites
        const combined = [...stored, ...data.data.map(fav => ({
          idMeal: fav.mealId,
          strMeal: fav.name,
          strMealThumb: fav.imageUrl,
          favoriteId: fav.id
        }))];

        // Deduplicate by idMeal
        const deduplicated = Array.from(
          new Map(combined.map(item => [item.idMeal, item])).values()
        );

        setFavorites(deduplicated);
      } catch (err) {
        console.error("Failed to load backend favorites", err);
      }
    };

    loadFavorites();
  }, [token]);

  const handleAddToFavoritesAPI = async (recipe) => {
    try {
      // Check if recipe already exists in the backend favorites
      if (backendFavorites.some(fav => fav.idMeal === recipe.idMeal)) {
        alert(`${recipe.strMeal} is already in your favorites.`);
        return;
      }

      // Adding to backend favorites
      const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mealId: recipe.idMeal,
          name: recipe.strMeal,
          imageUrl: recipe.strMealThumb,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`${recipe.strMeal} was successfully synced to your account!`);

        // Update backend favorites state
        setBackendFavorites(prev => [...prev, {
          idMeal: recipe.idMeal,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb,
          favoriteId: data.id,
        }]);

        // Add recipe to local storage if not already there
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
        if (!storedFavorites.some(fav => fav.idMeal === recipe.idMeal)) {
          const updatedFavorites = [...storedFavorites, recipe];
          localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
        }

        // Update local state favorites
        setFavorites(prevFavorites => {
          // Avoid duplicates in the local state as well
          if (prevFavorites.some(fav => fav.idMeal === recipe.idMeal)) {
            return prevFavorites;
          }
          return [...prevFavorites, recipe];
        });
      } else {
        alert(`Failed to add ${recipe.strMeal}: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("An error occurred while syncing favorites.");
    }
  };

  const handleRemoveFromFavoritesAPI = async (favoriteId) => {
    try {
      const response = await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${favoriteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Recipe removed from your account!");
      } else {
        const data = await response.json();
        alert(`Failed to remove: ${data.error}`);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert("An error occurred while removing from favorites.");
    }
  };

  // Handle local removal
  const handleRemoveFavorite = (idMeal) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.idMeal !== idMeal);
    setFavorites(updatedFavorites);

    // Optionally update localStorage if you're keeping it in sync
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return <p>No favorite recipes found.</p>;
  }

  return (
    <div>
      <h2>Your Favorite Recipes</h2>
      {favorites.map((recipe) => (
        <div key={recipe.favoriteId || recipe.idMeal} style={{ marginBottom: "20px" }}>
          <RecipeCard recipe={recipe} />
          {/* Add buttons only if the recipe is not in the backend favorites */}
          {!backendFavorites.some(fav => fav.idMeal === recipe.idMeal) && (
            <button onClick={() => handleAddToFavoritesAPI(recipe)}>
              Save to My Account
            </button>
          )}
          {/* Remove from favorites button */}
          <button
            onClick={() => {
              handleRemoveFavorite(recipe.idMeal); // Remove from local favorites
              if (recipe.favoriteId) {
                handleRemoveFromFavoritesAPI(recipe.favoriteId); // Remove from backend API
              }
            }}
          >
            Remove from Favorites
          </button>
          <div>
            <button onClick={() => handleMoreInfo(recipe.idMeal)}>
              More Info
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
