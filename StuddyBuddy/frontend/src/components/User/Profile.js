import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosConfig.js';

function Profile() {
  const [user, setUser] = useState(null);

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

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Study Field: {user.studyField}</p>
    </div>
  );
}

export default Profile;
