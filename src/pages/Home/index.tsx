import { Link } from "react-router";
import styles from './home.module.css';

export default function Home() {
  return (
    <nav className={styles.nav}>
      <Link to="/todos">Todos</Link>
      <Link to="/form-builder">Form builder</Link>
    </nav>
  )
}
