// -----------------------------------------------------------------------------
// MealPlannerPage — thin page wrapper around the MealPlanner container. The
// plan itself lives in App (lifted state) and arrives here through props.
// -----------------------------------------------------------------------------
import PropTypes from 'prop-types';
import MealPlanner from '../components/MealPlanner/MealPlanner.jsx';
import styles from './pages.module.css';

function MealPlannerPage({ mealPlan, onRemoveFromPlan, onClearWeek }) {
  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <h1>Weekly meal planner</h1>
        <p className={styles.pageSub}>
          A recipe drops into the slot that matches its type — breakfasts to
          breakfast, and so on — as long as that slot is still open.
        </p>
      </div>

      <MealPlanner
        mealPlan={mealPlan}
        onRemoveFromPlan={onRemoveFromPlan}
        onClearWeek={onClearWeek}
      />
    </div>
  );
}

MealPlannerPage.propTypes = {
  mealPlan: PropTypes.object.isRequired,
  onRemoveFromPlan: PropTypes.func.isRequired,
  onClearWeek: PropTypes.func.isRequired,
};

export default MealPlannerPage;
