React app where users can browse recipes from a third-party API and save their favorite meals. Users will register or log in, see a list of recipes, and favorite the ones they like. Users can also view and manage their saved favorites.

API Docs:

https://fsa-recipe.up.railway.appLinks to an external site.


Functionality: 

Routes via React Router
/recipe - Home page; this component shows at least 20 recipes
/recipe/:id  - this component displays details of an individual recipe including the steps to make it
/login and /register - React forms for the user to register, authenticate with a username and password
/favorites  - shows all of the favorited recipes for the authenticated user. This route only appears if you are authenticated  

Unauthenticated Users should be able to:
Observe a list of all the recipes
Sign up for an account with a username and password.
Sign in using the correct username/password combination.
Unauthenticated Users should not be able to:
Have the ability to add a favorite
See the favorites page

Authenticated Users should be able to:
Add a recipe to their favorites
Remove a recipe from their favorites
View their favorites page containing all recipes they have favorited
Authenticated Users should not be able to:
View the favorites of users other than themselves
Favorite /Unfavorite books for other users

All users should be able to:
View a list of all the recipes
View details of an individual recipe
