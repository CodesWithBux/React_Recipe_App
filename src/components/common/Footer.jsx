// Footer — Library-style: a light band with centered quick links and a copy
// line, closing every page. Uses router Links so navigation stays in-app.
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/meal-planner', label: 'Meal Planner' },
  { to: '/favorites', label: 'Favourites' },
];

function Footer({ account }) {
  const year = new Date().getFullYear(); // expression used in JSX

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.mark}>
          <span className={styles.dot} /> Luminous
        </p>

        <nav className={styles.links} aria-label="Footer">
          {/* map — footer quick links */}
          {FOOTER_LINKS.map((item) => (
            <Link key={item.to} to={item.to}>{item.label}</Link>
          ))}
        </nav>

        <p className={styles.copy}>© {year} Luminous · Built by {account.name}</p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  account: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};

export default Footer;
