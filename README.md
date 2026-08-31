

## Features

- **Search in the header** by meal name *or* ingredient (type "pasta" or "feta"), plus live filtering by category, cuisine and difficulty
- **Recipe detail** pages with ingredients, step-by-step instructions and a **Cook along** video below them
- **Kitchen tips** audio on the home page and a **Cook along** video on each recipe page — HTML5 players (play/pause, fallback) using small local placeholder clips, so nothing depends on the internet
- **Favourites** with a heart toggle — saved recipes glow, and the Favourites
  page groups them into **meal compartments** (breakfast · lunch · dinner · dessert · snack)
- **Weekly meal planner** (Mon–Sun) where a recipe lands in the slot that matches
  its type, only if that slot is still open
- **Persistence** — favourites and the meal plan are saved to `localStorage`
- **Library-style header & footer** — a light, sticky header carrying the search, nav, favourites count and the PM account badge; a clean centered footer
- **Responsive** across mobile, tablet and desktop, with a mobile menu

## Technologies used

- **React 18** (functional components + hooks only — no class components)
- **Bricolage Grotesque + Inter** type pairing (Google Fonts)
- **React Router DOM 6** for routing
- **PropTypes** for prop validation
- **CSS Modules** + inline styles + conditional styling
- **Vite** for dev/build tooling

## Installation

```bash
npm install
npm start        # or: npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).
Build for production with `npm run build`.

## Project structure

```
src/
  components/
    common/     Navbar, AccountBadge, Footer
    UI/         Button, Card, SearchBar, Loading, Modal, Badge (reusable)
    Recipe/     RecipeCard, RecipeList, RecipeDetail, RecipeFilter
    MealPlanner/ MealPlanner, DayCard, MealSlot
    Media/      VideoPlayer, AudioPlayer
  pages/        Home, RecipesPage, MealPlannerPage, FavoritesPage, NotFound
  data/         recipesData.js   (add your own recipes here)
  utils/        helpers.js       (shared pure functions)
  App.jsx       holds the shared state (favourites + meal plan)
```

## Component descriptions

- **App** — the single source of truth. Holds `recipes`, `favorites`, `mealPlan`
  and the callbacks that change them; wires up all routes.
- **Navbar** — links to every route, active styling, favourites count, PM badge,
  responsive burger menu.
- **RecipeCard / RecipeList** — a card per recipe (summary, favourite, add-to-plan);
  the list maps recipes to cards and derives each card's favourite state.
- **RecipeDetail** — the dynamic `/recipes/:id` route: ingredients, steps, video,
  favourite toggle and add-to-plan.
- **MealPlanner → DayCard → MealSlot** — the planner nests three levels deep; each
  slot shows its recipe or an empty placeholder.
- **VideoPlayer / AudioPlayer** — HTML5 media with native controls, a custom
  play/pause button and fallback content. The audio (Kitchen tips) is on the home
  page; the video (Cook along) is on each recipe page, below the instructions.
  Both read local files in `public/assets/videos` and `public/assets/audio`.
- **UI/** — Button, Card, SearchBar, Loading, Modal, Badge are reused everywhere.

## State management

State is **lifted up** to `App.jsx` so sibling pages share it:

- `favorites` and `mealPlan` live in `App`; pages receive them and their update
  callbacks as props (parent → child).
- Children report back through callbacks like `onFavoriteToggle` and `onAddToPlan`
  (child → parent).
- Because Recipes, Favourites and the Meal Planner read the same state, a change
  on one page shows up on the others (sibling communication through the parent).
- Four `useEffect` hooks load the data, hydrate from `localStorage`, and re-save
  favourites and the plan whenever they change.

## Routing

| Route              | Page             |
| ------------------ | ---------------- |
| `/`                | Home             |
| `/recipes`         | Recipes list     |
| `/recipes/:id`     | Recipe detail (dynamic param) |
| `/meal-planner`    | Weekly planner   |
| `/favorites`       | Favourites       |
| `*`                | 404 Not Found    |

Programmatic navigation (`useNavigate`) is used on the detail and 404 pages.

## Adding your own recipes

Open `src/data/recipesData.js`, copy one recipe object, and change the fields.
Keep `category` as one of `breakfast | lunch | dinner | dessert | snack` so the
planner and favourites compartments know where it belongs.

## Future enhancements

- Drag-and-drop planning
- Shopping list generated from the week's plan
- User sign-in with a real backend
- Recipe ratings and reviews

## Screenshots

Add screenshots of the Home, Recipes, Recipe detail, Meal planner, Favourites and
a mobile view to a `screenshots/` folder before submitting.
