import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaCompass, FaBook, FaUsers, FaGift, FaEllipsisH, FaUser } from 'react-icons/fa';
import styles from "./NavBar.module.css";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { LogOut } from 'lucide-react';

const NavBar = () => {
    const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);
    const [threeDotsSidebarOpen, setThreeDotsSidebarOpen] = useState(false);

    const {data:authUser} = useQuery({queryKey:['authUser']});
    const queryClient = useQueryClient();

    const {mutate : logout} = useMutation({
        mutationFn : async () =>await axiosInstance.post('/auth/logout'),
        onSuccess: () => {
          queryClient.invalidateQueries(['authUser']);
        },
      })
    

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
                    <span className={styles.logoText}> <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>StudyBuddy</Link></span>
                </div>
                <nav className={styles.nav}>
                    <Link to="/" className={styles.navLink}><FaHome className={styles.icon} /> Home</Link>
                    <Link to="/search" className={styles.navLink}><FaSearch className={styles.icon} /> Search</Link>
                    <Link to="/explore" className={styles.navLink}><FaCompass className={styles.icon} /> Explore</Link>
                    <Link to="/quiz" className={styles.navLink}><FaBook className={styles.icon} /> Quiz</Link>
                    <Link to="/forum" className={styles.navLink}><FaUsers className={styles.icon} /> Forum</Link>
                    <Link to="/reward" className={styles.navLink}><FaGift className={styles.icon} /> Reward</Link>
                    <button className={styles.navLink} onClick={toggleThreeDotsSidebar}><FaEllipsisH className={styles.icon}  /></button>
                </nav>
                <button className={styles.profileButton} onClick={toggleProfileSidebar}>
                    <FaUser className={styles.profileIcon} />
                </button>
            </header>
            
            {/* Profile Sidebar */}
            {profileSidebarOpen && (
                <div className={`${styles.sidebar} ${styles.profileSidebar}`} onMouseLeave={() => setProfileSidebarOpen(false)}>
                    <div className={styles.menuContent}>
                        <Link to="/user/dashboard" className={styles.sidebarItem}>Dashboard</Link>
                        <Link to={`/profile/${authUser.username}`} className={styles.sidebarItem}>Profile</Link>
                        <button
									className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
									onClick={() => logout()}
								>
									<LogOut size={20} />
									<span className='hidden md:inline'>Logout</span>
								</button>
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
