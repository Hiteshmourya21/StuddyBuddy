import React, { useEffect, useState } from 'react';
import { FaCamera, FaPencilAlt, FaHeart, FaComment, FaUserFriends, FaPlus } from 'react-icons/fa';
import styles from './ProfilePage.module.css';
import axios from '../../../api/axiosConfig.js';

const ProfilePage = () => {

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
          const response = await axios.get('/profile', config); 
          setUser(response.data);
        //   console.log(user)
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Optionally handle error state
        }
      }
    };
    fetchUser();
  }, []);

  const [user, setUser] = useState(null);
  const [description, setDescription] = useState('No description added yet.');
  const [preferences, setPreferences] = useState([]);
  const [resources, setResources] = useState([]);
  const [newPreference, setNewPreference] = useState('');
  const [newResource, setNewResource] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) return <div>Loading...</div>;
    const handleAddPreference = () => {
        if (newPreference.trim()) {
            setPreferences([...preferences, newPreference]);
            setNewPreference('');
        }
    };

    const handleAddResource = () => {
        if (newResource.trim()) {
            setResources([...resources, newResource]);
            setNewResource('');
        }
    };

    const handleEditDescription = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                <div className={styles.profileImageContainer}>
                    <img 
                        src="https://imageplaceholder.net/200x200/eeeeee/ffffff?tag=Summer+beach" 
                        alt="Profile" 
                        className={styles.profileImage} 
                    />
                    <button className={styles.cameraButton}>
                        <FaCamera />
                    </button>
                </div>
                <h1 className={styles.userName}>{user.name}</h1>
                <button className={styles.editProfileButton}>
                    <FaPencilAlt /> Edit Profile
                </button>
            </div>

            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Description</h2>
                    <button onClick={handleEditDescription} className={styles.editButton}>
                        Edit
                    </button>
                </div>
                {isEditing ? (
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.descriptionInput}
                    />
                ) : (
                    <p className={styles.description}>{description}</p>
                )}
            </div>

            <div className={styles.section}>
                <h2>Preferences</h2>
                <div className={styles.addItemContainer}>
                    <input
                        type="text"
                        value={newPreference}
                        onChange={(e) => setNewPreference(e.target.value)}
                        placeholder="Add a new preference..."
                        className={styles.addInput}
                    />
                    <button onClick={handleAddPreference} className={styles.addButton}>
                        Add
                    </button>
                </div>
                <div className={styles.itemsList}>
                    {preferences.map((pref, index) => (
                        <div key={index} className={styles.item}>{pref}</div>
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h2>Resources</h2>
                <div className={styles.addItemContainer}>
                    <input
                        type="text"
                        value={newResource}
                        onChange={(e) => setNewResource(e.target.value)}
                        placeholder="Add a new resource..."
                        className={styles.addInput}
                    />
                    <button onClick={handleAddResource} className={styles.addButton}>
                        Add
                    </button>
                </div>
                <div className={styles.itemsList}>
                    {resources.map((resource, index) => (
                        <div key={index} className={styles.item}>{resource}</div>
                    ))}
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.actionButton}>
                    <FaHeart /> Like
                </button>
                <button className={styles.actionButton}>
                    <FaComment /> Comment
                </button>
                <button className={styles.actionButton}>
                    <FaUserFriends /> Connections
                </button>
            </div>

            <button className={styles.createPostButton}>
                <FaPlus /> Create a Post
            </button>
        </div>
    );
};

export default ProfilePage;

