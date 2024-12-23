import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaCompass, FaBook, FaUsers, FaGift, FaEllipsisH, FaUser } from 'react-icons/fa';
import styles from "./NavBar.module.css";

const NavBar = () => {
    const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
    const [threeDotsSidebarOpen, setThreeDotsSidebarOpen] = useState(false);

    const toggleProfileSidebar = () => {
        setProfileSidebarOpen(!profileSidebarOpen);
    };

    const toggleThreeDotsSidebar = () => {
        setThreeDotsSidebarOpen(!threeDotsSidebarOpen);
    };

    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logoSection}>
                    <FaBook className={styles.logoIcon} />
                    <span className={styles.logoText}>StudyBuddy</span>
                </div>
                <nav className={styles.nav}>
                    <Link to="/home" className={styles.navLink}><FaHome className={styles.icon} /> Home</Link>
                    <Link to="/home/search" className={styles.navLink}><FaSearch className={styles.icon} /> Search</Link>
                    <Link to="/home/explore" className={styles.navLink}><FaCompass className={styles.icon} /> Explore</Link>
                    <Link to="/home/quiz" className={styles.navLink}><FaBook className={styles.icon} /> Quiz</Link>
                    <Link to="/home/forum" className={styles.navLink}><FaUsers className={styles.icon} /> Forum</Link>
                    <Link to="/home/reward" className={styles.navLink}><FaGift className={styles.icon} /> Reward</Link>
                    <button className={styles.navLink} onClick={toggleThreeDotsSidebar}><FaEllipsisH className={styles.icon} /></button>
                </nav>
                <button className={styles.profileButton} onClick={toggleProfileSidebar}>
                    <FaUser className={styles.profileIcon} />
                </button>
            </header>
            
            {/* Profile Sidebar */}
            {profileSidebarOpen && (
                <div className={`${styles.sidebar} ${styles.profileSidebar}`} onMouseLeave={() => setProfileSidebarOpen(false)}>
                    <div className={styles.menuContent}>
                        <Link to="/home/user/dashboard" className={styles.sidebarItem}>Dashboard</Link>
                        <Link to="/home/user/profile" className={styles.sidebarItem}>Profile</Link>
                        <Link to="/home/user/logout" className={styles.sidebarItem}>Logout</Link>
                    </div>
                </div>
            )}

            {/* Three Dots Sidebar */}
            {threeDotsSidebarOpen && (
                <div className={`${styles.sidebar} ${styles.threeDotsSidebar}`} onMouseLeave={() => setThreeDotsSidebarOpen(false)}>
                    <div className={styles.menuContent}>
                        <Link to="/chat" className={styles.sidebarItem}>Chat</Link>
                        <Link to="/group-chat" className={styles.sidebarItem}>Group Chat</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
