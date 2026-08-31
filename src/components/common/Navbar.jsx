// -----------------------------------------------------------------------------
// Navbar — a Library-style light, sticky header. The search lives right in the
// bar (search by meal name OR ingredient), alongside links, the favourites
// "cart" with a live count, and the PM account badge. Collapses to a burger
// menu on mobile.
// -----------------------------------------------------------------------------
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../UI/SearchBar.jsx';
import AccountBadge from './AccountBadge.jsx';
import styles from './Navbar.module.css';

// The routes rendered as links (kept in one array to stay DRY).
const NAV_ITEMS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/recipes', label: 'Recipes', exact: false },
  { to: '/meal-planner', label: 'Meal Planner', exact: true },
];

function Navbar({ account, favoriteCount = 0, notice = '', searchTerm, onSearchChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu state

  // Active-route styling (Library-style underline).
  const isActive = (item) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  // Typing in the header searches live and jumps to the results page.
  const handleSearchChange = (value) => {
    onSearchChange(value);
    if (location.pathname !== '/recipes') navigate('/recipes');
  };

  // Submitting the search form goes to the results page (onSubmit handler).
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/recipes');
  };

  // Reused nav links markup (desktop bar + mobile panel).
  const renderLinks = () =>
    NAV_ITEMS.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        onClick={() => setMenuOpen(false)}
        className={`${styles.link} ${isActive(item) ? styles.active : ''}`}
      >
        {item.label}
      </Link>
    ));

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          className={styles.burger}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.brandDot} />
          Luminous
        </Link>

        <nav className={styles.nav} aria-label="Primary">{renderLinks()}</nav>

        {/* Search lives in the header (Library-style). role="search" for a11y */}
        <form className={styles.searchForm} onSubmit={handleSearchSubmit} role="search">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search meals or ingredients — e.g. pasta, feta"
          />
        </form>

        {/* Favourites: the "cart"-style icon with a count badge */}
        <Link
          to="/favorites"
          onClick={() => setMenuOpen(false)}
          className={`${styles.fav} ${location.pathname === '/favorites' ? styles.favActive : ''}`}
          aria-label={`Favourites (${favoriteCount} saved)`}
        >
          <span className={styles.favIcon}>♥</span>
          {/* Count badge only when there's something saved (&&) */}
          {favoriteCount > 0 && <span className={styles.count}>{favoriteCount}</span>}
        </Link>

        <AccountBadge initials={account.initials} name={account.name} />
      </div>

      {/* Mobile drop panel: search + links (only rendered when open) */}
      {menuOpen && (
        <div className={styles.mobilePanel}>
          <form onSubmit={handleSearchSubmit} role="search">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search meals or ingredients…"
            />
          </form>
          <nav className={styles.nav} aria-label="Mobile">{renderLinks()}</nav>
        </div>
      )}

      {/* Transient toast — only rendered when there's a message (&&) */}
      {notice && <div className={styles.notice}>{notice}</div>}
    </header>
  );
}

Navbar.propTypes = {
  account: PropTypes.shape({
    name: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired,
  }).isRequired,
  favoriteCount: PropTypes.number,
  notice: PropTypes.string,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default Navbar;
