// Reusable Badge — small coloured pill for categories/difficulty. Uses an inline
// style so the colour can be passed in dynamically as an expression prop.
import PropTypes from 'prop-types';
import styles from './UI.module.css';

function Badge({ label, color = '#4e8367', textColor = '#ffffff' }) {
  return (
    <span className={styles.badge} style={{ background: color, color: textColor }}>
      {label}
    </span>
  );
}

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
};

export default Badge;
