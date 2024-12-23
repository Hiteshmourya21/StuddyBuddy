import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import LandingPage from './components/Pages/LandingPage/landingPage';
import About from './components/MisleniousPages/AboutPage/About';
import Feature from './components/MisleniousPages/FeaturePage/Feature';
import HomePage from './components/Pages/HomePage/Home';  // Ensure HomePage is correctly imported

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* This should render HomePage when navigating to /home */}
          <Route path="/home/*" element={<HomePage />} />  {/* Use /* to match nested routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
