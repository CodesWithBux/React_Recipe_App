// -----------------------------------------------------------------------------
// MealPlanner — lays out all seven DayCards and the week toolbar. Reads the
// whole plan and reports how many meals are scheduled across the week.
// -----------------------------------------------------------------------------
import PropTypes from 'prop-types';
import DayCard from './DayCard.jsx';
import Button from '../UI/Button.jsx';
import { DAYS_OF_WEEK, MEAL_SLOTS } from '../../utils/helpers.js';
import styles from './MealPlanner.module.css';

function MealPlanner({ mealPlan, onRemoveFromPlan, onClearWeek }) {
  // Total meals planned across the week (data transformation before render).
  const totalPlanned = DAYS_OF_WEEK.reduce(
    (sum, day) => sum + MEAL_SLOTS.filter((slot) => mealPlan[day][slot]).length,
    0
  );

  return (
    <div>
      <div className={styles.toolbar}>
        <p style={{ margin: 0, color: 'var(--muted)' }}>
          {/* Conditional message with a ternary */}
          {totalPlanned > 0
            ? `${totalPlanned} meal${totalPlanned === 1 ? '' : 's'} planned this week.`
            : 'Nothing planned yet — add recipes from any recipe card.'}
        </p>
        {/* Clear button only shows when there's something to clear (&&) */}
        {totalPlanned > 0 && (
          <Button variant="danger" size="small" onClick={onClearWeek}>Clear week</Button>
        )}
      </div>

      <div className={styles.week}>
        {/* map — the seven day columns */}
        {DAYS_OF_WEEK.map((day) => (
          <DayCard
            key={day}
            day={day}
            meals={mealPlan[day]}
            onRemove={onRemoveFromPlan}
          />
        ))}
      </div>
    </div>
  );
}

MealPlanner.propTypes = {
  mealPlan: PropTypes.object.isRequired,
  onRemoveFromPlan: PropTypes.func.isRequired,
  onClearWeek: PropTypes.func.isRequired,
};

export default MealPlanner;
