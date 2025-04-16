import { useState } from 'react'
import './App.css'
import LogIn from './Components/LogIn.jsx'
import Auth from './Components/Auth.jsx'
import RecipeList from './Components/RecipeList.jsx'
import RecipeRow from './Components/RecipeRow.jsx'
import SelectedRecipe from './Components/SelectedRecipe.jsx'
import FavoriteRecipe from './Components/FavoriteRecipe.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'

export default function App() {
  const [token, setToken] = useState()
  const [ recipes, setRecipes ] = useState([])
  const [ favRecipe, setFavRecipe ] = useState(null)
  //general settings with functions to pass to several components. Probably Routes
  return (
    <>
      <LogIn setToken={setToken} />
      <Auth token={token} />
      
     
      
      <div id="main-section">
        <Routes>
          <Route path="/" element={<Navigate to="/RecipeList" />} />
          <Route path="/RecipeList" element={<RecipeList />} />
          <Route path="/SelectedRecipe" element={<SelectedRecipe />} />
          <Route path="/FavoriteRecipe" element={<FavoriteRecipe />} />
        </Routes>
      </div>

    </>
  )
}

