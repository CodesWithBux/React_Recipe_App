// -----------------------------------------------------------------------------
// FavoritesPage — your saved recipes, grouped into compartments by meal type
// (breakfast · lunch · dinner · dessert · snack), exactly like the drawer idea
// we planned. Reuses RecipeCard so favourites behave the same as anywhere else.
// -----------------------------------------------------------------------------
import PropTypes from 'prop-types';
import RecipeCard from '../components/Recipe/RecipeCard.jsx';
import { capitalise } from '../utils/helpers.js';
import recipeStyles from '../components/Recipe/Recipe.module.css';
import styles from './pages.module.css';

// The order compartments appear in.
const COMPARTMENTS = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack'];

function FavoritesPage({ favorites, onFavoriteToggle, onAddToPlan }) {
  // EMPTY STATE — conditional render of an entire section.
  if (favorites.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHead}>
          <h1>Your favourites</h1>
        </div>
        <div className={styles.emptyState}>
          <p>♡</p>
          <p>No favourites yet. Tap the heart on any recipe to save it here.</p>
        </div>
      </div>
    );
  }

  // Group the favourites into their meal-type compartments (transformation).
  const grouped = COMPARTMENTS.map((type) => ({
    type,
    items: favorites.filter((recipe) => recipe.category === type),
  })).filter((group) => group.items.length > 0);

  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <h1>Your favourites</h1>
        <p className={styles.pageSub}>
          {favorites.length} saved, sorted into meal compartments.
        </p>
      </div>

      {/* map — one compartment per meal type that has saved recipes */}
      {grouped.map((group) => (
        <section key={group.type} className={styles.compartment}>
          <div className={styles.compartmentHead}>
            <h3>{capitalise(group.type)}</h3>
            <span className={styles.pill}>{group.items.length} saved</span>
          </div>
          <div className={recipeStyles.grid}>
            {/* map — cards inside the compartment (RecipeCard reused here) */}
            {group.items.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite
                onFavoriteToggle={onFavoriteToggle}
                onAddToPlan={onAddToPlan}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func.isRequired,
};

export default FavoritesPage;
