import { useNavigate } from 'react-router-dom';

export default function Header({ token, authUser, setToken, setAuthUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("authToken");
    setToken("");
    setAuthUser(null);
    navigate("/LogIn");
  }

  return (
    <div className="header">
      {token ? (
        <>
          <button onClick={() => navigate("/FavoriteRecipe")}>Favorites</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/LogIn")}>Log In</button>
          <button onClick={() => navigate("/Register")}>Register</button>
        </>
      )}
      <button onClick={() => navigate("/RecipeList")}>Home</button>
    </div>
  );
}
