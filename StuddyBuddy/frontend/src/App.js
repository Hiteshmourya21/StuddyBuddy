import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/User/Profile';
import Auth from './components/Auth/Auth';
import LandingPage from './components/LandingPage/landingPage';
import About from './components/MisleniousPages/AboutPage/About';
import Feature from './components/MisleniousPages/FeaturePage/Feature';
import ProfilePage from './components/User/ProfilePage';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Feature />} />


          {/* Home route */}
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
