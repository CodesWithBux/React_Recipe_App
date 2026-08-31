// -----------------------------------------------------------------------------
// RecipesPage — the results page. The search box now lives in the header, so
// this page reads the shared `searchTerm` and matches it against the recipe
// NAME, its INGREDIENTS, and its CUISINE (type "pasta" or "feta" and it finds
// the dish). It still owns the category/cuisine/difficulty filters and shows
// loading + empty states.
// -----------------------------------------------------------------------------
import { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeFilter from '../components/Recipe/RecipeFilter.jsx';
import RecipeList from '../components/Recipe/RecipeList.jsx';
import Loading from '../components/UI/Loading.jsx';
import styles from './pages.module.css';

function RecipesPage({
  recipes,
  favorites = [],
  isLoading = false,
  searchTerm,
  onSearchChange,
  onFavoriteToggle,
  onAddToPlan,
}) {
  // Filter state (the search itself is lifted to the header/App).
  const [category, setCategory] = useState('all');
  const [cuisine, setCuisine] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  // Build the unique cuisine list from the data (transformation before render).
  const cuisines = [...new Set(recipes.map((r) => r.cuisine))].sort();

  // Match the query against name, ingredients and cuisine.
  const query = searchTerm.trim().toLowerCase();
  const matchesQuery = (recipe) => {
    if (query === '') return true;
    const inName = recipe.title.toLowerCase().includes(query);
    const inCuisine = recipe.cuisine.toLowerCase().includes(query);
    const inIngredients = recipe.ingredients.some((i) => i.toLowerCase().includes(query));
    return inName || inCuisine || inIngredients;
  };

  // Apply search + every active filter to produce the list we render.
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = category === 'all' || recipe.category === category;
    const matchesCuisine = cuisine === 'all' || recipe.cuisine === cuisine;
    const matchesDifficulty = difficulty === 'all' || recipe.difficulty === difficulty;
    return matchesQuery(recipe) && matchesCategory && matchesCuisine && matchesDifficulty;
  });

  // Reset every filter AND the header search.
  const handleClearFilters = () => {
    setCategory('all');
    setCuisine('all');
    setDifficulty('all');
    onSearchChange('');
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <h1>All recipes</h1>
        <p className={styles.pageSub}>
          {/* Ternary: reflect the active search, else a plain count */}
          {query
            ? `Results for “${searchTerm}” — ${filteredRecipes.length} found.`
            : `Showing ${filteredRecipes.length} of ${recipes.length} recipes.`}
        </p>
      </div>

      <RecipeFilter
        category={category}
        cuisine={cuisine}
        difficulty={difficulty}
        cuisines={cuisines}
        onCategoryChange={setCategory}
        onCuisineChange={setCuisine}
        onDifficultyChange={setDifficulty}
        onClear={handleClearFilters}
      />

      {/* Ternary: loading vs the list (which handles its own empty state) */}
      {isLoading ? (
        <Loading message="Loading recipes…" />
      ) : (
        <RecipeList
          recipes={filteredRecipes}
          favorites={favorites}
          onFavoriteToggle={onFavoriteToggle}
          onAddToPlan={onAddToPlan}
        />
      )}
    </div>
  );
}

RecipesPage.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array,
  isLoading: PropTypes.bool,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func.isRequired,
};

export default RecipesPage;
