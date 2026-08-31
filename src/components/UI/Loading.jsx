// Reusable Loading spinner shown during data operations. Default message via
// a default parameter.
import PropTypes from 'prop-types';
import styles from './UI.module.css';

function Loading({ message = 'Loading…' }) {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <p>{message}</p>
    </div>
  );
}

Loading.propTypes = { message: PropTypes.string };

export default Loading;
