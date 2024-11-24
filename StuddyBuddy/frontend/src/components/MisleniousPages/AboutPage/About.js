import Footer from "../../LandingPage/footer";
import Header from "../../LandingPage/header";



const About = () => {
  

    return (
    <>
    <Header />
    <div style={styles.container}>
  
        <h1>About Page</h1>      
        
    </div>
    <Footer />     
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
  export default About;
  