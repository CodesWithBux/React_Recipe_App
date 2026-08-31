# Luminous — Planning Document

## Overview
Luminous is a Recipe Discovery & Meal Planning single-page React app. It combines
the visual identity of two earlier projects — the Enlighten Library (Fraunces +
Inter type, the PM account badge, a terracotta accent) and Little Lemon (warm food
colour) — into a honey-glow palette on deep-plum ink.

## Component hierarchy
```
App (holds favourites + meal plan)
├── Navbar → AccountBadge
├── Routes
│   ├── Home → Card, Loading, AudioPlayer
│   ├── RecipesPage → SearchBar, RecipeFilter → Button
│   │                └── RecipeList → RecipeCard → Card, Badge
│   ├── RecipeDetail → Badge, Button, VideoPlayer
│   ├── MealPlannerPage → MealPlanner → DayCard → MealSlot   (4 levels deep)
│   └── FavoritesPage → RecipeCard → Card, Badge
└── Footer
```

## Data flow
- **Down (props):** App passes `recipes`, `favorites`, `mealPlan` and callbacks to
  pages; pages pass individual recipes to cards.
- **Up (callbacks):** `onFavoriteToggle`, `onAddToPlan`, `onRemoveFromPlan`,
  `onClearWeek` bubble user actions back to App.
- **Sibling:** Recipes, Favourites and Meal Planner all read App's state, so a
  change on one page is visible on the others.

## State strategy
- App owns shared state (`favorites`, `mealPlan`, `recipes`, `isLoading`, `notice`).
- Pages own local UI state (search term, filters, focus, media play/pause).
- `useEffect` loads data, hydrates from `localStorage`, and persists changes.

## Components to build
Navbar, AccountBadge, Footer, Button, Card, SearchBar, Loading, Modal, Badge,
RecipeCard, RecipeList, RecipeDetail, RecipeFilter, MealPlanner, DayCard, MealSlot,
VideoPlayer, AudioPlayer, Home, RecipesPage, MealPlannerPage, FavoritesPage,
NotFound — plus App. (24 total, all functional.)

## Signature feature
Favourites are split into meal-type compartments, and adding a favourite to a day
routes it to the matching planner slot (breakfast → breakfast) only when that slot
is open.
