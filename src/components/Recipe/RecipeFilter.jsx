// -----------------------------------------------------------------------------
// RecipeFilter — three dropdowns (category, cuisine, difficulty) plus a clear
// button. Every change is a child -> parent callback so the parent can filter.
// -----------------------------------------------------------------------------
import PropTypes from 'prop-types';
import Button from '../UI/Button.jsx';
import { capitalise } from '../../utils/helpers.js';
import styles from './Recipe.module.css';

function RecipeFilter({
  category,
  cuisine,
  difficulty,
  cuisines,
  onCategoryChange,
  onCuisineChange,
  onDifficultyChange,
  onClear,
}) {
  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'dessert', 'snack'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  return (
    <div className={styles.filter}>
      <div className={styles.field}>
        <label htmlFor="cat">Category</label>
        <select id="cat" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          {/* map — category options */}
          {categories.map((c) => (
            <option key={c} value={c}>{c === 'all' ? 'All categories' : capitalise(c)}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="cui">Cuisine</label>
        <select id="cui" value={cuisine} onChange={(e) => onCuisineChange(e.target.value)}>
          <option value="all">All cuisines</option>
          {/* map — cuisine options (list built by the parent) */}
          {cuisines.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="dif">Difficulty</label>
        <select id="dif" value={difficulty} onChange={(e) => onDifficultyChange(e.target.value)}>
          {difficulties.map((d) => (
            <option key={d} value={d}>{d === 'all' ? 'Any difficulty' : capitalise(d)}</option>
          ))}
        </select>
      </div>

      <div className={styles.field} style={{ justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClear}>Clear filters</Button>
      </div>
    </div>
  );
}

RecipeFilter.propTypes = {
  category: PropTypes.string.isRequired,
  cuisine: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  cuisines: PropTypes.array.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onCuisineChange: PropTypes.func.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default RecipeFilter;
