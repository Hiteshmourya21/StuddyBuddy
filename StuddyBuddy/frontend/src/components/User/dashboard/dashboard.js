import styles from './styles/dashboard.module.css';
import ActivityGraph from './components/ActivityGraph';
import TodoList from './components/TodoList';
import QuizData from './components/QuizData';
import Streaks from './components/Streak';
import History from './components/History';
import Recommendations from './components/Recommendations';

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
      </header>
      
      <div className={styles.grid}>
        <div className={styles.row}>
          <ActivityGraph />
          <TodoList />
        </div>
        
        <div className={styles.row}>
          <QuizData />
          <Streaks />
        </div>
        
        <History />
        <Recommendations />
      </div>
    </div>
  );
}

