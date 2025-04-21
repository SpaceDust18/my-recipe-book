import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeRow({ recipe, handleFavorite, handleMoreInfo }) {
    if (!recipe) return null;
    return (
        <div className="recipe-row">
           
           <RecipeCard recipe={recipe} />
            <strong>Cuisine Type:</strong><p>{recipe.strArea}</p>
            <div>
                <button onClick={handleMoreInfo}>More Info</button>
                <button onClick={handleFavorite}>❤️ Favorite</button>
            </div>
        </div>
    );
}
