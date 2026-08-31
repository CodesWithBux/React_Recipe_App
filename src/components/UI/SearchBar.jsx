// Reusable SearchBar — a controlled input. Shows onChange + onFocus + onBlur
// event handling, and reads the event object via e.target.value.
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

function SearchBar({ value, onChange, placeholder = 'Search recipes…' }) {
  const [focused, setFocused] = useState(false); // local UI state

  // onChange reads the event object (e.target.value) before lifting it up.
  const handleChange = (e) => onChange(e.target.value);

  return (
    <div className={`${styles.search} ${focused ? styles.searchFocused : ''}`}>
      <span className={styles.searchIcon} aria-hidden="true">⌕</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label="Search recipes"
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
