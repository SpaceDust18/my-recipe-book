import { useState, useEffect } from "react";
import "./App.css";
import LogIn from "./Components/LogIn";
import Auth from "./Components/Auth";
import RecipeList from "./Components/RecipeList";
import SelectedRecipe from "./Components/SelectedRecipe";
import FavoriteRecipe from "./Components/FavoriteRecipe";
import NavBar from "./Components/NavBar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./Components/Register";
import RecipeRow from "./Components/RecipeRow";
import RecipeCard from "./Components/RecipeCard";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [authUser, setAuthUser] = useState(() => {
    const userData = localStorage.getItem("user");
    try {
      if (!userData || userData === "undefined") return null;
      return JSON.parse(userData);
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [view, setView] = useState("recipes");
  const [recipe, setRecipe] = useState(null);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setAuthUser(null);
  };

  const handleAddToFavorites = (recipe) => {
    console.log("Favoriting recipe:", recipe);
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log("Token from localStorage:", token);
    console.log("User from localStorage:", authUser);

    console.log("Token and user:", token, authUser);
    if (token && authUser) {
      console.log("user is already logged in", authUser);
    }
  }, [token, authUser]);

  useEffect(() => {
    // If we have a token but no user, we try to rehydrate from localStorage
    if (token && !authUser) {
      const userData = localStorage.getItem("user");
      if (userData === "undefined") {
        localStorage.removeItem("user")
      }
      try {
        const parsedUser = userData ? JSON.parse(userData) : null;
        if (parsedUser) {
          console.log("Rehydrating user from localStorage:", parsedUser);
          setAuthUser(parsedUser);
        }
      } catch (e) {
        console.error("Failed to rehydrate user from localStorage", e);
      }
    }
  }, [token, authUser]);

  useEffect(() => {
    if (selectedRecipeId) {
      const selectedRecipe = recipes.find((r) => r.idMeal === selectedRecipeId);
      setRecipe(selectedRecipe || null);
    }
  }, [selectedRecipeId, recipes]);

  function handleMoreInfo(idMeal) {
    setSelectedRecipeId(idMeal);
    navigate(`/SelectedRecipe/${idMeal}`);
  }

  return (
    <>
      <Auth token={token} setToken={setToken} setAuthUser={setAuthUser} />
      <NavBar
        token={token}
        setToken={setToken}
        authUser={authUser}
        setAuthUser={setAuthUser}
        handleLogOut={handleLogOut}
      />

      <RecipeRow token={token}
        handleMoreInfo={() => handleMoreInfo(recipe.idMeal)} />

      <div id="main-section">
        <Routes>
          <Route path="/" element={<Navigate to="/RecipeList" />} />
          <Route
            path="/Register"
            element={<Register setToken={setToken} setAuthUser={setAuthUser} />}
          />
          <Route
            path="/RecipeList"
            element={
              <RecipeList
                token={token}
                setToken={setToken}
                authUser={authUser}
                handleAddToFavorites={handleAddToFavorites}
                recipes={recipes}
                setRecipes={setRecipes}
                setSelectedRecipeId={setSelectedRecipeId}
                setRecipe={setRecipe}
                handleMoreInfo={handleMoreInfo}
              />
            }
          />
          <Route
            path="/SelectedRecipe/:id"
            element={
              <SelectedRecipe
                selectedRecipeId={selectedRecipeId}
                setView={setView}
                setSelectedRecipeId={setSelectedRecipeId}
                handleMoreInfo={handleMoreInfo}
              />
            }
          />
          <Route
            path="/LogIn"
            element={
              <LogIn
                setToken={setToken}
                setAuthUser={setAuthUser}
                handleBack={handleBack}
              />
            }
          />

          <Route
            path="/RecipeCard"
            element={
              <RecipeCard recipe={recipe}
              />
            }
          />

          <Route
            path="/FavoriteRecipe"
            element={
              token && authUser ? (
                <FavoriteRecipe token={token} recipe={recipe} handleMoreInfo={handleMoreInfo} setSelectedRecipeId={setSelectedRecipeId} />
              ) : (
                <Navigate to="/FavoriteRecipe" replace />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}
