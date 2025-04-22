import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

export default function FavoriteRecipe({ token, handleMoreInfo }) {
  const [favorites, setFavorites] = useState([]);
  const [backendFavorites, setBackendFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Fetch backend favorites
        const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Backend favorites:", data);

        const backendData = data.data || [];

        setBackendFavorites(backendData);

        // Load localStorage favorites
        const stored = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

        // Convert backend format
        const backendConverted = backendData.map(fav => ({
          idMeal: fav.mealId,
          strMeal: fav.name,
          strMealThumb: fav.imageUrl,
          favoriteId: fav.id
        }));

        //Merge without duplicates
        const merged = [...backendConverted];
        stored.forEach(recipe => {
          if (!merged.some(r => r.idMeal === recipe.idMeal)) {
            merged.push(recipe);
          }
        });

        setFavorites(merged);
      } catch (err) {
        console.error("Failed to load favorites", err);
      }
    };
    loadFavorites();
  }, [token]);

  const handleAddToFavoritesAPI = async (recipe) => {
    try {
      if (backendFavorites.some(fav => fav.mealId === recipe.idMeal)) {
        alert(`${recipe.strMeal} is already in your favorites.`);
        return;
      }

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

        const newBackendFavorite = {
          idMeal: recipe.idMeal,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb,
          favoriteId: data.id,
        };

        setBackendFavorites(prev => [...prev, { ...data, mealId: recipe.idMeal }]);

        const storedFavorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
        if (!storedFavorites.some(fav => fav.idMeal === recipe.idMeal)) {
          const updatedFavorites = [...storedFavorites, recipe];
          localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
        }

        setFavorites(prev => {
          if (!prev.some(r => r.idMeal === recipe.idMeal)) {
            return [...prev, newBackendFavorite];
          }
          return prev;
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

  const handleRemoveFavorite = (idMeal) => {
    const updatedFavorites = favorites.filter(recipe => recipe.idMeal !== idMeal);
    setFavorites(updatedFavorites);

    const stored = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
    const updatedLocal = stored.filter(recipe => recipe.idMeal !== idMeal);
    localStorage.setItem("favoriteRecipes", JSON.stringify(updatedLocal));
  };

  if (favorites.length === 0) {
    return <p>No favorite recipes found.</p>;
  }

  return (
    <div>
      <h2>Your Favorite Recipes</h2>
      {favorites
        .filter(recipe => recipe && recipe.idMeal) //filters out undefined/broken entries
        .map((recipe) => (
          <div key={recipe.favoriteId || recipe.idMeal} style={{ marginBottom: "20px" }}>
            <RecipeCard recipe={recipe} />

            <div>
              {!backendFavorites.some(fav => fav.mealId === recipe.idMeal) && (
                <button onClick={() => handleAddToFavoritesAPI(recipe)}>
                  Save to My Account
                </button>
              )}
            </div>

            <button
              onClick={() => {
                handleRemoveFavorite(recipe.idMeal);
                if (recipe.favoriteId) {
                  handleRemoveFromFavoritesAPI(recipe.favoriteId);
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
