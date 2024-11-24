import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import Main from './main';
import Footer from './footer';


const LandingPage = () => {
  

  return (
    <>
      <Header />
    <div style={styles.container}>

      <Main />
    
      <Footer />     
      
    </div>
    </>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: '#333',
    lineHeight: 1.6,
    backgroundColor: '#fff',
  },
  
};

export default LandingPage;