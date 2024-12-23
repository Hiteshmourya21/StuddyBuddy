import styles from '../styles/dashboard.module.css';
import { Flame } from 'lucide-react';

export default function Streak() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Streaks</h2>
      <div className={styles.streak}>
        <Flame className="text-orange-500" />
        <span>7 Days</span>
      </div>
    </div>
  );
}

