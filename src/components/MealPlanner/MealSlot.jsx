// -----------------------------------------------------------------------------
// MealSlot — one breakfast/lunch/dinner slot for a single day. This is the
// deepest component in the planner branch (MealPlannerPage > MealPlanner >
// DayCard > MealSlot = 4 levels of nesting). It either shows the planned recipe
// with a remove button, or an empty placeholder.
// -----------------------------------------------------------------------------
import PropTypes from 'prop-types';
import { capitalise } from '../../utils/helpers.js';
import styles from './MealPlanner.module.css';

function MealSlot({ day, slot, recipe = null, onRemove }) {
  const filled = Boolean(recipe); // conditional styling flag

  return (
    <div className={`${styles.slot} ${filled ? styles.slotFilled : ''}`}>
      <span className={styles.slotLabel}>{capitalise(slot)}</span>

      {/* Ternary: show the recipe + remove button, or an empty hint */}
      {filled ? (
        <>
          <span className={styles.slotRecipe}>{recipe.title}</span>
          <button className={styles.remove} onClick={() => onRemove(day, slot)}>
            Remove
          </button>
        </>
      ) : (
        <span className={styles.slotEmpty}>Empty</span>
      )}
    </div>
  );
}

MealSlot.propTypes = {
  day: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  recipe: PropTypes.object,      // null when the slot is empty
  onRemove: PropTypes.func.isRequired,
};


export default MealSlot;
