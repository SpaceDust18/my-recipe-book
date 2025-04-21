import React from "react";

export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-row">
      <h3>{recipe.strMeal}</h3>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: "150px" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "./AdobeStock_581847170.png";
        }}
      />
    </div>
  );
}