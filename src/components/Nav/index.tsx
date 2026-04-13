import { Link } from 'react-router'
import styles from './Nav.module.css';

export default function Nav() {

  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/todos">Todos</Link>
      <Link to="/form-builder">Form builder</Link>
      <Link to="/form-preview">Form Preview</Link>
    </nav>
  )
}
