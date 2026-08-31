// -----------------------------------------------------------------------------
// RecipeCard — summary card for one recipe. Receives MULTIPLE props and passes
// custom handlers up to the parent (favourite toggle, add-to-plan). It nests
// three reusable components (Card > Badge/Button), giving 3+ levels of nesting:
// RecipesPage > RecipeList > RecipeCard > Card.
// -----------------------------------------------------------------------------
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../UI/Card.jsx';
import Badge from '../UI/Badge.jsx';
import { formatCookTime, capitalise, DAYS_OF_WEEK, slotForCategory } from '../../utils/helpers.js';
import styles from './Recipe.module.css';

// Colour lookup keeps difficulty badges consistent (data -> style).
const DIFFICULTY_COLOR = { easy: '#4e8367', medium: '#d98a1f', hard: '#b42318' };

function RecipeCard({ recipe, isFavorite = false, onFavoriteToggle, onAddToPlan }) {
  // onChange handler: add this recipe to the chosen day's matching slot.
  const handleDayPick = (e) => {
    const day = e.target.value;              // event object accessed
    if (!day) return;
    onAddToPlan(day, recipe);                // custom handler passed up
    e.target.value = '';                     // reset the select
  };

  return (
    // `glowing` is an EXPRESSION passed as a prop — favourited cards light up.
    <Card hoverable glowing={isFavorite} className={styles.card}>
      <div className={styles.thumb}>
        <img src={recipe.image} alt={recipe.title} loading="lazy" />
        <button
          className={styles.heart}
          onClick={() => onFavoriteToggle(recipe)}
          aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.badges} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {/* Badge colour passed as an expression prop */}
          <Badge label={capitalise(recipe.category)} color="#3a2a4d" />
          <Badge label={recipe.difficulty} color={DIFFICULTY_COLOR[recipe.difficulty]} />
        </div>

        <h3 className={styles.title}>{recipe.title}</h3>
        <p className={styles.desc}>{recipe.description}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>⏱ {formatCookTime(recipe.cookTime)}</span>
          <span className={styles.metaItem}>· {recipe.cuisine}</span>
          <span className={styles.metaItem}>· {recipe.servings} servings</span>
        </div>

        <div className={styles.actions}>
          <Link
            to={`/recipes/${recipe.id}`}
            className="btn-view"
            style={{ fontWeight: 600, color: 'var(--ember)' }}
          >
            View recipe →
          </Link>
          {/* Add-to-planner select: lands in the {slotForCategory} slot */}
          <select
            className={styles.daySelect}
            defaultValue=""
            onChange={handleDayPick}
            aria-label={`Add ${recipe.title} to a day`}
          >
            <option value="" disabled>
              + Add to {slotForCategory(recipe.category)}…
            </option>
            {/* map — day options */}
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>{capitalise(day)}</option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
}

// PropTypes validation (component #1 of 3+).
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    cookTime: PropTypes.number,
    category: PropTypes.string,
    difficulty: PropTypes.string,
    cuisine: PropTypes.string,
    servings: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func.isRequired,
};


export default RecipeCard;
