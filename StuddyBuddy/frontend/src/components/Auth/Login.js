import React, { useState } from 'react';
import axios from '../../api/axiosConfig.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Auth.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      alert('Login successful!');
      console.log(response.data); // Handle the response as needed
      localStorage.setItem('token', response.data.token); // Assuming the token is sent in the response
      // Redirect to the profile page after successful login
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to login');
    }
  };

  return (
    <div className={`${styles.formContainer} ${styles.signIn}`}>
    <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <div className={styles.socialIcons}>
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
        <span>or use your email password</span>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
         <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
        <a href="#">Forget Your Password?</a>
        <button type="submit">Sign In</button>
    </form>
</div>
  );
}

export default Login;