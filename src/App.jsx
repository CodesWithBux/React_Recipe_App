// -----------------------------------------------------------------------------
// App.jsx — the single source of truth for shared state (LIFTING STATE UP).
// Favourites and the weekly meal plan live here so that the Recipes, Favourites
// and Meal Planner pages (siblings) all read and update the SAME data. This is
// how sibling components communicate: through state held by their common parent.
// -----------------------------------------------------------------------------
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';

import Home from './pages/Home.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import RecipeDetail from './components/Recipe/RecipeDetail.jsx';
import MealPlannerPage from './pages/MealPlannerPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import NotFound from './pages/NotFound.jsx';

import { recipesData } from './data/recipesData.js';
import { createEmptyWeek, slotForCategory } from './utils/helpers.js';
import './App.css';

// The signed-in person. Their initials become the PM account badge in the navbar.
const ACCOUNT = { name: 'Phatsimo Maseng', initials: 'PM' };

function App() {
  // --- State variables (8+ across the app; several are complex arrays/objects) ---
  const [recipes, setRecipes] = useState([]);          // all recipes (array)
  const [favorites, setFavorites] = useState([]);      // favourited recipes (array)
  const [mealPlan, setMealPlan] = useState(createEmptyWeek()); // week (object)
  const [isLoading, setIsLoading] = useState(true);    // loading flag (boolean)
  const [notice, setNotice] = useState('');            // transient toast message
  const [searchTerm, setSearchTerm] = useState('');    // global header search query

  // --- useEffect #1: load recipes on mount, simulating a data fetch ---
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setRecipes(recipesData);
      setIsLoading(false);
    }, 500); // brief delay so the loading state is visible
    return () => clearTimeout(timer);
  }, []);

  // --- useEffect #2: hydrate favourites & plan from localStorage on mount ---
  useEffect(() => {
    const savedFavorites = localStorage.getItem('luminous_favorites');
    const savedPlan = localStorage.getItem('luminous_mealplan');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedPlan) setMealPlan(JSON.parse(savedPlan));
  }, []);

  // --- useEffect #3: persist favourites whenever they change (localStorage) ---
  useEffect(() => {
    localStorage.setItem('luminous_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // --- useEffect #4: persist the meal plan whenever it changes ---
  useEffect(() => {
    localStorage.setItem('luminous_mealplan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  // Auto-clear the toast a moment after it appears.
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(''), 2600);
    return () => clearTimeout(t);
  }, [notice]);

  // --- Callback: toggle a recipe in/out of favourites (child -> parent) ---
  const handleFavoriteToggle = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === recipe.id);
      // Updating an array immutably in both directions.
      return exists ? prev.filter((fav) => fav.id !== recipe.id) : [...prev, recipe];
    });
  };

  // --- Callback: add a recipe to a specific day. It lands in the slot that
  // matches its category (breakfast -> breakfast) and ONLY if that slot is open. ---
  const handleAddToPlan = (day, recipe) => {
    const slot = slotForCategory(recipe.category);
    if (mealPlan[day][slot]) {
      setNotice(`${day}'s ${slot} is already taken — remove it first.`);
      return false;
    }
    // Updating a nested object immutably.
    setMealPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: recipe },
    }));
    setNotice(`Added "${recipe.title}" to ${day} ${slot}.`);
    return true;
  };

  // --- Callback: remove whatever recipe sits in a given day + slot ---
  const handleRemoveFromPlan = (day, slot) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: null },
    }));
  };

  // --- Callback: empty the whole week ---
  const handleClearWeek = () => {
    setMealPlan(createEmptyWeek());
    setNotice('Cleared the week.');
  };

  // Derive the favourites count once, here, then pass it down (data transformation).
  const favoriteCount = favorites.length;

  return (
    <div className="app">
      {/* Navbar hosts the global search and receives a live favourites count */}
      <Navbar
        account={ACCOUNT}
        favoriteCount={favoriteCount}
        notice={notice}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="app__main">
        <Routes>
          {/* Home also hosts the cooking-tips audio guide */}
          <Route path="/" element={<Home recipes={recipes} isLoading={isLoading} />} />

          {/* Recipes list: filtering + favourites + add-to-plan all flow from here */}
          <Route
            path="/recipes"
            element={
              <RecipesPage
                recipes={recipes}
                favorites={favorites}
                isLoading={isLoading}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onFavoriteToggle={handleFavoriteToggle}
                onAddToPlan={handleAddToPlan}
              />
            }
          />

          {/* Dynamic route with a URL parameter (:id) */}
          <Route
            path="/recipes/:id"
            element={
              <RecipeDetail
                recipes={recipes}
                favorites={favorites}
                onFavoriteToggle={handleFavoriteToggle}
                onAddToPlan={handleAddToPlan}
              />
            }
          />

          <Route
            path="/meal-planner"
            element={
              <MealPlannerPage
                mealPlan={mealPlan}
                onRemoveFromPlan={handleRemoveFromPlan}
                onClearWeek={handleClearWeek}
              />
            }
          />

          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onFavoriteToggle={handleFavoriteToggle}
                onAddToPlan={handleAddToPlan}
              />
            }
          />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer account={ACCOUNT} />
    </div>
  );
}

export default App;
