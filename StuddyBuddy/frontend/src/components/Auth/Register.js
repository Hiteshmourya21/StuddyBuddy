import React, { useState } from 'react';
import axios from '../../api/axiosConfig.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './Auth.module.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studyField: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   console.log(formData)
      const response = await axios.post('/auth/register', formData);
      console.log(response.data.message); // Display success message
      alert('SignUp successful! Now login In...')
      handleSingIn()
    } catch (error) {
        console.error('SignUp error:', error);
    }
    
  };

  const handleSingIn = async () =>{
    try {
        const email = formData.email
        const password = formData.password
        const response = await axios.post('/auth/login', {email, password });
        alert('Login successful!');
        console.log(response.data); // Handle the response as needed
        localStorage.setItem('token', response.data.token); // Assuming the token is sent in the response
        // Redirect to the profile page after successful login
        navigate('/profile');
      } catch (error) {
        console.error('Login error:', error);
        alert('Failed to login');
      }
    };
  



  // <form onSubmit={handleSubmit}>
  //   <input type="text" name="name" placeholder="Name" onChange={handleChange} />
  //   <input type="email" name="email" placeholder="Email" onChange={handleChange} />
  //   <input type="password" name="password" placeholder="Password" onChange={handleChange} />
  //   <select name="studyField" onChange={handleChange}>
  //     <option value="">Select Field of Study</option>
  //     <option value="JEE">JEE</option>
  //     <option value="NEET">NEET</option>
  //     <option value="10th">10th Boards</option>
  //     <option value="12th">12th Boards</option>
  //   </select>
  //   <button type="submit">Register</button>
  // </form>
  return (
    <div className={`${styles.formContainer} ${styles.signUp}`}>
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <div className={styles.socialIcons}>
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
                <div className={styles.customDropdown}>
                    <select name="studyField" onChange={handleChange} required>
                        <option value="">Select Field of Study</option>
                        <option value="upsc">Civil Services Examination (UPSC)</option>
                        <option value="xat">Xavier Admission Test (XAT)</option>
                        <option value="ies">Indian Economic Service Examination (IES)</option>
                        <option value="ssc">Staff Selection Commission (SSC)</option>
                        <option value="cat">Common Admission Test (CAT)</option>
                        <option value="clat">Common Law Admission Test (CLAT)</option>
                        <option value="cds">Combined Defence Services Examination (CDS)</option>
                        <option value="lsat">Law School Admission Test (LSAT)</option>
                        <option value="nda">National Defence Academy Examination (NDA)</option>
                        <option value="neet">National Eligibility Entrance Test (NEET)</option>
                        <option value="fci">Food Corporation of India Examination (FCI)</option>
                        <option value="ceed">Common Entrance Examination for Design (CEED)</option>
                        <option value="ibps_po">IBPS PO Examination</option>
                        <option value="sbi_po">State Bank of India - Probationary Officers</option>
                        <option value="jee">Joint Entrance Examination- Main and Advance (JEE)</option>
                        <option value="gate">Graduate Aptitude Test in Engineering (GATE)</option>
                    </select>
                </div>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit" >Sign Up</button>
            </form>
    </div>
  );
}

export default Register;
