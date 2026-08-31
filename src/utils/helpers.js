// -----------------------------------------------------------------------------
// helpers.js — small pure functions reused across the app (keeps components DRY).
// -----------------------------------------------------------------------------

// The three planner slots every day owns.
export const MEAL_SLOTS = ['breakfast', 'lunch', 'dinner'];

// The seven days the planner covers, in order.
export const DAYS_OF_WEEK = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
];

// Turn a raw minutes value into a friendly label, e.g. 90 -> "1h 30m".
// Used inside JSX for data transformation.
export function formatCookTime(minutes) {
  if (!minutes || minutes <= 0) return 'No cook';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} min`;
  return mins === 0 ? `${hrs}h` : `${hrs}h ${mins}m`;
}

// Capitalise the first letter — handy for categories and day names in JSX.
export function capitalise(text = '') {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Map a recipe category to the planner slot it belongs in.
// Breakfast/lunch/dinner map to themselves; desserts and snacks default to dinner.
export function slotForCategory(category) {
  if (MEAL_SLOTS.includes(category)) return category;
  return 'dinner';
}

// Build the empty week object used as the planner's initial state.
export function createEmptyWeek() {
  return DAYS_OF_WEEK.reduce((week, day) => {
    week[day] = { breakfast: null, lunch: null, dinner: null };
    return week;
  }, {});
}
