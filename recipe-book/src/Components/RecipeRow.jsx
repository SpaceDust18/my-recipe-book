
//will have structure of front recipe card, fetch 

export default function RecipeRow({ setSelectedRecipeId, recipe, handleFavorite }) {
    const handleMoreInfo = () => {
        setSelectedRecipeId(recipe.idMeal)
    }
    return (
        <div className="recipe-card">
            <div
                onClick={() => handleMoreInfo(recipe.idMeal)}>
            </div>
            <div className="recipe-details">

                <img
                    src={recipe.strMealThumb || "/public/AdobeStock_581847170.png"}
                    onError={(e) => e.target.src = "/public/AdobeStock_581847170.png"}
                    alt={recipe.meal}
                />
                <br />
                <strong>Meal:</strong><p>{recipe.strMeal}</p>
                <strong>Category:</strong><p>{recipe.strCategory}</p>
                <strong>Cuisine Type:</strong><p>{recipe.strArea}</p>
                </div>
                    <button onClick={(e) => {
                        e.stopPropagation()
                        handleFavorite(recipe)
                    }}>
                        Add to Favorites
                    </button>
                    <button onClick={handleMoreInfo => {
                        e.stopPropagation()
                        {handleMoreInfo(recipe.idMeal)};
                    }}>
                        Ingredients and More...
                    </button>
                </div>
    )
}