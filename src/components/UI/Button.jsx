// Reusable Button — used across the whole app (cards, forms, planner, 404...).
// Demonstrates: default parameter values, props destructuring, children prop,
// conditional (variant) styling, and a custom handler passed in as a prop.
import PropTypes from 'prop-types';
import styles from './UI.module.css';

// `variant` and `size` have DEFAULT VALUES via default parameters.
function Button({ children, variant = 'primary', size = 'medium', block = false, type = 'button', onClick, disabled = false }) {
  // Conditional styling: pick the class list from the variant/size props.
  const classes = [
    styles.btn,
    styles[variant],
    size === 'small' ? styles.small : '',
    block ? styles.block : '',
  ].join(' ').trim();

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,          // children prop
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium']),
  block: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
