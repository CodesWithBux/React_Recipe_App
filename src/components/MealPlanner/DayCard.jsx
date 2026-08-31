// -----------------------------------------------------------------------------
// DayCard — one day column (reused 7 times, once per weekday). Receives the
// day's meals object and renders a MealSlot for each slot. Passes the remove
// callback straight through (parent -> child -> grandchild event flow).
// -----------------------------------------------------------------------------
import PropTypes from 'prop-types';
import Card from '../UI/Card.jsx';
import MealSlot from './MealSlot.jsx';
import { MEAL_SLOTS, capitalise } from '../../utils/helpers.js';
import styles from './MealPlanner.module.css';

function DayCard({ day, meals, onRemove }) {
  // Count how many slots are filled (function/transformation used in JSX).
  const plannedCount = MEAL_SLOTS.filter((slot) => meals[slot]).length;

  return (
    <Card className={styles.day}>
      <div className={styles.dayHead}>
        <h3 className={styles.dayName}>{capitalise(day)}</h3>
        <span className={styles.dayCount}>{plannedCount} of 3 planned</span>
      </div>
      <div className={styles.slots}>
        {/* map — one MealSlot per slot */}
        {MEAL_SLOTS.map((slot) => (
          <MealSlot
            key={slot}
            day={day}
            slot={slot}
            recipe={meals[slot]}
            onRemove={onRemove}
          />
        ))}
      </div>
    </Card>
  );
}

// PropTypes validation (component #3 of 3+).
DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  meals: PropTypes.shape({
    breakfast: PropTypes.object,
    lunch: PropTypes.object,
    dinner: PropTypes.object,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default DayCard;
