// -----------------------------------------------------------------------------
// Home — landing page. Shows a hero, a few featured recipes, and the cooking-
// tips AUDIO guide. Demonstrates loading + conditional rendering.
// -----------------------------------------------------------------------------
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../components/UI/Button.jsx';
import Card from '../components/UI/Card.jsx';
import Loading from '../components/UI/Loading.jsx';
import AudioPlayer from '../components/Media/AudioPlayer.jsx';
import { formatCookTime } from '../utils/helpers.js';
import recipeStyles from '../components/Recipe/Recipe.module.css';
import styles from './pages.module.css';

function Home({ recipes, isLoading = false }) {
  // Take the first three recipes as a "featured" strip (data transformation).
  const featured = recipes.slice(0, 3);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.heroKicker}>Cook something you'll remember</span>
          <h1 className={styles.heroTitle}>
            Find recipes that <em>light up</em> your week.
          </h1>
          <p className={styles.heroText}>
            Browse dishes, watch the tutorials, and drop your favourites straight
            into a Monday-to-Sunday plan. Everything you save stays with you.
          </p>
          <div className={styles.heroActions}>
            <Link to="/recipes"><Button>Browse recipes</Button></Link>
            <Link to="/meal-planner"><Button variant="secondary">Open the planner</Button></Link>
          </div>
        </div>
        <img
          className={styles.heroImg}
          src="assets/images/home-fruit-salad.png"
          alt="A bright bowl of fresh fruit salad with apple, strawberry, blueberry, raspberry and citrus"
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Featured this week</h2>
          <Link to="/recipes" style={{ fontWeight: 600 }}>See all →</Link>
        </div>

        {/* Ternary: loading spinner vs the featured strip */}
        {isLoading ? (
          <Loading message="Warming up the kitchen…" />
        ) : (
          <div className={recipeStyles.grid}>
            {/* map — featured cards (lightweight, links to detail) */}
            {featured.map((recipe) => (
              <Card key={recipe.id} hoverable className={recipeStyles.card}>
                <div className={recipeStyles.thumb}>
                  <img src={recipe.image} alt={recipe.title} loading="lazy" />
                </div>
                <div className={recipeStyles.body}>
                  <h3 className={recipeStyles.title}>{recipe.title}</h3>
                  <p className={recipeStyles.desc}>{recipe.description}</p>
                  <span className={recipeStyles.metaItem}>⏱ {formatCookTime(recipe.cookTime)}</span>
                  <Link to={`/recipes/${recipe.id}`} style={{ fontWeight: 600, color: 'var(--ember)' }}>
                    View recipe →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Kitchen tips</h2>
        </div>
        {/* AUDIO component with play/pause + fallback (local placeholder clip) */}
        <AudioPlayer
          audioUrl="assets/audio/cooking-tips.mp3"
          title="Kitchen tips — before you start"
        />
      </section>
    </div>
  );
}

Home.propTypes = {
  recipes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};


export default Home;
