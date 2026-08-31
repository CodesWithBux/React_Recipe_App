// Reusable Modal — conditionally renders an entire section only when `open`.
// Uses the CHILDREN prop so any content can be dropped inside.
import PropTypes from 'prop-types';
import styles from './UI.module.css';

function Modal({ open, onClose, title, children }) {
  // Conditional render: nothing at all unless open (&& pattern).
  if (!open) return null;

  return (
    <div className={styles.scrim} onClick={onClose}>
      {/* Stop clicks inside the panel from closing it */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">×</button>
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,   // children prop
};

export default Modal;
