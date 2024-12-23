import styles from '../styles/dashboard.module.css';

export default function History() {
  const history = [
    'Completed Python Basics Quiz - 95%',
    'Finished Java Tutorial Series',
    'Earned "Quick Learner" Badge',
    'Started Web Development Course'
  ];

  return (
    <div className={`${styles.card} ${styles.fullWidth}`}>
      <h2 className={styles.title}>History</h2>
      <ul className={styles.list}>
        {history.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

