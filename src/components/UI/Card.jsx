// Reusable Card container — wraps content anywhere (recipe cards, planner days,
// empty states). Uses the CHILDREN prop to compose whatever you put inside it.
import PropTypes from 'prop-types';
import styles from './UI.module.css';

function Card({ children, hoverable = false, glowing = false, className = '' }) {
  // Conditional styling built from boolean props.
  const classes = [
    styles.card,
    hoverable ? styles.cardHover : '',
    glowing ? styles.cardGlow : '',
    className,
  ].join(' ').trim();

  return <div className={classes}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,   // children prop
  hoverable: PropTypes.bool,
  glowing: PropTypes.bool,
  className: PropTypes.string,
};

export default Card;
