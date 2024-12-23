import React from 'react';
import styles from '../Styles/HomeContent.module.css';

const dummyPosts = [
  {
    id: 1,
    user: 'Alice',
    content: 'Just finished my calculus homework. Anyone want to study together for the upcoming test?',
    likes: 15,
    comments: 3,
  },
  {
    id: 2,
    user: 'Bob',
    content: 'Found a great resource for learning Python. Check it out: https://example.com/python-tutorial',
    likes: 22,
    comments: 7,
  },
  {
    id: 3,
    user: 'Charlie',
    content: 'Looking for a study group for the Biology 101 final. Any takers?',
    likes: 8,
    comments: 12,
  },
  {
    id: 4,
    user: 'Diana',
    content: 'Just aced my Chemistry exam! Hard work pays off!',
    likes: 30,
    comments: 5,
  },
];

const HomeContent = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to StudyBuddy</h1>
      <div className={styles.postContainer}>
        {dummyPosts.map(post => (
          <div key={post.id} className={styles.post}>
            <h3 className={styles.postUser}>{post.user}</h3>
            <p className={styles.postContent}>{post.content}</p>
            <div className={styles.postStats}>
              <span>{post.likes} Likes</span>
              <span>{post.comments} Comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeContent;

