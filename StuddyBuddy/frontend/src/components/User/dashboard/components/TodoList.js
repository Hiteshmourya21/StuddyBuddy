import styles from '../styles/dashboard.module.css';

export default function TodoList() {
  const todos = [
    'Complete Math Quiz',
    'Review Biology Notes',
    'Submit Physics Assignment',
    'Practice Programming'
  ];

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Todo List</h2>
      <ul className={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} className={styles.listItem}>
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

