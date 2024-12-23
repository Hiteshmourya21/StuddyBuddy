import styles from '../styles/dashboard.module.css';

export default function Recommendations() {
  const recommendations = [
    'Advanced JavaScript Course',
    'Data Structures Practice',
    'Machine Learning Basics',
    'SQL Database Tutorial'
  ];

  return (
    <div className={`${styles.card} ${styles.fullWidth}`}>
      <h2 className={styles.title}>Recommendations</h2>
      <ul className={styles.list}>
        {recommendations.map((item, index) => (
          <li key={index} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

