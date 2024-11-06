import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/User/Register';
import Profile from './components/User/Profile';
import Login from './components/User/Login';
import Auth from './components/User/Auth';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/login" element={<Login />} /> */}

          {/* Home route */}
          <Route path="/" element={<h1>Welcome to the Study Platform</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
