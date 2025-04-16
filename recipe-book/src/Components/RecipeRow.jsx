
//will have structure of front recipe card, fetch 

export default function RecipeRow({ setSelectedRecipeId, recipe }) {
    return (
        <div className="recipe-card"
            onClick={() => {
                setSelectedRecipeId(recipe.id);
            }}
        >
            <div className="recipe-details">

                <img
                    src={recipe.strMealThumb || "/public/AdobeStock_581847170.png"}
                    onError={(e) => e.target.src = "/public/AdobeStock_581847170.png"}
                    alt={recipe.meal}
                />
                <strong>Meal:</strong><p>{recipe.strMeal}</p>
                <strong>Category:</strong><p>{recipe.strCategory}</p>
                <strong>Cuisine Type:</strong><p>{recipe.strArea}</p>

            </div>
        </div>
    )
}