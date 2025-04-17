
//will have structure of front recipe card, fetch 

export default function RecipeRow({ handleMoreInfo, recipe, handleFavorite }) {

    return (
        <div className="recipe-card">
            <div onClick={handleMoreInfo}> 
                <img
                    src={recipe.strMealThumb || "AdobeStock_581847170.png"}
                    onError={(e) => (e.target.src = "AdobeStock_581847170.png")}
                    alt={recipe.strMeal}
                />
            </div>

            <div className="recipe-details">
                <strong>Meal:</strong>
                <p>{recipe.strMeal}</p>
                <strong>Category:</strong>
                <p>{recipe.strCategory}</p>
                <strong>Cuisine Type:</strong>
                <p>{recipe.strArea}</p>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(recipe);
                }}
            >
                Add to Favorites
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    console.log("button clicked");
                    handleMoreInfo(recipe.idMeal); 
                }}
            >
                Ingredients and More...
            </button>
        </div>
    );
}
