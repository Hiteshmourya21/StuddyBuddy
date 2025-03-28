import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar.js';
import axios from '../../../api/axiosConfig.js';
import DashboardPage from '../../User/dashboard/dashboard.js';
import HomeContent from './components/HomeContent.js';
import styles from './Styles/HomePage.module.css';
import ProfilePage from '../../User/profile/ProfilePage.js';
import QuizData from '../../User/dashboard/components/QuizData.js';

const HomePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
            const response = await axios.get('/profile', config); 
            setUser(response.data);
            } catch (error) {
            console.error('Error fetching user profile:', error);
            }
        }
        };
    fetchUser();
  }, []);

  if (!user) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.homePage}>
        <NavBar/>
        <main className={styles.mainContent}>
          <Routes>
              <Route index element={<HomeContent />} />
              <Route path="/home/search" element={<div>Search Page</div>} />
              <Route path="/home/explore" element={<div>Explore Page</div>} />
              <Route path="/user/dashboard/quiz" element={<QuizData/>} />
              <Route path="/home/forum" element={<div>Forum Page</div>} />
              <Route path="/home/reward" element={<div>Reward Page</div>} />
              <Route path="/user/dashboard" element={<DashboardPage />} />
              <Route path="/user/profile" element={<ProfilePage/>} />
              <Route path="/user/logout" element={<div>Logout Page</div>} />
              <Route path="/home/chat" element={<div>Chat Page</div>} />
              <Route path="/home/group-chat" element={<div>Group Chat Page</div>} />
          </Routes>
          <Outlet />
        </main>
    </div>
  );
};

export default HomePage;

