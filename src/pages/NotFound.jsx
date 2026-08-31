// -----------------------------------------------------------------------------
// NotFound — the catch-all 404 page. Uses programmatic navigation to go home.
// -----------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button.jsx';
import styles from './pages.module.css';

function NotFound() {
  const navigate = useNavigate(); // programmatic navigation

  return (
    <div className={`${styles.page} ${styles.notFound}`}>
      <h1>404</h1>
      <h2>That page slipped off the menu</h2>
      <p style={{ color: 'var(--muted)' }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <Button onClick={() => navigate('/')}>Back to home</Button>
    </div>
  );
}

export default NotFound;
