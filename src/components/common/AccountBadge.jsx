// AccountBadge — the signed-in person's initials ("PM" for Phatsimo Maseng),
// shown in the navbar. Reused in the footer too. The initials are passed in as
// a prop and the tooltip uses an expression prop.
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

function AccountBadge({ initials, name, size = 38 }) {
  // Inline style so the badge can be sized dynamically (expression as prop).
  return (
    <span
      className={styles.avatar}
      style={{ width: size, height: size, fontSize: size / 2.6 }}
      title={`Signed in as ${name}`}
      aria-label={`Account: ${name}`}
    >
      {initials}
    </span>
  );
}

AccountBadge.propTypes = {
  initials: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default AccountBadge;
