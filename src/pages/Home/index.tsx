import styles from './home.module.css';
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className={styles.center}>
      <Nav />
    </div>
  )
}
