import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import style from "./ProfilePage.module.css";
import axios from '../../api/axiosConfig.js';

const ProfilePage = () => {
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //   const fetchUser = async () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //       const config = { headers: { Authorization: `Bearer ${token}` } };
    //       try {
    //         const response = await axios.get('/profile', config); 
    //         setUser(response.data);
    //       //   console.log(user)
    //       } catch (error) {
    //         console.error('Error fetching user profile:', error);
    //         // Optionally handle error state
    //       }
    //     }
    //   };
    //   fetchUser();
    // }, []);
  

    // State to control sidebar visibility
    const [profileSidebarOpen, setProfileSidebarOpen] = useState("");
    const [threeDotsSidebarOpen, setThreeDotsSidebarOpen] = useState("");

    // Toggle profile sidebar
    const toggleProfileSidebar = () => {
        // console.log(profileSidebarOpen)
        if(profileSidebarOpen === "") {
            setProfileSidebarOpen(style.open)
        }
        else{
            setProfileSidebarOpen("")
        }
    };

    // Toggle three dots sidebar
    const toggleThreeDotsSidebar = () => {
        if(threeDotsSidebarOpen === "") {
            setThreeDotsSidebarOpen(style.open)
        }
        else{
            setThreeDotsSidebarOpen("")
        }
    };

    return (
            <div>
                <header className={style.header}>
                    <div className={style.profileIcon} onClick={toggleProfileSidebar}>
                        👤
                    </div>
                    <div className={style.logo}>
                        <span className={style.logoText}>StudyBuddy</span>
                    </div>
                    <nav className={style.nav}>
                        <Link to="/user/home" className={style.navButton}>Home</Link>
                        <Link to="/user/search" className={style.navButton}>Search</Link>
                        <Link to="/user/explore" className={style.navButton}>Explore</Link>
                        <Link to="/user/quiz" className={style.navButton}>Quiz</Link>
                        <Link to="/user/forum" className={style.navButton}>Forum</Link>
                        <Link to="/user/reward" className={style.navButton}>Reward</Link>
                        <button className={style.navButton} onClick={toggleThreeDotsSidebar}>•••</button>
                    </nav>
                </header>
                
                {/* Profile Sidebar */}
                {profileSidebarOpen && (
                    <div className={`${style.sidebar} ${style.profileSidebar} ${profileSidebarOpen}`}>
                        <div className={style.menuContent}>
                            <p className={style.sidebarItem}>
                                <Link to="/dashboard">Dashboard</Link>
                            </p>
                            <p className={style.sidebarItem}>
                                <Link to="/profile">Profile</Link>
                            </p>
                            <p className={style.sidebarItem}>
                                <Link to="/logout">Logout</Link>
                            </p>
                        </div>
                    </div>
                )}

                {/* Three Dots Sidebar */}
                {threeDotsSidebarOpen && (
                    <div className={`${style.sidebar} ${style.threeDotsSidebar} ${threeDotsSidebarOpen}`}>
                        <div className={style.menuContent}>
                            <p className={style.sidebarItem}>
                                <Link to="/chat">Chat</Link>
                            </p>
                            <p className={style.sidebarItem}>
                                <Link to="/group-chat">Group Chat</Link>
                            </p>
                        </div>
                    </div>
                )}

                {/* Define your routes */}
                <Routes>
                    <Route path="/user/home" element={<div>Home Page</div>} />
                    <Route path="/user/search" element={<div>Search Page</div>} />
                    <Route path="/user/explore" element={<div>Explore Page</div>} />
                    <Route path="/user/quiz" element={<div>Quiz Page</div>} />
                    <Route path="/user/forum" element={<div>Forum Page</div>} />
                    <Route path="/user/reward" element={<div>Reward Page</div>} />
                    <Route path="/user/dashboard" element={<div>Dashboard Page</div>} />
                    <Route path="/user/profile" element={<div>Profile Page</div>} />
                    <Route path="/user/logout" element={<div>Logout Page</div>} />
                    <Route path="/user/chat" element={<div>Chat Page</div>} />
                    <Route path="/user/group-chat" element={<div>Group Chat Page</div>} />
                </Routes>
            </div>

    );
};


export default ProfilePage;