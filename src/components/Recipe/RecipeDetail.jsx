// -----------------------------------------------------------------------------
// RecipeDetail — the dynamic route (/recipes/:id). Reads the URL parameter,
// uses programmatic navigation, shows an error state when the id is unknown,
// renders ingredients + instructions, embeds the tutorial video, and lets you
// favourite the recipe or drop it into any day of the planner.
// -----------------------------------------------------------------------------
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../UI/Button.jsx';
import Badge from '../UI/Badge.jsx';
import VideoPlayer from '../Media/VideoPlayer.jsx';
import { formatCookTime, capitalise, DAYS_OF_WEEK, slotForCategory } from '../../utils/helpers.js';
import styles from './Recipe.module.css';

function RecipeDetail({ recipes, favorites = [], onFavoriteToggle, onAddToPlan }) {
  const { id } = useParams();            // route parameter
  const navigate = useNavigate();        // programmatic navigation
  const [day, setDay] = useState('monday');

  // Find the recipe whose id matches the URL (data transformation).
  const recipe = recipes.find((r) => r.id === parseInt(id, 10));

  // ERROR / not-found state.
  if (!recipe) {
    return (
      <div className={styles.detail}>
        <h1>Recipe not found</h1>
        <p>We couldn't find a recipe with that id.</p>
        <Button onClick={() => navigate('/recipes')}>Back to recipes</Button>
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === recipe.id);
  const totalTime = recipe.prepTime + recipe.cookTime; // function-in-JSX below

  return (
    <article className={styles.detail}>
      <div className={styles.back}>
        {/* Programmatic navigation back to the list */}
        <Button variant="secondary" onClick={() => navigate('/recipes')}>← Back to recipes</Button>
      </div>

      <div className={styles.hero}>
        <img className={styles.heroImg} src={recipe.image} alt={recipe.title} />

        <div className={styles.heroBody}>
          <div className={styles.badges}>
            <Badge label={capitalise(recipe.category)} color="#3a2a4d" />
            <Badge label={recipe.cuisine} color="#c2410c" />
            <Badge label={recipe.difficulty} color="#4e8367" />
          </div>

          <h1>{recipe.title}</h1>
          <p style={{ color: 'var(--muted)' }}>{recipe.description}</p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <b>{formatCookTime(recipe.cookTime)}</b>
              <span>Cook time</span>
            </div>
            <div className={styles.stat}>
              <b>{formatCookTime(totalTime)}</b>
              <span>Total time</span>
            </div>
            <div className={styles.stat}>
              <b>{recipe.servings}</b>
              <span>Servings</span>
            </div>
          </div>

          {/* Favourite toggle — label changes on the isFavorite ternary */}
          <div className={styles.planRow}>
            <Button variant={isFavorite ? 'secondary' : 'primary'} onClick={() => onFavoriteToggle(recipe)}>
              {isFavorite ? '♥ Saved to favourites' : '♡ Add to favourites'}
            </Button>
          </div>

          {/* Add-to-planner: pick a day; it lands in the matching slot if open */}
          <div className={styles.planRow}>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={styles.daySelect}
              aria-label="Choose a day"
            >
              {DAYS_OF_WEEK.map((d) => (
                <option key={d} value={d}>{capitalise(d)}</option>
              ))}
            </select>
            <Button onClick={() => onAddToPlan(day, recipe)}>
              Add to {slotForCategory(recipe.category)}
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.columns}>
        <section>
          <h3>Ingredients</h3>
          <ul className={styles.list}>
            {/* map — ingredients */}
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Instructions</h3>
          <ol className={styles.list}>
            {/* map — numbered steps */}
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>
      </div>

      {/* Cook along — the tutorial video sits below the recipe & instructions */}
      {recipe.videoUrl && (
        <section style={{ marginTop: 34 }}>
          <h3 style={{ marginBottom: 14 }}>Cook along</h3>
          <VideoPlayer videoUrl={recipe.videoUrl} title={`Cook along — ${recipe.title}`} />
        </section>
      )}
    </article>
  );
}

// PropTypes validation (component #2 of 3+).
RecipeDetail.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
  onAddToPlan: PropTypes.func.isRequired,
};


export default RecipeDetail;
