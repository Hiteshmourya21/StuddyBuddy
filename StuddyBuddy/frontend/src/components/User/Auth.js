import React, { useState } from 'react';
import axios from '../../api/axiosConfig.js';
import { useNavigate } from 'react-router-dom'; 
import styles from './Auth.module.css';
import Register from './Register.js';
import Login from './Login.js';


function Auth() {
    const [toggle,setToggle] = useState("")

    const handleToggle = async () => {
        if (toggle === ""){
            setToggle(`${styles.active}`)
        }
        else{
            setToggle("")
        }
    }

  return (
    <div className={`${styles.container} ${toggle} `} id="container">
        <Register/>
        <Login/>
        <div className={styles.toggleContainer}>
            <div className={styles.toggle}>
                <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className={styles.hidden} id="login" onClick={handleToggle}>Sign In</button>
                </div>
                <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className={styles.hidden} id="register" onClick={handleToggle}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Auth;
