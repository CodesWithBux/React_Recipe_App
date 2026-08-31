// -----------------------------------------------------------------------------
// RecipeList — renders an array of RecipeCards. It transforms data before
// passing it down (works out isFavorite per card) and shows an empty state.
// -----------------------------------------------------------------------------
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard.jsx';
import styles from './Recipe.module.css';

function RecipeList({ recipes, favorites = [], onFavoriteToggle, onAddToPlan }) {
  // Empty state (conditional render with a ternary at the top level).
  if (recipes.length === 0) {
    return (
      <div className={styles.empty}>
        <p style={{ fontSize: '2rem', margin: 0 }}>🍽️</p>
        <p>No recipes match your search. Try clearing the filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {/* map — one card per recipe; isFavorite is derived here (transformation) */}
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.some((fav) => fav.id === recipe.id)}
          onFavoriteToggle={onFavoriteToggle}
          onAddToPlan={onAddToPlan}
        />
      ))}
    </div>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func.isRequired,
};


export default RecipeList;
