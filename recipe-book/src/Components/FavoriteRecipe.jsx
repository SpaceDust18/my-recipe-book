
//ability to add recipe
export default function FavoriteRecipe({ favRecipe, setFavRecipe, token }) {
    if (!token) {

    return (
        <div>
            {favRecipe && favRecipe.length > 0 ? (
                favRecipe.map((recipe) => (
                    <RecipeRow key={recipe.idMeal} recipe={recipe} />
                ))
               
            ) : (
                <p>No favorite recipes yet.</p>
            )}
        </div>
    )
}}