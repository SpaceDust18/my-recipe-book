import { useState } from 'react'
import './App.css'
import LogIn from './Components/LogIn.jsx'
import Auth from './Components/Auth.jsx'
import RecipeList from './Components/RecipeList.jsx'
import SelectedRecipe from './Components/SelectedRecipe.jsx'
import FavoriteRecipe from './Components/FavoriteRecipe.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'

export default function App() {
  const [token, setToken] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [selectedRecipeId, setSelectedRecipeId] = useState(null)
  const [favRecipe, setFavRecipe] = useState(null)
  const [view, setView] = useState("recipes")

  //general settings with functions to pass to several components. Probably Routes
  return (
    <>

      <Auth token={token} />

      <div id="main-section">
        <Routes>
          <Route path="/" element={<Navigate to="/RecipeList" />} />
          <Route path="/RecipeList" element={<RecipeList recipes={recipes} setRecipes={setRecipes} setSelectedRecipeId={setSelectedRecipeId}/>} />
          <Route path="/SelectedRecipe/:id" element={<SelectedRecipe selectedRecipeId={selectedRecipeId} setView={setView} setSelectedRecipeId={setSelectedRecipeId}/>} />
          <Route path="/FavoriteRecipe" element={<FavoriteRecipe />} />
        </Routes>
      </div>

    </>
  )
}

